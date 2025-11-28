import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { getVenueById } from '@/data/venueData';
import { Users, MapPin, ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const VenueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, isRTL } = useLanguage();
  const venue = getVenueById(id || '');

  if (!venue) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 md:pt-28 pb-16 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {isRTL ? 'المكان غير موجود' : 'Venue Not Found'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {isRTL ? 'لم نتمكن من العثور على المكان المطلوب.' : "We couldn't find the venue you're looking for."}
            </p>
            <Link to="/venues">
              <Button variant="hero">
                {isRTL ? 'العودة إلى الأماكن' : 'Back to Venues'}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/venues" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {isRTL ? 'العودة إلى الأماكن' : 'Back to Venues'}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Placeholder */}
              <div className="relative h-64 md:h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-8">
                <MapPin className="w-24 h-24 text-primary/30" />
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "absolute top-4 bg-background/90 backdrop-blur-sm",
                    isRTL ? "right-4" : "left-4"
                  )}
                >
                  {venue.type === 'indoor' 
                    ? (isRTL ? 'داخلي' : 'Indoor') 
                    : (isRTL ? 'خارجي' : 'Outdoor')}
                </Badge>
              </div>

              {/* Venue Info */}
              <div className={cn(isRTL && "text-right")}>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {language === 'ar' ? venue.nameAr : venue.name}
                </h1>
                <p className="text-lg text-primary font-medium mb-6">
                  {language === 'ar' ? venue.typeLabelAr : venue.typeLabel}
                </p>

                <div className={cn("flex items-center gap-4 mb-6", isRTL && "flex-row-reverse justify-end")}>
                  <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{venue.capacity.toLocaleString()} {isRTL ? 'شخص' : 'guests'}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {language === 'ar' ? venue.descriptionAr : venue.description}
                </p>

                {/* Event Tags */}
                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-3">
                    {isRTL ? 'مناسب لـ' : 'Suitable For'}
                  </h3>
                  <div className={cn("flex flex-wrap gap-2", isRTL && "justify-end")}>
                    {(language === 'ar' ? venue.eventTagsAr : venue.eventTags).map((tag, i) => (
                      <Badge key={i} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-28">
                <h3 className={cn("text-lg font-semibold text-foreground mb-4", isRTL && "text-right")}>
                  {isRTL ? 'احجز هذا المكان' : 'Book This Venue'}
                </h3>

                <div className={cn("space-y-3 mb-6", isRTL && "text-right")}>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{isRTL ? 'السعة' : 'Capacity'}</span>
                    <span className="font-medium">{venue.capacity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{isRTL ? 'النوع' : 'Type'}</span>
                    <span className="font-medium">
                      {venue.type === 'indoor' 
                        ? (isRTL ? 'داخلي' : 'Indoor') 
                        : (isRTL ? 'خارجي' : 'Outdoor')}
                    </span>
                  </div>
                </div>

                <Link to={`/login?redirect=/booking/step1&venue=${venue.id}`} className="block">
                  <Button variant="hero" size="lg" className={cn("w-full gap-2", isRTL && "flex-row-reverse")}>
                    <Zap className="w-5 h-5" />
                    {isRTL ? 'ابدأ الحجز' : 'Start Booking'}
                  </Button>
                </Link>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  {isRTL 
                    ? 'يتطلب تسجيل الدخول للمتابعة'
                    : 'Sign in required to continue'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VenueDetail;
