import { Building, Headphones, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const BenefitsSection = () => {
  const { t, isRTL } = useLanguage();

  const benefits = [
    {
      icon: Building,
      title: t('benefits.venues.title'),
      description: t('benefits.venues.desc'),
    },
    {
      icon: Headphones,
      title: t('benefits.support.title'),
      description: t('benefits.support.desc'),
    },
    {
      icon: Eye,
      title: t('benefits.tracking.title'),
      description: t('benefits.tracking.desc'),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8",
          isRTL && "md:grid-flow-col-dense"
        )}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={cn(
                "group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300",
                "hover:shadow-[var(--card-shadow-hover)]",
                "animate-slide-up opacity-0 [animation-fill-mode:forwards]",
                isRTL && "text-right"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={cn(
                "w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors",
                isRTL && "mr-0 ml-auto"
              )}>
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
