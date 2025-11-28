import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { FileText, HelpCircle, Mail, ArrowLeft, ArrowRight } from 'lucide-react';

const Guidelines = () => {
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  const sections = [
    {
      icon: FileText,
      title: isRTL ? 'إرشادات الحجز' : 'Booking Guidelines',
      content: isRTL 
        ? 'يجب تقديم جميع طلبات الحجز قبل 30 يومًا على الأقل من تاريخ الفعالية. يرجى التأكد من توفر جميع الوثائق المطلوبة بما في ذلك تفاصيل الفعالية والترخيص ومعلومات التأمين.'
        : 'All booking requests must be submitted at least 30 days prior to the event date. Please ensure all required documentation is available including event details, licensing, and insurance information.'
    },
    {
      icon: HelpCircle,
      title: isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions',
      content: isRTL
        ? 'للاستفسارات حول توفر المكان أو الأسعار أو المتطلبات الفنية، يرجى الرجوع إلى قسم الأسئلة الشائعة الشامل الخاص بنا أو التواصل مع فريق الدعم.'
        : 'For inquiries about venue availability, pricing, or technical requirements, please refer to our comprehensive FAQ section or contact our support team.'
    },
    {
      icon: Mail,
      title: isRTL ? 'اتصل بنا' : 'Contact Us',
      content: isRTL
        ? 'للحصول على المساعدة في حجوزاتك، تواصل مع فريق الدعم على bookings@expocitydubai.ae أو اتصل على +971 4 XXX XXXX.'
        : 'For assistance with your bookings, reach out to our support team at bookings@expocitydubai.ae or call +971 4 XXX XXXX.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className={cn("mb-12", isRTL && "text-right")}>
            <div className={cn("flex items-center gap-4 mb-4", isRTL && "flex-row-reverse")}>
              <button
                onClick={() => navigate(-1)}
                className={cn(
                  "inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors",
                )}
              >
                {isRTL ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {isRTL ? 'الأسئلة الشائعة والإرشادات' : 'FAQs & Guidelines'}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {isRTL 
                ? 'كل ما تحتاج لمعرفته حول حجز الأماكن في إكسبو سيتي دبي'
                : 'Everything you need to know about booking venues at Expo City Dubai'}
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className={cn(
                  "bg-card border border-border rounded-xl p-6",
                  isRTL && "text-right"
                )}
              >
                <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse")}>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guidelines;
