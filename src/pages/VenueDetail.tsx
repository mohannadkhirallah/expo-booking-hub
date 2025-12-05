import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { getVenueSiteBySlug, getMaxCapacity, formatCapacity, Facility } from '@/data/venueData';
import { 
  Users, MapPin, ArrowLeft, ArrowRight, Zap, Wifi, 
  Monitor, Mic2, UtensilsCrossed, Car, Shield,
  Calendar, Heart, CheckCircle2, ChevronLeft, ChevronRight,
  Building2, Layers, Home, TreePine
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Import venue images
import alWaslPlazaImg from '@/assets/venues/al-wasl-plaza.jpg';
import terraImg from '@/assets/venues/terra-auditorium.webp';
import alifImg from '@/assets/venues/alif.png';
import jubileeParkImg from '@/assets/venues/jubilee-park.png';

// Venue images mapping
const venueImages: Record<string, string> = {
  'al-wasl-plaza': alWaslPlazaImg,
  'terra': terraImg,
  'mobility-district': alifImg,
  'conference-parks': jubileeParkImg,
};

// Amenities data
const amenities = [
  { icon: Wifi, labelEn: 'High-Speed Wi-Fi', labelAr: 'واي فاي عالي السرعة' },
  { icon: Monitor, labelEn: 'AV Equipment', labelAr: 'معدات سمعية وبصرية' },
  { icon: Mic2, labelEn: 'Professional Sound', labelAr: 'نظام صوت احترافي' },
  { icon: UtensilsCrossed, labelEn: 'F&B Compatible', labelAr: 'متوافق مع الأطعمة والمشروبات' },
  { icon: Car, labelEn: 'Parking Access', labelAr: 'موقف سيارات' },
  { icon: Shield, labelEn: 'Security Services', labelAr: 'خدمات أمنية' },
];

// Venue-specific guidelines
const venueGuidelines: Record<string, { en: string[]; ar: string[] }> = {
  'al-wasl-plaza': {
    en: [
      'Maximum noise level: 85 dB after 10 PM',
      'Event hours: 8:00 AM – 12:00 AM',
      'Setup time: Minimum 4 hours before event',
      'All installations must be pre-approved',
      'Drone usage requires special permit',
    ],
    ar: [
      'الحد الأقصى لمستوى الضوضاء: 85 ديسيبل بعد الساعة 10 مساءً',
      'ساعات الفعاليات: 8:00 صباحاً – 12:00 منتصف الليل',
      'وقت الإعداد: 4 ساعات كحد أدنى قبل الفعالية',
      'جميع التركيبات تتطلب موافقة مسبقة',
      'استخدام الطائرات بدون طيار يتطلب تصريح خاص',
    ],
  },
  'terra': {
    en: [
      'Seating configuration changes require 48-hour notice',
      'Technical rehearsal mandatory for performances',
      'Maximum event duration: 6 hours',
      'Food and beverages restricted to designated areas',
      'All content must be pre-approved for projection',
    ],
    ar: [
      'تغييرات ترتيب المقاعد تتطلب إشعار 48 ساعة',
      'البروفة التقنية إلزامية للعروض',
      'الحد الأقصى لمدة الفعالية: 6 ساعات',
      'الأطعمة والمشروبات مقتصرة على المناطق المخصصة',
      'جميع المحتويات تتطلب موافقة مسبقة للعرض',
    ],
  },
  default: {
    en: [
      'Event hours: 8:00 AM – 11:00 PM',
      'Setup and teardown times to be coordinated',
      'All vendors must be pre-approved',
      'Emergency exits must remain accessible',
      'Compliance with Expo City Dubai regulations required',
    ],
    ar: [
      'ساعات الفعاليات: 8:00 صباحاً – 11:00 مساءً',
      'يجب تنسيق أوقات الإعداد والتفكيك',
      'جميع الموردين يجب أن يكونوا معتمدين مسبقاً',
      'مخارج الطوارئ يجب أن تبقى متاحة',
      'يجب الالتزام بلوائح إكسبو سيتي دبي',
    ],
  },
};

const VenueDetail = () => {
  const { id: venueSlug } = useParams<{ id: string }>();
  const { language, isRTL } = useLanguage();
  const venueSite = getVenueSiteBySlug(venueSlug || '');
  const [isShortlisted, setIsShortlisted] = useState(false);

  if (!venueSite) {
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

  const guidelines = venueGuidelines[venueSite.id] || venueGuidelines.default;
  const venueImage = venueImages[venueSite.id] || venueSite.image;
  const totalCapacity = venueSite.facilities.reduce((sum, f) => sum + getMaxCapacity(f.capacity), 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link 
            to="/venues" 
            className={cn(
              "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6",
              isRTL && "flex-row-reverse"
            )}
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {isRTL ? 'العودة إلى جميع الأماكن' : 'Back to All Venues'}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Venue Image */}
              <div className="relative h-64 md:h-[400px] rounded-2xl overflow-hidden">
                {venueImage ? (
                  <img 
                    src={venueImage} 
                    alt={language === 'ar' ? venueSite.nameAr : venueSite.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <MapPin className="w-24 h-24 text-primary/30" />
                  </div>
                )}
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "absolute top-4 bg-background/90 backdrop-blur-sm gap-1",
                    isRTL ? "right-4" : "left-4"
                  )}
                >
                  <Layers className="w-3 h-3" />
                  {venueSite.facilities.length} {isRTL ? 'مرافق' : 'spaces'}
                </Badge>
              </div>

              {/* Venue Site Info */}
              <div className={cn(isRTL && "text-right")}>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {language === 'ar' ? venueSite.nameAr : venueSite.name}
                </h1>
                <p className="text-lg text-primary font-medium mb-4">
                  {isRTL ? 'إكسبو سيتي دبي' : 'Expo City Dubai'}
                </p>

                <div className={cn("flex items-center gap-6 mb-6 flex-wrap", isRTL && "flex-row-reverse justify-end")}>
                  <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-medium">
                      {isRTL ? `حتى ${totalCapacity.toLocaleString()} شخص` : `Up to ${totalCapacity.toLocaleString()} guests`}
                    </span>
                  </div>
                  <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    <Building2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">
                      {venueSite.facilities.length} {isRTL ? 'مرافق متاحة' : 'facilities available'}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-lg">
                  {language === 'ar' ? venueSite.descriptionAr : venueSite.description}
                </p>
              </div>

              {/* Available Facilities Section */}
              <Card>
                <CardHeader>
                  <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                    <Layers className="w-5 h-5 text-primary" />
                    {isRTL ? 'المرافق المتاحة' : 'Available Facilities / Spaces'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {venueSite.facilities.map((facility) => (
                      <FacilityCard 
                        key={facility.id} 
                        facility={facility} 
                        venueSiteId={venueSite.id}
                        isRTL={isRTL} 
                        language={language} 
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle className={cn(isRTL && "text-right")}>
                    {isRTL ? 'المرافق المتوفرة' : 'Included Amenities'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenities.map((amenity, index) => (
                      <div 
                        key={index}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg bg-muted/50",
                          isRTL && "flex-row-reverse"
                        )}
                      >
                        <amenity.icon className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-sm font-medium">
                          {isRTL ? amenity.labelAr : amenity.labelEn}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                    <Shield className="w-5 h-5 text-primary" />
                    {isRTL ? 'إرشادات المكان الرئيسية' : 'Key Venue Guidelines'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className={cn("space-y-3", isRTL && "text-right")}>
                    {(isRTL ? guidelines.ar : guidelines.en).map((guideline, index) => (
                      <li 
                        key={index}
                        className={cn("flex items-start gap-3", isRTL && "flex-row-reverse")}
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{guideline}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/guidelines" 
                    className={cn(
                      "inline-flex items-center gap-2 text-primary hover:underline mt-4 text-sm font-medium",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    {isRTL ? 'عرض جميع الإرشادات' : 'View All Guidelines'}
                    {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="sticky top-28">
                <CardHeader className="pb-3">
                  <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                    <Calendar className="w-5 h-5 text-primary" />
                    {isRTL ? 'ملخص الموقع' : 'Site Overview'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Typical Events */}
                  <h4 className={cn("text-sm font-semibold text-foreground mb-3", isRTL && "text-right")}>
                    {isRTL ? 'فعاليات نموذجية' : 'Typical Events'}
                  </h4>
                  <div className={cn("flex flex-wrap gap-2 mb-6", isRTL && "justify-end")}>
                    {(language === 'ar' ? venueSite.eventTagsAr : venueSite.eventTags).map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className={cn("space-y-3 mb-6", isRTL && "text-right")}>
                    <div className={cn("flex justify-between items-center", isRTL && "flex-row-reverse")}>
                      <span className="text-sm text-muted-foreground">{isRTL ? 'إجمالي السعة' : 'Total Capacity'}</span>
                      <span className="font-medium">{totalCapacity.toLocaleString()}</span>
                    </div>
                    <div className={cn("flex justify-between items-center", isRTL && "flex-row-reverse")}>
                      <span className="text-sm text-muted-foreground">{isRTL ? 'المرافق' : 'Facilities'}</span>
                      <span className="font-medium">{venueSite.facilities.length}</span>
                    </div>
                    <div className={cn("flex justify-between items-center", isRTL && "flex-row-reverse")}>
                      <span className="text-sm text-muted-foreground">{isRTL ? 'الموقع' : 'Location'}</span>
                      <span className="font-medium">{isRTL ? 'إكسبو سيتي دبي' : 'Expo City Dubai'}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link to={`/login?redirect=/booking/step1&venue=${venueSite.id}`} className="block">
                      <Button variant="hero" size="lg" className={cn("w-full gap-2", isRTL && "flex-row-reverse")}>
                        <Zap className="w-5 h-5" />
                        {isRTL ? 'ابدأ الحجز لهذا الموقع' : 'Start Booking for this Site'}
                      </Button>
                    </Link>
                    <Button 
                      variant={isShortlisted ? "default" : "outline"} 
                      size="lg" 
                      className={cn("w-full gap-2", isRTL && "flex-row-reverse")}
                      onClick={() => setIsShortlisted(!isShortlisted)}
                    >
                      <Heart className={cn("w-5 h-5", isShortlisted && "fill-current")} />
                      {isShortlisted 
                        ? (isRTL ? 'تمت الإضافة للقائمة المختصرة' : 'Added to Shortlist')
                        : (isRTL ? 'إضافة للقائمة المختصرة' : 'Add to Shortlist')
                      }
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    {isRTL 
                      ? 'يتطلب تسجيل الدخول للمتابعة بالحجز'
                      : 'Sign in required to continue with booking'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Facility Card Component
interface FacilityCardProps {
  facility: Facility;
  venueSiteId: string;
  isRTL: boolean;
  language: string;
}

const FacilityCard = ({ facility, venueSiteId, isRTL, language }: FacilityCardProps) => {
  const maxCapacity = getMaxCapacity(facility.capacity);
  
  return (
    <div className={cn(
      "p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors",
      isRTL && "text-right"
    )}>
      <div className={cn("flex items-start justify-between gap-4 mb-3", isRTL && "flex-row-reverse")}>
        <div>
          <h4 className="font-semibold text-foreground mb-1">
            {language === 'ar' ? facility.nameAr : facility.name}
          </h4>
          <p className="text-sm text-primary">
            {language === 'ar' ? facility.typeLabelAr : facility.typeLabel}
          </p>
        </div>
        <Badge variant={facility.isIndoor ? "secondary" : "outline"} className="shrink-0">
          {facility.isIndoor 
            ? (isRTL ? (
                <><Home className="w-3 h-3 mr-1" /> داخلي</>
              ) : (
                <><Home className="w-3 h-3 mr-1" /> Indoor</>
              ))
            : (isRTL ? (
                <><TreePine className="w-3 h-3 mr-1" /> خارجي</>
              ) : (
                <><TreePine className="w-3 h-3 mr-1" /> Outdoor</>
              ))
          }
        </Badge>
      </div>
      
      {facility.description && (
        <p className="text-sm text-muted-foreground mb-3">
          {language === 'ar' ? facility.descriptionAr : facility.description}
        </p>
      )}
      
      <div className={cn("flex items-center gap-4 mb-4 flex-wrap", isRTL && "flex-row-reverse justify-end")}>
        <div className={cn("flex items-center gap-1.5 text-sm", isRTL && "flex-row-reverse")}>
          <Users className="w-4 h-4 text-primary" />
          <span>{maxCapacity.toLocaleString()} {isRTL ? 'كحد أقصى' : 'max'}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatCapacity(facility.capacity, isRTL)}
        </span>
      </div>
      
      <Link to={`/login?redirect=/booking/step1&venue=${venueSiteId}&facility=${facility.id}`}>
        <Button variant="hero" size="sm" className={cn("w-full gap-2", isRTL && "flex-row-reverse")}>
          <Zap className="w-4 h-4" />
          {isRTL ? 'ابدأ الحجز لهذا المرفق' : 'Start Booking for this Space'}
        </Button>
      </Link>
    </div>
  );
};

export default VenueDetail;
