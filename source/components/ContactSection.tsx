import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Github, Linkedin, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import GlitchText from './GlitchText';
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { contactFormRateLimiter, getUserIdentifier } from '@/lib/rateLimiter';
import { sanitizeFormData } from '@/lib/sanitization';
import { retryEmailSend } from '@/lib/retryLogic';
import { captureException, captureMessage } from '@/lib/sentry';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailJSReady, setIsEmailJSReady] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Check rate limit on mount
  useEffect(() => {
    const identifier = getUserIdentifier();
    if (!contactFormRateLimiter.isAllowed(identifier)) {
      const timeUntilReset = contactFormRateLimiter.getTimeUntilReset(identifier);
      setRateLimitError(`Please wait ${timeUntilReset} seconds before submitting again.`);
    }
  }, []);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!publicKey) return;

    try {
      emailjs.init(publicKey);
      setIsEmailJSReady(true);
    } catch (error) {
      console.error("EmailJS init failed:", error);
      setIsEmailJSReady(false);
    }
  }, []);

  const validateEmailJSConfig = () => {
    const requiredVars = [
        "VITE_EMAILJS_PUBLIC_KEY",
        "VITE_EMAILJS_SERVICE_ID",
        "VITE_EMAILJS_TEMPLATE_ID"
    ];

    const missing = requiredVars.filter(key => !import.meta.env[key]);

    return missing.length > 0
      ? { valid: false, message: `Missing: ${missing.join(", ")}` }
      : { valid: true };
  };

  const sendAutoReply = async (userEmail: string, userName: string) => {
    try {
      const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;

      // Only send auto-reply if template ID is configured
      if (!autoReplyTemplateId || !serviceId) {
        console.log('Auto-reply template not configured, skipping auto-reply');
        return;
      }

      // Use retry logic for auto-reply
      await retryEmailSend(() =>
        emailjs.send(serviceId, autoReplyTemplateId, {
          to_name: userName,
          to_email: userEmail,
          reply_to: import.meta.env.VITE_YOUR_EMAIL || 'eddieghl1604@gmail.com',
          timestamp: new Date().toLocaleString(),
        })
      );

      console.log('Auto-reply sent successfully');
    } catch (error) {
      // Don't show error to user if auto-reply fails - it's not critical
      console.error('Auto-reply failed (non-critical):', error);
      captureException(error, {
        tags: { component: 'ContactSection', type: 'auto-reply' },
        level: 'warning',
      });
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setRateLimitError(null);

    // Check rate limiting
    const identifier = getUserIdentifier();
    if (!contactFormRateLimiter.isAllowed(identifier)) {
      const timeUntilReset = contactFormRateLimiter.getTimeUntilReset(identifier);
      const remaining = contactFormRateLimiter.getRemaining(identifier);
      setRateLimitError(`Rate limit exceeded. Please wait ${timeUntilReset} seconds.`);
      setIsLoading(false);
      toast.error(`⏱️ Please wait ${timeUntilReset} seconds before submitting again.`);
      return;
    }

    // Sanitize input data
    const sanitized = sanitizeFormData({
      name: data.name,
      email: data.email,
      message: data.message,
    });

    if (!sanitized.isValid) {
      setIsLoading(false);
      sanitized.errors.forEach((error) => toast.error(`❌ ${error}`));
      captureMessage('Form validation failed', {
        level: 'warning',
        tags: { component: 'ContactSection', type: 'validation' },
        extra: { errors: sanitized.errors },
      });
      return;
    }

    const configCheck = validateEmailJSConfig();
    if (!configCheck.valid) {
      toast.error(`❌ ${configCheck.message}`);
      setIsLoading(false);
      return;
    }

    if (!isEmailJSReady) {
      toast.error("❌ Email service not initialized.");
      setIsLoading(false);
      return;
    }

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      // Send the main message with retry logic
      await retryEmailSend(() =>
        emailjs.send(serviceId, templateId, {
          from_name: sanitized.name,
          from_email: sanitized.email,
          message: sanitized.message,
          reply_to: sanitized.email,
          timestamp: new Date().toLocaleString(),
        })
      );

      // Send auto-reply to the user (non-blocking)
      sendAutoReply(sanitized.email, sanitized.name).catch((err) => {
        console.error('Auto-reply error:', err);
        captureException(err, {
          tags: { component: 'ContactSection', type: 'auto-reply' },
        });
      });

      toast.success("⚡ Message sent successfully!");
      reset();
    } catch (error: unknown) {
      console.error("Email send error:", error);
      
      // Track error with Sentry
      captureException(error, {
        tags: { component: 'ContactSection', type: 'email-send' },
        extra: {
          email: sanitized.email.substring(0, 3) + '***', // Partial email for debugging
        },
      });

      toast.error("❌ Transmission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const socials = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/eddieghl1604' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://my.linkedin.com/in/eddie-ghl' },
    { icon: Mail, label: 'Email', url: 'mailto:eddieghl1604@gmail.com' },
  ];

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">

        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <GlitchText text="INITIATE" className="text-gradient-cyber" />{' '}
            <span className="text-gradient-gold">CONNECTION</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's build something revolutionary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Left column: Contact Form */}
          <Card className="hologram-panel matrix-effect animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-gradient-cyber">
                <GlitchText text="Send Message" />
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">Transmitting to secure channel - Response within 24 hours</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    {...register('name')}
                    placeholder="Your Name"
                    disabled={isLoading}
                    className={errors.name ? 'border-destructive' : ''}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-destructive text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="Your Email"
                    disabled={isLoading}
                    className={errors.email ? 'border-destructive' : ''}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-destructive text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Textarea
                    {...register('message')}
                    placeholder="Your Message"
                    rows={6}
                    disabled={isLoading}
                    className={errors.message ? 'border-destructive' : ''}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-destructive text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                {rateLimitError && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>{rateLimitError}</span>
                  </div>
                )}
                <Button type="submit" disabled={isLoading || !!rateLimitError} className="w-full">
                  {isLoading ? "Transmitting..." : "⚡ Transmit Message"}
                </Button>
              </form>
              {/* Transcendent Design Element */}
              <div className="mt-8 flex justify-center">
                <div className="w-2/3 h-2 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 animate-pulse shadow-lg" />
              </div>
            </CardContent>
          </Card>

          {/* Right column */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="hologram-panel matrix-effect animate-fade-in min-h-[500px] sm:min-h-[600px] md:min-h-[650px]">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-gradient-gold">Connect</CardTitle>
                <CardDescription className="text-sm sm:text-base">Let's connect on social media</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socials.map(({ label, icon: Icon, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-3 sm:p-4 bg-muted/30 rounded-lg border hover:bg-primary/10 transition-all"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    <span className="text-sm sm:text-base">{label}</span>
                  </a>
                ))}
                <div className="mt-6 sm:mt-8 flex justify-center">
                  <div className="w-full max-w-full">
                    <iframe
                      src='/components/3d_coin.html'
                      frameBorder='0'
                      width='100%'
                      height='100%'
                      title="3D Model"
                      className="rounded-xl shadow-xl h-[400px] sm:h-[450px] md:h-[500px]"
                      style={{ minHeight: '400px' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
