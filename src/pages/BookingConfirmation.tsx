import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  FileText, 
  Clock, 
  Home,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const BookingConfirmation = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const isRTL = language === 'ar';

  const referenceNumber = searchParams.get('ref') || 'EVD-2025-003';
  const status = searchParams.get('status') || 'submitted';
  const isDraft = status === 'draft';

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Success Card */}
          <Card className="text-center">
            <CardContent className="pt-12 pb-8 px-6 md:px-12">
              {/* Icon */}
              <div className={cn(
                "w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6",
                isDraft ? "bg-muted" : "bg-primary/10"
              )}>
                {isDraft ? (
                  <FileText className="w-10 h-10 text-muted-foreground" />
                ) : (
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {isDraft
                  ? (isRTL ? 'تم حفظ المسودة' : 'Draft Saved')
                  : (isRTL ? 'تم تقديم الحجز بنجاح!' : 'Booking Submitted Successfully!')}
              </h1>

              {/* Description */}
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {isDraft
                  ? (isRTL 
                      ? 'تم حفظ طلبك كمسودة. يمكنك العودة لإكماله في أي وقت من صفحة حجوزاتي.'
                      : 'Your request has been saved as a draft. You can return to complete it anytime from My Bookings.')
                  : (isRTL 
                      ? 'تم استلام طلبك وسيتم مراجعته من قبل فرق إكسبو سيتي دبي المختصة. ستتلقى تحديثًا عبر البريد الإلكتروني قريبًا.'
                      : 'Your request has been received and will be reviewed by the appropriate Expo City Dubai teams. You will receive an email update shortly.')}
              </p>

              {/* Reference Number Card */}
              <div className="bg-muted/50 rounded-xl p-6 mb-8">
                <p className="text-sm text-muted-foreground mb-2">
                  {isRTL ? 'الرقم المرجعي للحجز' : 'Booking Reference Number'}
                </p>
                <p className="text-3xl font-bold text-foreground tracking-wider mb-3">
                  {referenceNumber}
                </p>
                <Badge 
                  variant={isDraft ? "secondary" : "default"}
                  className={cn(
                    "text-sm px-4 py-1",
                    !isDraft && "bg-primary/20 text-primary hover:bg-primary/30"
                  )}
                >
                  {isDraft ? (
                    <><FileText className="w-3 h-3 me-1" /> {isRTL ? 'مسودة' : 'Draft'}</>
                  ) : (
                    <><Clock className="w-3 h-3 me-1" /> {isRTL ? 'قيد المراجعة' : 'Under Review'}</>
                  )}
                </Badge>
              </div>

              {/* What's Next Section */}
              {!isDraft && (
                <div className={cn("text-left mb-8 p-4 rounded-lg bg-muted/30", isRTL && "text-right")}>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Calendar className={cn("w-4 h-4 text-primary", isRTL && "order-2")} />
                    {isRTL ? 'الخطوات التالية' : "What's Next"}
                  </h3>
                  <ul className={cn("space-y-2 text-sm text-muted-foreground", isRTL ? "mr-6" : "ml-6")}>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">1.</span>
                      {isRTL 
                        ? 'سيقوم فريقنا بمراجعة طلبك خلال 3-5 أيام عمل.'
                        : 'Our team will review your request within 3-5 business days.'}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">2.</span>
                      {isRTL 
                        ? 'قد نتواصل معك للحصول على معلومات إضافية إذا لزم الأمر.'
                        : 'We may contact you for additional information if needed.'}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">3.</span>
                      {isRTL 
                        ? 'ستتلقى إشعارًا بالموافقة أو طلب تعديلات.'
                        : 'You will receive notification of approval or requested modifications.'}
                    </li>
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  asChild
                  className="min-w-[160px]"
                >
                  <Link to="/">
                    <Home className="w-4 h-4 me-2" />
                    {isRTL ? 'الصفحة الرئيسية' : 'Back to Home'}
                  </Link>
                </Button>
                <Button 
                  asChild
                  className="min-w-[160px] bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link to="/my-bookings">
                    {isRTL ? 'حجوزاتي' : 'My Bookings'}
                    <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {isRTL 
              ? 'للاستفسارات، يرجى التواصل مع فريق حجوزات إكسبو سيتي دبي على'
              : 'For inquiries, please contact the Expo City Dubai bookings team at'}{' '}
            <a href="mailto:bookings@expocitydubai.ae" className="text-primary hover:underline">
              bookings@expocitydubai.ae
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;