import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { venues, getVenueById } from '@/data/venueData';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  ArrowRight, 
  CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Check, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Progress Step Component (matches P5)
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

const BookingStep2 = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isRTL = language === 'ar';

  const venueIdFromUrl = searchParams.get('venue');
  
  const [selectedVenueId, setSelectedVenueId] = useState(venueIdFromUrl || 'terra-auditorium');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [isMultiDay, setIsMultiDay] = useState(false);
  const [showVenueSelector, setShowVenueSelector] = useState(false);

  const selectedVenue = getVenueById(selectedVenueId);

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00', '23:00'
  ];

  // Check availability (dummy logic)
  const checkAvailability = () => {
    if (selectedVenueId === 'terra-auditorium' && startDate) {
      const dateStr = format(startDate, 'yyyy-MM-dd');
      if (dateStr === '2025-02-15') {
        return {
          available: false,
          message: isRTL 
            ? 'هذا التاريخ محجوز لـ "قمة الاستدامة" (EVD-2025-001)' 
            : 'This date is reserved for "Sustainability Summit" (EVD-2025-001)'
        };
      }
    }
    if (selectedVenueId === 'jubilee-park' && startDate) {
      const dateStr = format(startDate, 'yyyy-MM-dd');
      if (dateStr === '2025-03-22') {
        return {
          available: false,
          message: isRTL 
            ? 'هذا التاريخ محجوز لـ "منتدى التنقل العالمي" (EVD-2025-002)' 
            : 'This date is reserved for "Global Mobility Forum" (EVD-2025-002)'
        };
      }
    }
    return {
      available: true,
      message: isRTL ? 'يبدو متاحاً لهذا التاريخ' : 'Looks available for this date'
    };
  };

  const availability = startDate ? checkAvailability() : null;

  const handleBack = () => {
    navigate('/booking/step1' + (venueIdFromUrl ? `?venue=${venueIdFromUrl}` : ''));
  };

  const handleNext = () => {
    navigate('/booking/step3' + (selectedVenueId ? `?venue=${selectedVenueId}` : ''));
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={2} isRTL={isRTL} />

          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {isRTL ? 'الخطوة 2: الجدول والمكان' : 'Step 2: Schedule & Venue'}
            </h1>
            <p className="text-muted-foreground">
              {isRTL 
                ? 'اختر التاريخ والوقت وتأكد من المكان' 
                : 'Select your dates, times, and confirm your venue'}
            </p>
          </div>

          <div className="space-y-6">
          {/* Selected Venue Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {isRTL ? 'المكان المختار' : 'Selected Venue'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedVenue && !showVenueSelector ? (
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={selectedVenue.image} 
                      alt={selectedVenue.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {isRTL ? selectedVenue.nameAr : selectedVenue.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {isRTL ? selectedVenue.typeLabelAr : selectedVenue.typeLabel}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {selectedVenue.capacity.toLocaleString()} {isRTL ? 'شخص' : 'capacity'}
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
                      onClick={() => setShowVenueSelector(true)}
                    >
                      <RefreshCw className="w-4 h-4 me-2" />
                      {isRTL ? 'تغيير المكان' : 'Change Venue'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Label>{isRTL ? 'اختر مكاناً' : 'Select a Venue'}</Label>
                  <Select value={selectedVenueId} onValueChange={(value) => {
                    setSelectedVenueId(value);
                    setShowVenueSelector(false);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر مكاناً' : 'Choose a venue'} />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map((venue) => (
                        <SelectItem key={venue.id} value={venue.id}>
                          {isRTL ? venue.nameAr : venue.name} - {venue.capacity.toLocaleString()} {isRTL ? 'شخص' : 'capacity'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {showVenueSelector && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowVenueSelector(false)}
                    >
                      {isRTL ? 'إلغاء' : 'Cancel'}
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Event Schedule Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                {isRTL ? 'جدول الفعالية' : 'Event Schedule'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Multi-day checkbox */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox 
                  id="multiDay" 
                  checked={isMultiDay}
                  onCheckedChange={(checked) => setIsMultiDay(checked as boolean)}
                />
                <Label htmlFor="multiDay" className="cursor-pointer">
                  {isRTL ? 'فعالية متعددة الأيام' : 'Multi-day event'}
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Date */}
                <div className="space-y-2">
                  <Label>{isRTL ? 'تاريخ البدء' : 'Start Date'}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="me-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : (isRTL ? 'اختر التاريخ' : 'Pick a date')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className="pointer-events-auto"
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* End Date (if multi-day) */}
                {isMultiDay && (
                  <div className="space-y-2">
                    <Label>{isRTL ? 'تاريخ الانتهاء' : 'End Date'}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="me-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : (isRTL ? 'اختر التاريخ' : 'Pick a date')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          className="pointer-events-auto"
                          disabled={(date) => date < (startDate || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                {/* Start Time */}
                <div className="space-y-2">
                  <Label>{isRTL ? 'وقت البدء' : 'Start Time'}</Label>
                  <Select value={startTime} onValueChange={setStartTime}>
                    <SelectTrigger>
                      <Clock className="me-2 h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* End Time */}
                <div className="space-y-2">
                  <Label>{isRTL ? 'وقت الانتهاء' : 'End Time'}</Label>
                  <Select value={endTime} onValueChange={setEndTime}>
                    <SelectTrigger>
                      <Clock className="me-2 h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability Hint Section */}
          {startDate && (
            <Card className={cn(
              "border-2",
              availability?.available ? "border-green-500/50" : "border-destructive/50"
            )}>
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  {availability?.available ? (
                    <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
                  )}
                  <div>
                    <p className={cn(
                      "font-medium",
                      availability?.available ? "text-green-600 dark:text-green-400" : "text-destructive"
                    )}>
                      {availability?.available 
                        ? (isRTL ? 'متاح' : 'Available') 
                        : (isRTL ? 'غير متاح' : 'Not Available')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {availability?.message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="sm:flex-1"
            >
              <ArrowLeft className="w-4 h-4 me-2 rtl:rotate-180" />
              {isRTL ? 'السابق: تفاصيل الفعالية' : 'Back: Event Details'}
            </Button>
            <Button 
              onClick={handleNext}
              className="sm:flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!startDate || (isMultiDay && !endDate)}
            >
              {isRTL ? 'التالي: الخدمات والمتطلبات' : 'Next: Services & Requirements'}
              <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
            </Button>
          </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingStep2;
