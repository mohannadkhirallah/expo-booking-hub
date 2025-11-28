import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { venues, sampleUser, getVenueById, getVenueSiteById, getFacilityById, getMaxCapacity, formatCapacity } from '@/data/venueData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { 
  User, Building2, Mail, Phone, Calendar, Users, 
  MapPin, ChevronRight, ChevronLeft, Check, Star, Layers
} from 'lucide-react';

// Progress Step Component
const ProgressIndicator = ({ currentStep, isRTL }: { currentStep: number; isRTL: boolean }) => {
  const steps = [
    { number: 1, labelEn: 'Event Details', labelAr: 'تفاصيل الفعالية' },
    { number: 2, labelEn: 'Schedule & Venue', labelAr: 'الجدول والمكان' },
    { number: 3, labelEn: 'Services', labelAr: 'الخدمات' },
    { number: 4, labelEn: 'Review', labelAr: 'المراجعة' },
  ];

  return (
    <div className="w-full mb-8">
      <div className={cn("flex items-center justify-between", isRTL && "flex-row-reverse")}>
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all",
                  currentStep > step.number
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.number
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center hidden sm:block",
                  currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {isRTL ? step.labelAr : step.labelEn}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-2 rounded-full transition-all",
                  currentStep > step.number ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
      {/* Mobile step label */}
      <p className="sm:hidden text-center mt-4 text-sm font-medium text-foreground">
        {isRTL ? steps[currentStep - 1].labelAr : steps[currentStep - 1].labelEn}
      </p>
    </div>
  );
};

