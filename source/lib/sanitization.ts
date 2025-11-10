/**
 * Input Sanitization Utility
 * Prevents XSS attacks and malicious input
 */

/**
 * Sanitize HTML content to prevent XSS
 */
export function sanitizeHtml(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Sanitize text input (remove HTML tags and dangerous characters)
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  return email
    .toLowerCase()
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/[^\w@.-]/g, ''); // Keep only valid email characters
}

/**
 * Validate and sanitize name
 */
export function sanitizeName(name: string): string {
  return sanitizeText(name)
    .replace(/[^a-zA-Z\s'-]/g, '') // Keep only letters, spaces, hyphens, apostrophes
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 50); // Max length
}

/**
 * Validate and sanitize message
 */
export function sanitizeMessage(message: string): string {
  return sanitizeText(message)
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 1000); // Max length
}

/**
 * Check for common spam patterns
 */
export function containsSpamPatterns(text: string): boolean {
  const spamPatterns = [
    /(?:https?:\/\/)?(?:www\.)?(?:bit\.ly|tinyurl|t\.co|goo\.gl|short\.link)/i,
    /(?:buy|sell|cheap|discount|free|click here|urgent|limited time)/i,
    /(?:viagra|cialis|casino|poker|lottery|winner)/i,
    /(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}){2,}/, // Multiple emails
    /(?:http|https|www\.){3,}/i, // Multiple URLs
  ];

  return spamPatterns.some((pattern) => pattern.test(text));
}

/**
 * Comprehensive sanitization for form data
 */
export function sanitizeFormData(data: {
  name: string;
  email: string;
  message: string;
}): { name: string; email: string; message: string; isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Sanitize name
  const sanitizedName = sanitizeName(data.name);
  if (sanitizedName.length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  // Sanitize email
  const sanitizedEmail = sanitizeEmail(data.email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitizedEmail)) {
    errors.push('Invalid email format');
  }

  // Sanitize message
  const sanitizedMessage = sanitizeMessage(data.message);
  if (sanitizedMessage.length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  // Check for spam patterns
  const fullText = `${sanitizedName} ${sanitizedEmail} ${sanitizedMessage}`;
  if (containsSpamPatterns(fullText)) {
    errors.push('Message contains suspicious content');
  }

  return {
    name: sanitizedName,
    email: sanitizedEmail,
    message: sanitizedMessage,
    isValid: errors.length === 0,
    errors,
  };
}

