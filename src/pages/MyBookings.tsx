import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { sampleBookings, getVenueById } from '@/data/venueData';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const MyBookings = () => {
  const { language, isRTL } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Under Review':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Rejected':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className={cn("mb-12", isRTL && "text-right")}>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isRTL ? 'حجوزاتي' : 'My Bookings'}
            </h1>
            <p className="text-muted-foreground">
              {isRTL 
                ? 'تتبع حالة طلبات الحجز الخاصة بك'
                : 'Track the status of your booking requests'}
            </p>
          </div>

          <div className="space-y-4">
            {sampleBookings.map((booking) => {
              const venue = getVenueById(booking.venueId);
              return (
                <div
                  key={booking.id}
                  className={cn(
                    "bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all",
                    isRTL && "text-right"
                  )}
                >
                  <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4", isRTL && "md:flex-row-reverse")}>
                    <div>
                      <div className={cn("flex items-center gap-2 mb-2", isRTL && "flex-row-reverse")}>
                        <span className="text-sm font-mono text-muted-foreground">{booking.id}</span>
                        <Badge className={cn("border", getStatusColor(booking.status))}>
                          {language === 'ar' ? booking.statusAr : booking.status}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {language === 'ar' ? booking.eventNameAr : booking.eventName}
                      </h3>
                      <div className={cn("flex flex-wrap gap-4 text-sm text-muted-foreground", isRTL && "flex-row-reverse")}>
                        <span className={cn("flex items-center gap-1", isRTL && "flex-row-reverse")}>
                          <MapPin className="w-4 h-4" />
                          {venue && (language === 'ar' ? venue.nameAr : venue.name)}
                        </span>
                        <span className={cn("flex items-center gap-1", isRTL && "flex-row-reverse")}>
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.date).toLocaleDateString(language === 'ar' ? 'ar-AE' : 'en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyBookings;