const BookingStep1 = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const venueIdFromUrl = searchParams.get('venue');
  const facilityIdFromUrl = searchParams.get('facility');

  // Form state
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [expectedAttendees, setExpectedAttendees] = useState('');
  const [hasVIP, setHasVIP] = useState(false);
  const [vipDetails, setVipDetails] = useState('');
  const [selectedVenue, setSelectedVenue] = useState(venueIdFromUrl || '');

  // Get preselected venue site and facility
  const preselectedVenueSite = venueIdFromUrl ? getVenueSiteById(venueIdFromUrl) : null;
  const preselectedFacility = (venueIdFromUrl && facilityIdFromUrl) 
    ? getFacilityById(venueIdFromUrl, facilityIdFromUrl) 
    : null;
  
  // Fallback to legacy venue lookup if no facility specified
  const preselectedVenue = !preselectedFacility && venueIdFromUrl ? getVenueById(venueIdFromUrl) : null;

  const eventTypes = [
    { value: 'conference', labelEn: 'Conference', labelAr: 'مؤتمر' },
    { value: 'exhibition', labelEn: 'Exhibition', labelAr: 'معرض' },
    { value: 'concert', labelEn: 'Concert', labelAr: 'حفلة موسيقية' },
    { value: 'workshop', labelEn: 'Workshop', labelAr: 'ورشة عمل' },
    { value: 'private', labelEn: 'Private Event', labelAr: 'فعالية خاصة' },
    { value: 'corporate', labelEn: 'Corporate Event', labelAr: 'فعالية مؤسسية' },
    { value: 'other', labelEn: 'Other', labelAr: 'أخرى' },
  ];

  const handleNext = () => {
    // In a real app, validate and save state here
    const venueParam = selectedVenue || venueIdFromUrl;
    const facilityParam = facilityIdFromUrl;
    let queryString = '';
    if (venueParam) {
      queryString = `?venue=${venueParam}`;
      if (facilityParam) {
        queryString += `&facility=${facilityParam}`;
      }
    }
    navigate('/booking/step2' + queryString);
  };

  const handleBack = () => {
    if (preselectedVenueSite) {
      navigate(`/venues/${preselectedVenueSite.slug}`);
    } else if (preselectedVenue) {
      navigate(`/venues/${preselectedVenue.id}`);
    } else {
      navigate('/venues');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={1} isRTL={isRTL} />

          {/* Page Title */}
          <div className={cn("mb-8", isRTL && "text-right")}>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {isRTL ? 'تفاصيل الفعالية والمنظم' : 'Event & Organizer Details'}
            </h1>
            <p className="text-muted-foreground">
              {isRTL 
                ? 'أدخل المعلومات الأساسية عن فعاليتك'
                : 'Enter the basic information about your event'}
            </p>
          </div>

          <div className="space-y-6">
            {/* Organizer Information */}
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                  <User className="w-5 h-5 text-primary" />
                  {isRTL ? 'معلومات المنظم' : 'Organizer Information'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className={cn(isRTL && "text-right block")}>
                      {isRTL ? 'الاسم الكامل' : 'Full Name'}
                    </Label>
                    <div className="relative">
                      <User className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                        isRTL ? "right-3" : "left-3"
                      )} />
                      <Input 
                        value={sampleUser.name}
                        readOnly
                        className={cn("h-11 bg-muted/50", isRTL ? "pr-10 text-right" : "pl-10")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className={cn(isRTL && "text-right block")}>
                      {isRTL ? 'المنظمة' : 'Organization'}
                    </Label>
                    <div className="relative">
                      <Building2 className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                        isRTL ? "right-3" : "left-3"
                      )} />
                      <Input 
                        value={sampleUser.organization}
                        readOnly
                        className={cn("h-11 bg-muted/50", isRTL ? "pr-10 text-right" : "pl-10")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className={cn(isRTL && "text-right block")}>
                      {isRTL ? 'البريد الإلكتروني' : 'Email'}
                    </Label>
                    <div className="relative">
                      <Mail className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                        isRTL ? "right-3" : "left-3"
                      )} />
                      <Input 
                        value={sampleUser.email}
                        readOnly
                        className={cn("h-11 bg-muted/50", isRTL ? "pr-10 text-right" : "pl-10")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className={cn(isRTL && "text-right block")}>
                      {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                    </Label>
                    <div className="relative">
                      <Phone className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                        isRTL ? "right-3" : "left-3"
                      )} />
                      <Input 
                        value="+971 50 123 4567"
                        readOnly
                        className={cn("h-11 bg-muted/50", isRTL ? "pr-10 text-right" : "pl-10")}
                      />
                    </div>
                  </div>
                </div>
                <p className={cn("text-xs text-muted-foreground mt-3", isRTL && "text-right")}>
                  {isRTL 
                    ? 'هذه المعلومات مأخوذة من ملفك الشخصي. لتعديلها، قم بزيارة إعدادات الحساب.'
                    : 'This information is from your profile. To edit, visit account settings.'}
                </p>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                  <Calendar className="w-5 h-5 text-primary" />
                  {isRTL ? 'تفاصيل الفعالية' : 'Event Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventTitle" className={cn(isRTL && "text-right block")}>
                      {isRTL ? 'عنوان الفعالية' : 'Event Title'} <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="eventTitle"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder={isRTL ? 'أدخل عنوان الفعالية' : 'Enter event title'}
                      className={cn("h-11", isRTL && "text-right")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventType" className={cn(isRTL && "text-right block")}>
                      {isRTL ? 'نوع الفعالية' : 'Event Type'} <span className="text-destructive">*</span>
                    </Label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder={isRTL ? 'اختر نوع الفعالية' : 'Select event type'} />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {isRTL ? type.labelAr : type.labelEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className={cn(isRTL && "text-right block")}>
                    {isRTL ? 'وصف الفعالية' : 'Event Description'}
                  </Label>
                  <Textarea 
                    id="description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder={isRTL ? 'صف فعاليتك بإيجاز...' : 'Briefly describe your event...'}
                    className={cn("min-h-[100px] resize-none", isRTL && "text-right")}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="attendees" className={cn(isRTL && "text-right block")}>
                      {isRTL ? 'العدد المتوقع للحضور' : 'Expected Attendees'} <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Users className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                        isRTL ? "right-3" : "left-3"
                      )} />
                      <Input 
                        id="attendees"
                        type="number"
                        value={expectedAttendees}
                        onChange={(e) => setExpectedAttendees(e.target.value)}
                        placeholder={isRTL ? 'مثال: 500' : 'e.g., 500'}
                        className={cn("h-11", isRTL ? "pr-10 text-right" : "pl-10")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className={cn(isRTL && "text-right block")}>
                      {isRTL ? 'حضور شخصيات مهمة (VIP)' : 'VIP Attendance'}
                    </Label>
                    <div className={cn(
                      "flex items-center gap-3 h-11 px-3 rounded-md border border-input bg-background",
                      isRTL && "flex-row-reverse"
                    )}>
                      <Switch 
                        checked={hasVIP}
                        onCheckedChange={setHasVIP}
                      />
                      <span className="text-sm">
                        {hasVIP 
                          ? (isRTL ? 'نعم، سيحضر شخصيات مهمة' : 'Yes, VIPs will attend')
                          : (isRTL ? 'لا' : 'No')}
                      </span>
                    </div>
                  </div>
                </div>

                {hasVIP && (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="vipDetails" className={cn(isRTL && "text-right block")}>
                      <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse justify-end")}>
                        <Star className="w-4 h-4 text-primary" />
                        {isRTL ? 'تفاصيل الشخصيات المهمة' : 'VIP Details'}
                      </div>
                    </Label>
                    <Textarea 
                      id="vipDetails"
                      value={vipDetails}
                      onChange={(e) => setVipDetails(e.target.value)}
                      placeholder={isRTL 
                        ? 'يرجى تحديد الشخصيات المهمة المتوقع حضورها وأي متطلبات خاصة...'
                        : 'Please specify expected VIPs and any special requirements...'}
                      className={cn("min-h-[80px] resize-none", isRTL && "text-right")}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Venue Selection */}
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                  <MapPin className="w-5 h-5 text-primary" />
                  {isRTL ? 'المكان المفضل' : 'Preferred Venue'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {preselectedFacility && preselectedVenueSite ? (
                  <div className={cn(
                    "flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20",
                    isRTL && "flex-row-reverse"
                  )}>
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      {preselectedVenueSite.image ? (
                        <img 
                          src={preselectedVenueSite.image} 
                          alt={isRTL ? preselectedFacility.nameAr : preselectedFacility.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className={cn("flex-1", isRTL && "text-right")}>
                      <div className={cn("flex items-center gap-2 mb-1", isRTL && "flex-row-reverse justify-end")}>
                        <h4 className="font-semibold text-foreground">
                          {isRTL ? preselectedFacility.nameAr : preselectedFacility.name}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {isRTL ? 'محدد' : 'Selected'}
                        </Badge>
                      </div>
                      <div className={cn("flex items-center gap-1.5 text-sm text-primary mb-1", isRTL && "flex-row-reverse justify-end")}>
                        <Layers className="w-3.5 h-3.5" />
                        <span>{isRTL ? preselectedVenueSite.nameAr : preselectedVenueSite.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {isRTL ? preselectedFacility.typeLabelAr : preselectedFacility.typeLabel}
                      </p>
                      <div className={cn("flex items-center gap-1 mt-1 text-sm", isRTL && "flex-row-reverse justify-end")}>
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{getMaxCapacity(preselectedFacility.capacity).toLocaleString()} {isRTL ? 'كحد أقصى' : 'max capacity'}</span>
                      </div>
                    </div>
                  </div>
                ) : preselectedVenue ? (
                  <div className={cn(
                    "flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20",
                    isRTL && "flex-row-reverse"
                  )}>
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      {preselectedVenue.image ? (
                        <img 
                          src={preselectedVenue.image} 
                          alt={isRTL ? preselectedVenue.nameAr : preselectedVenue.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className={cn("flex-1", isRTL && "text-right")}>
                      <div className={cn("flex items-center gap-2 mb-1", isRTL && "flex-row-reverse justify-end")}>
                        <h4 className="font-semibold text-foreground">
                          {isRTL ? preselectedVenue.nameAr : preselectedVenue.name}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {isRTL ? 'محدد' : 'Selected'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {isRTL ? preselectedVenue.typeLabelAr : preselectedVenue.typeLabel}
                      </p>
                      <div className={cn("flex items-center gap-1 mt-1 text-sm", isRTL && "flex-row-reverse justify-end")}>
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{preselectedVenue.capacity.toLocaleString()} {isRTL ? 'شخص' : 'capacity'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="venue" className={cn(isRTL && "text-right block")}>
                      {isRTL ? 'اختر المكان المفضل' : 'Select Preferred Venue'} <span className="text-destructive">*</span>
                    </Label>
                    <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder={isRTL ? 'اختر مكانًا' : 'Choose a venue'} />
                      </SelectTrigger>
                      <SelectContent>
                        {venues.map((venue) => (
                          <SelectItem key={venue.id} value={venue.id}>
                            <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                              <MapPin className="w-4 h-4" />
                              <span>{isRTL ? venue.nameAr : venue.name}</span>
                              <span className="text-muted-foreground text-xs">
                                ({venue.capacity.toLocaleString()})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className={cn("text-xs text-muted-foreground", isRTL && "text-right")}>
                      {isRTL 
                        ? 'يمكنك تغيير المكان في الخطوة التالية بناءً على التوفر'
                        : 'You can change the venue in the next step based on availability'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className={cn("flex items-center justify-between pt-4", isRTL && "flex-row-reverse")}>
              <Button 
                variant="outline" 
                onClick={handleBack}
                className={cn("gap-2", isRTL && "flex-row-reverse")}
              >
                {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                {isRTL ? 'رجوع' : 'Back'}
              </Button>
              <Button 
                variant="hero" 
                onClick={handleNext}
                className={cn("gap-2", isRTL && "flex-row-reverse")}
              >
                {isRTL ? 'التالي: الجدول والمكان' : 'Next: Schedule & Venue'}
                {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingStep1;
