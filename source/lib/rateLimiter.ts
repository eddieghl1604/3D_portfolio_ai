/**
 * Rate Limiting Utility
 * Prevents spam and abuse by limiting form submissions per IP/time window
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 3, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  /**
   * Check if request is allowed
   * @param identifier - IP address or user identifier
   * @returns true if allowed, false if rate limited
   */
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];

    // Remove old requests outside the window
    const validRequests = userRequests.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    // Add current request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);

    // Cleanup old entries periodically
    if (Math.random() < 0.01) {
      this.cleanup();
    }

    return true;
  }

  /**
   * Get remaining requests for identifier
   */
  getRemaining(identifier: string): number {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    const validRequests = userRequests.filter(
      (timestamp) => now - timestamp < this.windowMs
    );
    return Math.max(0, this.maxRequests - validRequests.length);
  }

  /**
   * Get time until next request allowed (in seconds)
   */
  getTimeUntilReset(identifier: string): number {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    const validRequests = userRequests.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    if (validRequests.length < this.maxRequests) {
      return 0;
    }

    const oldestRequest = Math.min(...validRequests);
    const resetTime = oldestRequest + this.windowMs;
    return Math.ceil((resetTime - now) / 1000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, timestamps] of this.requests.entries()) {
      const validRequests = timestamps.filter(
        (timestamp) => now - timestamp < this.windowMs
      );
      if (validRequests.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, validRequests);
      }
    }
  }

  /**
   * Reset rate limit for identifier (useful for testing)
   */
  reset(identifier: string) {
    this.requests.delete(identifier);
  }
}

// Create singleton instance
export const contactFormRateLimiter = new RateLimiter(3, 60000); // 3 requests per minute

/**
 * Get user identifier (IP-based, fallback to session storage)
 */
export function getUserIdentifier(): string {
  // In production, this would be handled server-side
  // For client-side, we use sessionStorage as a fallback
  const storedId = sessionStorage.getItem('user_identifier');
  if (storedId) {
    return storedId;
  }

  // Generate a temporary identifier
  const identifier = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('user_identifier', identifier);
  return identifier;
}

