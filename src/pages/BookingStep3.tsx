import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  ArrowRight, 
  Shield, 
  FileCheck, 
  UtensilsCrossed, 
  Monitor, 
  Truck,
  MessageSquare,
  Info,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Progress Step Component (matches P5/P6)
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

const BookingStep3 = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isRTL = language === 'ar';
  const venueId = searchParams.get('venue');

  // Security & Safety
  const [securityRequired, setSecurityRequired] = useState(false);
  const [riskLevel, setRiskLevel] = useState('');
  const [securityNotes, setSecurityNotes] = useState('');

  // Licensing & Compliance
  const [licenses, setLicenses] = useState({
    music: false,
    food: false,
    fireworks: false,
    structures: false,
  });

  // F&B and Hospitality
  const [cateringRequired, setCateringRequired] = useState(false);
  const [cateringType, setCateringType] = useState('');
  const [fbCovers, setFbCovers] = useState('');

  // AV & IT
  const [avEquipment, setAvEquipment] = useState({
    sound: false,
    projectors: false,
    led: false,
    wifi: false,
    streaming: false,
  });

  // Logistics & Setup
  const [logistics, setLogistics] = useState({
    stage: false,
    seatingTheatre: false,
    seatingClassroom: false,
    seatingBanquet: false,
    booths: false,
    branding: false,
  });

  // Additional notes
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleBack = () => {
    navigate('/booking/step2' + (venueId ? `?venue=${venueId}` : ''));
  };

  const handleNext = () => {
    navigate('/booking/step4' + (venueId ? `?venue=${venueId}` : ''));
  };

  const riskLevels = [
    { value: 'low', labelEn: 'Low', labelAr: 'منخفض' },
    { value: 'medium', labelEn: 'Medium', labelAr: 'متوسط' },
    { value: 'high', labelEn: 'High', labelAr: 'مرتفع' },
  ];

  const cateringTypes = [
    { value: 'coffee', labelEn: 'Coffee Break', labelAr: 'استراحة قهوة' },
    { value: 'buffet', labelEn: 'Buffet', labelAr: 'بوفيه' },
    { value: 'seated', labelEn: 'Seated Dinner', labelAr: 'عشاء جالس' },
  ];

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={3} isRTL={isRTL} />

          {/* Page Title */}
          <div className={cn("mb-6", isRTL && "text-right")}>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {isRTL ? 'الخدمات والمتطلبات' : 'Services & Requirements'}
            </h1>
            <p className="text-muted-foreground">
              {isRTL 
                ? 'حدد الخدمات والمتطلبات التشغيلية لفعاليتك' 
                : 'Specify the operational services and requirements for your event'}
            </p>
          </div>

          {/* Info Banner */}
          <Alert className="mb-6 border-primary/30 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className={cn("text-sm", isRTL && "text-right")}>
              {isRTL 
                ? 'سيتم توجيه طلباتك إلى الأقسام المختصة في إكسبو سيتي دبي في Dynamics 365 بعد التقديم.'
                : 'Your requests will be routed to the appropriate Expo City Dubai departments in Dynamics 365 after submission.'}
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            {/* Security & Safety */}
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                  <Shield className="w-5 h-5 text-primary" />
                  {isRTL ? 'الأمن والسلامة' : 'Security & Safety'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                  <Checkbox 
                    id="securityRequired" 
                    checked={securityRequired}
                    onCheckedChange={(checked) => setSecurityRequired(checked as boolean)}
                  />
                  <Label htmlFor="securityRequired" className="cursor-pointer">
                    {isRTL ? 'مطلوب أفراد أمن' : 'Security personnel required'}
                  </Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className={cn(isRTL && "text-right block")}>
                      {isRTL ? 'مستوى المخاطر المتوقع' : 'Expected Risk Level'}
                    </Label>
                    <Select value={riskLevel} onValueChange={setRiskLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder={isRTL ? 'اختر المستوى' : 'Select level'} />
                      </SelectTrigger>
                      <SelectContent>
                        {riskLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {isRTL ? level.labelAr : level.labelEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className={cn(isRTL && "text-right block")}>
                    {isRTL ? 'ملاحظات خاصة (VIP، التحكم بالحشود، إلخ)' : 'Special notes (VIPs, crowd control, etc.)'}
                  </Label>
                  <Textarea 
                    value={securityNotes}
                    onChange={(e) => setSecurityNotes(e.target.value)}
                    placeholder={isRTL ? 'أدخل أي ملاحظات أمنية...' : 'Enter any security notes...'}
                    className={cn("min-h-[80px] resize-none", isRTL && "text-right")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Licensing & Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                  <FileCheck className="w-5 h-5 text-primary" />
                  {isRTL ? 'التراخيص والامتثال' : 'Licensing & Compliance'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm text-muted-foreground", isRTL && "text-right")}>
                  {isRTL 
                    ? 'حدد التراخيص التي قد تكون مطلوبة. سيتم التأكيد من قبل فرق إكسبو سيتي دبي.'
                    : 'Select licenses that may be required. These will be confirmed by Expo City Dubai teams.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                    <Checkbox 
                      id="musicLicense"
                      checked={licenses.music}
                      onCheckedChange={(checked) => setLicenses({...licenses, music: checked as boolean})}
                    />
                    <Label htmlFor="musicLicense" className="cursor-pointer">
                      {isRTL ? 'عروض موسيقية' : 'Music performance'}
                    </Label>
                  </div>
                  <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                    <Checkbox 
                      id="foodLicense"
                      checked={licenses.food}
                      onCheckedChange={(checked) => setLicenses({...licenses, food: checked as boolean})}
                    />
                    <Label htmlFor="foodLicense" className="cursor-pointer">
                      {isRTL ? 'تداول الطعام' : 'Food handling'}
                    </Label>
                  </div>
                  <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                    <Checkbox 
                      id="fireworksLicense"
                      checked={licenses.fireworks}
                      onCheckedChange={(checked) => setLicenses({...licenses, fireworks: checked as boolean})}
                    />
                    <Label htmlFor="fireworksLicense" className="cursor-pointer">
                      {isRTL ? 'ألعاب نارية' : 'Fireworks'}
                    </Label>
                  </div>
                  <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                    <Checkbox 
                      id="structuresLicense"
                      checked={licenses.structures}
                      onCheckedChange={(checked) => setLicenses({...licenses, structures: checked as boolean})}
                    />
                    <Label htmlFor="structuresLicense" className="cursor-pointer">
                      {isRTL ? 'هياكل مؤقتة' : 'Temporary structures'}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* F&B and Hospitality */}
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                  <UtensilsCrossed className="w-5 h-5 text-primary" />
                  {isRTL ? 'الأطعمة والمشروبات والضيافة' : 'F&B and Hospitality'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                  <Checkbox 
                    id="cateringRequired"
                    checked={cateringRequired}
                    onCheckedChange={(checked) => setCateringRequired(checked as boolean)}
                  />
                  <Label htmlFor="cateringRequired" className="cursor-pointer">
                    {isRTL ? 'مطلوب خدمات تقديم الطعام' : 'Catering required'}
                  </Label>
                </div>

                {cateringRequired && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label className={cn(isRTL && "text-right block")}>
                        {isRTL ? 'نوع تقديم الطعام' : 'Type of catering'}
                      </Label>
                      <Select value={cateringType} onValueChange={setCateringType}>
                        <SelectTrigger>
                          <SelectValue placeholder={isRTL ? 'اختر النوع' : 'Select type'} />
                        </SelectTrigger>
                        <SelectContent>
                          {cateringTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {isRTL ? type.labelAr : type.labelEn}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className={cn(isRTL && "text-right block")}>
                        {isRTL ? 'العدد التقديري للوجبات' : 'Estimated F&B covers'}
                      </Label>
                      <Input 
                        type="number"
                        value={fbCovers}
                        onChange={(e) => setFbCovers(e.target.value)}
                        placeholder={isRTL ? 'مثال: 200' : 'e.g., 200'}
                        className={cn(isRTL && "text-right")}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AV & IT */}
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                  <Monitor className="w-5 h-5 text-primary" />
                  {isRTL ? 'السمعي والبصري وتقنية المعلومات' : 'AV & IT'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                    <Checkbox 
                      id="soundSystem"
                      checked={avEquipment.sound}
                      onCheckedChange={(checked) => setAvEquipment({...avEquipment, sound: checked as boolean})}
                    />
                    <Label htmlFor="soundSystem" className="cursor-pointer">
                      {isRTL ? 'نظام صوت' : 'Sound system'}
                    </Label>
                  </div>
                  <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                    <Checkbox 
                      id="projectors"
                      checked={avEquipment.projectors}
                      onCheckedChange={(checked) => setAvEquipment({...avEquipment, projectors: checked as boolean})}
                    />
                    <Label htmlFor="projectors" className="cursor-pointer">
                      {isRTL ? 'أجهزة عرض' : 'Projectors'}
                    </Label>
                  </div>
                  <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                    <Checkbox 
                      id="ledScreen"
                      checked={avEquipment.led}
                      onCheckedChange={(checked) => setAvEquipment({...avEquipment, led: checked as boolean})}
                    />
                    <Label htmlFor="ledScreen" className="cursor-pointer">
                      {isRTL ? 'شاشة LED' : 'LED screen'}
                    </Label>
                  </div>
                  <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                    <Checkbox 
                      id="wifiUpgrade"
                      checked={avEquipment.wifi}
                      onCheckedChange={(checked) => setAvEquipment({...avEquipment, wifi: checked as boolean})}
                    />
                    <Label htmlFor="wifiUpgrade" className="cursor-pointer">
                      {isRTL ? 'ترقية Wi-Fi' : 'Wi-Fi upgrade'}
                    </Label>
                  </div>
                  <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                    <Checkbox 
                      id="streaming"
                      checked={avEquipment.streaming}
                      onCheckedChange={(checked) => setAvEquipment({...avEquipment, streaming: checked as boolean})}
                    />
                    <Label htmlFor="streaming" className="cursor-pointer">
                      {isRTL ? 'دعم البث المباشر' : 'Live streaming support'}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Logistics & Setup */}
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                  <Truck className="w-5 h-5 text-primary" />
                  {isRTL ? 'اللوجستيات والإعداد' : 'Logistics & Setup'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                    <Checkbox 
                      id="stage"
                      checked={logistics.stage}
                      onCheckedChange={(checked) => setLogistics({...logistics, stage: checked as boolean})}
                    />
                    <Label htmlFor="stage" className="cursor-pointer">
                      {isRTL ? 'منصة / مسرح' : 'Stage'}
                    </Label>
                  </div>
                  <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                    <Checkbox 
                      id="booths"
                      checked={logistics.booths}
                      onCheckedChange={(checked) => setLogistics({...logistics, booths: checked as boolean})}
                    />
                    <Label htmlFor="booths" className="cursor-pointer">
                      {isRTL ? 'أكشاك معارض' : 'Exhibition booths'}
                    </Label>
                  </div>
                  <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                    <Checkbox 
                      id="branding"
                      checked={logistics.branding}
                      onCheckedChange={(checked) => setLogistics({...logistics, branding: checked as boolean})}
                    />
                    <Label htmlFor="branding" className="cursor-pointer">
                      {isRTL ? 'هياكل العلامة التجارية' : 'Branding structures'}
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className={cn("font-medium", isRTL && "text-right block")}>
                    {isRTL ? 'تكوين المقاعد' : 'Seating Configuration'}
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                      <Checkbox 
                        id="seatingTheatre"
                        checked={logistics.seatingTheatre}
                        onCheckedChange={(checked) => setLogistics({...logistics, seatingTheatre: checked as boolean})}
                      />
                      <Label htmlFor="seatingTheatre" className="cursor-pointer">
                        {isRTL ? 'مسرحي' : 'Theatre'}
                      </Label>
                    </div>
                    <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                      <Checkbox 
                        id="seatingClassroom"
                        checked={logistics.seatingClassroom}
                        onCheckedChange={(checked) => setLogistics({...logistics, seatingClassroom: checked as boolean})}
                      />
                      <Label htmlFor="seatingClassroom" className="cursor-pointer">
                        {isRTL ? 'فصل دراسي' : 'Classroom'}
                      </Label>
                    </div>
                    <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
                      <Checkbox 
                        id="seatingBanquet"
                        checked={logistics.seatingBanquet}
                        onCheckedChange={(checked) => setLogistics({...logistics, seatingBanquet: checked as boolean})}
                      />
                      <Label htmlFor="seatingBanquet" className="cursor-pointer">
                        {isRTL ? 'مأدبة' : 'Banquet'}
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                  <MessageSquare className="w-5 h-5 text-primary" />
                  {isRTL ? 'ملاحظات إضافية' : 'Additional Notes'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder={isRTL 
                    ? 'أي متطلبات أو ملاحظات أخرى ترغب في مشاركتها...'
                    : 'Any other requirements or notes you would like to share...'}
                  className={cn("min-h-[120px] resize-none", isRTL && "text-right")}
                />
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="sm:flex-1"
              >
                <ArrowLeft className="w-4 h-4 me-2 rtl:rotate-180" />
                {isRTL ? 'السابق: الجدول والمكان' : 'Back: Schedule & Venue'}
              </Button>
              <Button 
                onClick={handleNext}
                className="sm:flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isRTL ? 'التالي: المراجعة والتقديم' : 'Next: Review & Submit'}
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

export default BookingStep3;
