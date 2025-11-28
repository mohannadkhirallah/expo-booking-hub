import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { venues } from '@/data/venueData';
import { Users, MapPin, Search, Filter, Calendar, ChevronDown, Eye, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { format } from 'date-fns';

const Venues = () => {
  const { language, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [venueType, setVenueType] = useState<string>('all');
  const [capacityRange, setCapacityRange] = useState<string>('all');
  const [preferredDate, setPreferredDate] = useState<Date | undefined>();
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter venues based on selected criteria
  const filteredVenues = venues.filter(venue => {
    const matchesSearch = searchQuery === '' || 
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.nameAr.includes(searchQuery) ||
      venue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.descriptionAr.includes(searchQuery);

    const matchesType = venueType === 'all' || 
      venue.type === venueType || 
      venue.category === venueType;

    const matchesCapacity = capacityRange === 'all' ||
      (capacityRange === '0-500' && venue.capacity <= 500) ||
      (capacityRange === '500-1000' && venue.capacity > 500 && venue.capacity <= 1000) ||
      (capacityRange === '1000-3000' && venue.capacity > 1000 && venue.capacity <= 3000) ||
      (capacityRange === '3000+' && venue.capacity > 3000);

    return matchesSearch && matchesType && matchesCapacity;
  });

  const venueTypeOptions = [
    { value: 'all', label: isRTL ? 'جميع الأنواع' : 'All Types' },
    { value: 'indoor', label: isRTL ? 'داخلي' : 'Indoor' },
    { value: 'outdoor', label: isRTL ? 'خارجي' : 'Outdoor' },
    { value: 'conference', label: isRTL ? 'قاعة مؤتمرات' : 'Conference Hall' },
    { value: 'plaza', label: isRTL ? 'ساحة' : 'Plaza' },
    { value: 'auditorium', label: isRTL ? 'قاعة عروض' : 'Auditorium' },
  ];

  const capacityOptions = [
    { value: 'all', label: isRTL ? 'أي سعة' : 'Any Capacity' },
    { value: '0-500', label: isRTL ? '0 - 500' : '0 - 500' },
    { value: '500-1000', label: isRTL ? '500 - 1,000' : '500 - 1,000' },
    { value: '1000-3000', label: isRTL ? '1,000 - 3,000' : '1,000 - 3,000' },
    { value: '3000+', label: isRTL ? '3,000+' : '3,000+' },
  ];

  const FilterPanel = () => (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
      isRTL && "text-right"
    )}>
      {/* Keyword Search */}
      <div className="relative">
        <Search className={cn(
          "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
          isRTL ? "right-3" : "left-3"
        )} />
        <Input
          placeholder={isRTL ? 'ابحث عن مكان...' : 'Search venues...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn("h-11", isRTL ? "pr-10" : "pl-10")}
        />
      </div>

      {/* Venue Type */}
      <Select value={venueType} onValueChange={setVenueType}>
        <SelectTrigger className="h-11">
          <SelectValue placeholder={isRTL ? 'نوع المكان' : 'Venue Type'} />
        </SelectTrigger>
        <SelectContent>
          {venueTypeOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Capacity Range */}
      <Select value={capacityRange} onValueChange={setCapacityRange}>
        <SelectTrigger className="h-11">
          <SelectValue placeholder={isRTL ? 'السعة' : 'Capacity'} />
        </SelectTrigger>
        <SelectContent>
          {capacityOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-11 justify-start text-left font-normal",
              !preferredDate && "text-muted-foreground",
              isRTL && "text-right flex-row-reverse"
            )}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {preferredDate 
              ? format(preferredDate, 'PPP') 
              : (isRTL ? 'التاريخ المفضل' : 'Preferred Date')}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={preferredDate}
            onSelect={setPreferredDate}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-8">
            {/* Step Indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">1</span>
              <span className="text-sm font-medium text-primary">
                {isRTL ? 'استكشف الأماكن' : 'Explore Venues'}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isRTL ? 'استكشف أماكننا' : 'Explore Our Venues'}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'اكتشف مجموعتنا من الأماكن ذات المستوى العالمي المتاحة للفعاليات والمؤتمرات والمناسبات الخاصة.'
                : 'Discover our collection of world-class venues available for events, conferences, and special occasions.'}
            </p>
          </div>

          {/* Filters - Desktop */}
          <div className="hidden md:block bg-card border border-border rounded-2xl p-6 mb-8">
            <FilterPanel />
          </div>

          {/* Filters - Mobile */}
          <div className="md:hidden mb-6">
            <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-between", isRTL && "flex-row-reverse")}>
                  <span className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    <Filter className="w-4 h-4" />
                    {isRTL ? 'تصفية النتائج' : 'Filter Results'}
                  </span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", filtersOpen && "rotate-180")} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 bg-card border border-border rounded-2xl p-4">
                <FilterPanel />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Results Count */}
          <div className={cn("mb-6 text-sm text-muted-foreground", isRTL && "text-right")}>
            {isRTL 
              ? `عرض ${filteredVenues.length} من ${venues.length} مكان`
              : `Showing ${filteredVenues.length} of ${venues.length} venues`}
          </div>

          {/* Venue Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue, index) => (
              <div
                key={venue.id}
                className={cn(
                  "group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--card-shadow-hover)]",
                  "animate-fade-in opacity-0 [animation-fill-mode:forwards]"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Venue Image */}
                <div className="relative h-52 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                  {venue.image ? (
                    <img 
                      src={venue.image} 
                      alt={language === 'ar' ? venue.nameAr : venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="w-16 h-16 text-primary/30" />
                    </div>
                  )}
                  {/* Type Badge */}
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

                <div className="p-6">
                  {/* Venue Header */}
                  <div className={cn("flex items-start justify-between gap-4 mb-3", isRTL && "flex-row-reverse")}>
                    <div className={cn(isRTL && "text-right")}>
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {language === 'ar' ? venue.nameAr : venue.name}
                      </h3>
                      <span className="text-sm text-primary font-medium">
                        {language === 'ar' ? venue.typeLabelAr : venue.typeLabel}
                      </span>
                    </div>
                    <div className={cn("flex items-center gap-1 text-muted-foreground shrink-0", isRTL && "flex-row-reverse")}>
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">{venue.capacity.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={cn("text-muted-foreground text-sm mb-4 line-clamp-2", isRTL && "text-right")}>
                    {language === 'ar' ? venue.descriptionAr : venue.description}
                  </p>

                  {/* Event Tags */}
                  <div className={cn("flex flex-wrap gap-2 mb-6", isRTL && "justify-end")}>
                    {(language === 'ar' ? venue.eventTagsAr : venue.eventTags).slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className={cn("flex gap-3", isRTL && "flex-row-reverse")}>
                    <Link to={`/venues/${venue.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className={cn("w-full gap-2", isRTL && "flex-row-reverse")}>
                        <Eye className="w-4 h-4" />
                        {isRTL ? 'عرض التفاصيل' : 'View Details'}
                      </Button>
                    </Link>
                    <Link to={`/login?redirect=/booking/step1&venue=${venue.id}`} className="flex-1">
                      <Button variant="hero" size="sm" className={cn("w-full gap-2", isRTL && "flex-row-reverse")}>
                        <Zap className="w-4 h-4" />
                        {isRTL ? 'حجز سريع' : 'Quick Book'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredVenues.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {isRTL ? 'لم يتم العثور على أماكن' : 'No Venues Found'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isRTL 
                  ? 'جرب تعديل معايير البحث للعثور على أماكن مناسبة.'
                  : 'Try adjusting your search criteria to find suitable venues.'}
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setVenueType('all');
                  setCapacityRange('all');
                  setPreferredDate(undefined);
                }}
              >
                {isRTL ? 'إعادة تعيين الفلاتر' : 'Reset Filters'}
              </Button>
            </div>
          )}

          {/* Journey Indicator */}
          <div className="mt-12 flex justify-center">
            <div className={cn(
              "inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 shadow-lg",
              isRTL && "flex-row-reverse"
            )}>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center">
                  ✓
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  {isRTL ? 'الخطوة 1' : 'Step 1'}
                </span>
              </div>
              <div className="w-8 h-0.5 bg-primary/30" />
              <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center animate-pulse">
                  2
                </span>
                <div className={cn(isRTL && "text-right")}>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'الخطوة التالية' : 'Next Step'}</p>
                  <p className="font-semibold text-foreground">{isRTL ? 'تقديم طلب الحجز' : 'Submit Booking Request'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Venues;
