import { Link } from 'react-router-dom';
import { ArrowRight, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Al Wasl Plaza" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Black overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-black/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-black/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-black/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-black/5 rounded-full" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in backdrop-blur-sm",
            isRTL && "flex-row-reverse"
          )}>
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {isRTL ? 'بوابة الحجز الرسمية' : 'Official Booking Portal'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up text-gradient leading-tight pb-4">
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className={cn(
            "text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto animate-slide-up",
            "opacity-0 [animation-delay:0.2s] [animation-fill-mode:forwards]"
          )}>
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up",
            "opacity-0 [animation-delay:0.4s] [animation-fill-mode:forwards]",
            isRTL && "sm:flex-row-reverse"
          )}>
            <Link to="/venues">
              <Button variant="hero" size="xl" className={cn("gap-2", isRTL && "flex-row-reverse")}>
                {t('hero.exploreBtn')}
                <ArrowRight className={cn("w-5 h-5", isRTL && "rotate-180")} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="heroOutline" size="xl" className="backdrop-blur-xl bg-black/30 border-white/20">
                {t('hero.startBooking')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/60 to-transparent" />
    </section>
  );
};

export default HeroSection;
