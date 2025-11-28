import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { venueSites, getFacilityTypes, getFacilityTypeLabel, getMaxCapacity, FacilityType } from '@/data/venueData';
import { Users, MapPin, Search, Filter, Calendar, ChevronDown, Eye, Zap, Building2, Layers } from 'lucide-react';
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
  const [facilityType, setFacilityType] = useState<string>('all');
  const [capacityRange, setCapacityRange] = useState<string>('all');
  const [preferredDate, setPreferredDate] = useState<Date | undefined>();
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter venue sites based on selected criteria
  const filteredSites = venueSites.filter(site => {
    const matchesSearch = searchQuery === '' || 
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.nameAr.includes(searchQuery) ||
      site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.descriptionAr.includes(searchQuery) ||
      site.facilities.some(f => 
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.nameAr.includes(searchQuery)
      );

    const matchesFacilityType = facilityType === 'all' ||
      site.facilities.some(f => f.type === facilityType);

    const matchesCapacity = capacityRange === 'all' ||
      site.facilities.some(f => {
        const maxCap = getMaxCapacity(f.capacity);
        return (capacityRange === '0-500' && maxCap <= 500) ||
          (capacityRange === '500-1000' && maxCap > 500 && maxCap <= 1000) ||
          (capacityRange === '1000-3000' && maxCap > 1000 && maxCap <= 3000) ||
          (capacityRange === '3000+' && maxCap > 3000);
      });

    return matchesSearch && matchesFacilityType && matchesCapacity;
  });

  const facilityTypeOptions = [
    { value: 'all', label: isRTL ? 'جميع الأنواع' : 'All Types' },
    ...getFacilityTypes().map(type => ({
      value: type,
      label: getFacilityTypeLabel(type, isRTL)
    }))
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

      {/* Facility Type */}
      <Select value={facilityType} onValueChange={setFacilityType}>
        <SelectTrigger className="h-11">
          <SelectValue placeholder={isRTL ? 'نوع المرفق' : 'Facility Type'} />
        </SelectTrigger>
        <SelectContent>
          {facilityTypeOptions.map(option => (
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
              {isRTL ? 'استكشف مواقعنا' : 'Explore Our Venue Sites'}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'اكتشف مواقعنا ذات المستوى العالمي، كل موقع يحتوي على مرافق متعددة للفعاليات والمؤتمرات.'
                : 'Discover our world-class venue sites, each containing multiple facilities for events and conferences.'}
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
              ? `عرض ${filteredSites.length} من ${venueSites.length} موقع`
              : `Showing ${filteredSites.length} of ${venueSites.length} venue sites`}
          </div>

          {/* Venue Site Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSites.map((site, index) => {
              const totalCapacity = site.facilities.reduce((sum, f) => sum + getMaxCapacity(f.capacity), 0);
              return (
                <div
                  key={site.id}
                  className={cn(
                    "group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--card-shadow-hover)]",
                    "animate-fade-in opacity-0 [animation-fill-mode:forwards]"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Site Image */}
                  <div className="relative h-52 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                    {site.image ? (
                      <img 
                        src={site.image} 
                        alt={language === 'ar' ? site.nameAr : site.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MapPin className="w-16 h-16 text-primary/30" />
                      </div>
                    )}
                    {/* Facilities Count Badge */}
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "absolute top-4 bg-background/90 backdrop-blur-sm gap-1",
                        isRTL ? "right-4" : "left-4"
                      )}
                    >
                      <Layers className="w-3 h-3" />
                      {site.facilities.length} {isRTL ? 'مرافق' : 'spaces'}
                    </Badge>
                  </div>

                  <div className="p-6">
                    {/* Site Header */}
                    <div className={cn("flex items-start justify-between gap-4 mb-3", isRTL && "flex-row-reverse")}>
                      <div className={cn(isRTL && "text-right")}>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {language === 'ar' ? site.nameAr : site.name}
                        </h3>
                        <span className="text-sm text-primary font-medium">
                          {isRTL ? 'إكسبو سيتي دبي' : 'Expo City Dubai'}
                        </span>
                      </div>
                      <div className={cn("flex items-center gap-1 text-muted-foreground shrink-0", isRTL && "flex-row-reverse")}>
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">{totalCapacity.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={cn("text-muted-foreground text-sm mb-4 line-clamp-2", isRTL && "text-right")}>
                      {language === 'ar' ? site.descriptionAr : site.description}
                    </p>

                    {/* Facilities List */}
                    <div className={cn("mb-4 p-3 rounded-lg bg-muted/30", isRTL && "text-right")}>
                      <p className={cn("text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1", isRTL && "flex-row-reverse")}>
                        <Building2 className="w-3 h-3" />
                        {isRTL ? 'يشمل:' : 'Includes:'}
                      </p>
                      <div className="space-y-1">
                        {site.facilities.slice(0, 3).map((facility) => (
                          <p key={facility.id} className="text-sm text-foreground">
                            • {language === 'ar' ? facility.nameAr : facility.name}
                          </p>
                        ))}
                        {site.facilities.length > 3 && (
                          <p className="text-sm text-primary font-medium">
                            +{site.facilities.length - 3} {isRTL ? 'مرافق أخرى' : 'more spaces'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Event Tags */}
                    <div className={cn("flex flex-wrap gap-2 mb-6", isRTL && "justify-end")}>
                      {(language === 'ar' ? site.eventTagsAr : site.eventTags).slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className={cn("flex gap-3", isRTL && "flex-row-reverse")}>
                      <Link to={`/venues/${site.slug}`} className="flex-1">
                        <Button variant="outline" size="sm" className={cn("w-full gap-2", isRTL && "flex-row-reverse")}>
                          <Eye className="w-4 h-4" />
                          {isRTL ? 'عرض المرافق' : 'View Facilities'}
                        </Button>
                      </Link>
                      <Link to={`/login?redirect=/booking/step1&venue=${site.id}`} className="flex-1">
                        <Button variant="hero" size="sm" className={cn("w-full gap-2", isRTL && "flex-row-reverse")}>
                          <Zap className="w-4 h-4" />
                          {isRTL ? 'ابدأ الحجز' : 'Start Booking'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredSites.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {isRTL ? 'لم يتم العثور على مواقع' : 'No Venue Sites Found'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isRTL 
                  ? 'جرب تعديل معايير البحث للعثور على مواقع مناسبة.'
                  : 'Try adjusting your search criteria to find suitable venues.'}
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setFacilityType('all');
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
