import { Search, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const HowItWorksSection = () => {
  const { t, isRTL } = useLanguage();

  const steps = [
    {
      icon: Search,
      number: '01',
      title: t('how.step1.title'),
      description: t('how.step1.desc'),
    },
    {
      icon: FileText,
      number: '02',
      title: t('how.step2.title'),
      description: t('how.step2.desc'),
    },
    {
      icon: CheckCircle,
      number: '03',
      title: t('how.step3.title'),
      description: t('how.step3.desc'),
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('how.title')}
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden md:block absolute top-24 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12",
            isRTL && "md:grid-flow-col-dense"
          )}>
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center animate-slide-up opacity-0 [animation-fill-mode:forwards]"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step number & icon */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-card border-2 border-primary/20 flex items-center justify-center shadow-lg">
                    <step.icon className="w-9 h-9 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">{step.number}</span>
                  </div>
                </div>

                {/* Arrow (mobile) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden mb-4">
                    <ArrowRight className={cn(
                      "w-6 h-6 text-primary/50 rotate-90",
                      isRTL && "rotate-90"
                    )} />
                  </div>
                )}

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
