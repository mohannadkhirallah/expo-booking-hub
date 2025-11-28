import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle2, 
  FileText, 
  Clock, 
  Home,
  Calendar,
  ArrowRight,
  MapPin,
  Users,
  Plus,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getVenueById } from '@/data/venueData';

const BookingConfirmation = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const isRTL = language === 'ar';

  const referenceNumber = searchParams.get('ref') || 'EVD-2025-003';
  const status = searchParams.get('status') || 'submitted';
  const isDraft = status === 'draft';

  // Dummy booking data for display
  const venueId = searchParams.get('venue') || 'al-wasl-plaza';
  const venue = getVenueById(venueId);
  const dummyBooking = {
    eventTitle: 'Sustainable Innovation Summit 2025',
    eventType: 'Conference',
    startDate: '2025-03-15',
    endDate: '2025-03-17',
    attendees: 500,
    venue: venue?.name || 'Al Wasl Plaza'
  };

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
                  : (isRTL ? 'تم تقديم الطلب بنجاح!' : 'Booking Request Submitted!')}
              </h1>

              {/* Description */}
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {isDraft
                  ? (isRTL 
                      ? 'تم حفظ طلبك كمسودة. يمكنك العودة لإكماله في أي وقت من صفحة حجوزاتي.'
                      : 'Your booking has been saved as a draft. You can return to complete it anytime from My Bookings.')
                  : (isRTL 
                      ? 'تم تقديم طلب الحجز الخاص بك إلى إكسبو سيتي دبي. سيقوم الفريق الداخلي بمراجعة الطلب في Dynamics 365 وسيتم إشعار منظم الفعالية.'
                      : 'Your booking request has been submitted to Expo City Dubai. Internal teams will review the request in Dynamics 365 and the organizer will be notified.')}
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

              {/* Booking Summary Section */}
              <div className="mb-8">
                <Separator className="mb-6" />
                <h3 className={cn("font-semibold text-foreground mb-4", isRTL && "text-right")}>
                  {isRTL ? 'ملخص الحجز' : 'Booking Summary'}
                </h3>
                <div className="grid gap-4 text-sm">
                  {/* Event Title */}
                  <div className={cn("flex items-start gap-3", isRTL && "flex-row-reverse text-right")}>
                    <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-muted-foreground mb-1">
                        {isRTL ? 'عنوان الفعالية' : 'Event Title'}
                      </p>
                      <p className="font-medium text-foreground break-words">
                        {dummyBooking.eventTitle}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className={cn("flex items-start gap-3", isRTL && "flex-row-reverse text-right")}>
                    <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-1">
                        {isRTL ? 'التاريخ' : 'Date'}
                      </p>
                      <p className="font-medium text-foreground">
                        {new Date(dummyBooking.startDate).toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                        {' - '}
                        {new Date(dummyBooking.endDate).toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className={cn("flex items-start gap-3", isRTL && "flex-row-reverse text-right")}>
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-1">
                        {isRTL ? 'المكان' : 'Venue'}
                      </p>
                      <p className="font-medium text-foreground">
                        {dummyBooking.venue}
                      </p>
                    </div>
                  </div>

                  {/* Attendees */}
                  <div className={cn("flex items-start gap-3", isRTL && "flex-row-reverse text-right")}>
                    <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-1">
                        {isRTL ? 'عدد الحضور' : 'Attendees'}
                      </p>
                      <p className="font-medium text-foreground">
                        {dummyBooking.attendees.toLocaleString(isRTL ? 'ar-AE' : 'en-US')} {isRTL ? 'شخص' : 'people'}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className={cn("flex items-start gap-3", isRTL && "flex-row-reverse text-right")}>
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-1">
                        {isRTL ? 'الحالة' : 'Status'}
                      </p>
                      <p className="font-medium text-foreground">
                        {isDraft 
                          ? (isRTL ? 'مسودة' : 'Draft')
                          : (isRTL ? 'مقدم - قيد المراجعة' : 'Submitted – Pending Review')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button 
                  asChild
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link to="/my-bookings">
                    {isRTL ? 'الذهاب إلى حجوزاتي' : 'Go to My Bookings'}
                    <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  asChild
                  size="lg"
                  className="w-full"
                >
                  <Link to="/venues">
                    <Plus className="w-4 h-4 me-2" />
                    {isRTL ? 'إجراء حجز آخر' : 'Make Another Booking'}
                  </Link>
                </Button>

                <Button 
                  variant="ghost" 
                  asChild
                  size="sm"
                  className="w-full"
                >
                  <Link to={`/booking/${referenceNumber}`}>
                    {isRTL ? 'عرض تفاصيل الحجز' : 'View Booking Details'}
                    <ExternalLink className="w-3 h-3 ms-2" />
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