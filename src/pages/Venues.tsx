import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { venues } from '@/data/venueData';
import { Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Venues = () => {
  const { language, isRTL } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className={cn("mb-12", isRTL && "text-right")}>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isRTL ? 'استكشف أماكننا' : 'Explore Our Venues'}
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              {isRTL 
                ? 'اكتشف مجموعتنا من الأماكن ذات المستوى العالمي المتاحة للفعاليات والمؤتمرات والمناسبات الخاصة.'
                : 'Discover our collection of world-class venues available for events, conferences, and special occasions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className={cn(
                  "group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--card-shadow-hover)]",
                  isRTL && "text-right"
                )}
              >
                {/* Placeholder image area */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-primary/30" />
                </div>

                <div className="p-6">
                  <div className={cn("flex items-start justify-between gap-4 mb-4", isRTL && "flex-row-reverse")}>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {language === 'ar' ? venue.nameAr : venue.name}
                      </h3>
                      <span className="text-sm text-primary font-medium">
                        {language === 'ar' ? venue.typeLabelAr : venue.typeLabel}
                      </span>
                    </div>
                    <div className={cn("flex items-center gap-1 text-muted-foreground", isRTL && "flex-row-reverse")}>
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{venue.capacity.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                    {language === 'ar' ? venue.descriptionAr : venue.description}
                  </p>

                  <Link to="/login">
                    <Button variant="hero" size="sm" className="w-full">
                      {isRTL ? 'طلب حجز' : 'Request Booking'}
                    </Button>
                  </Link>
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

export default Venues;
