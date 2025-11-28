import { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { sampleUser, getVenueById } from '@/data/venueData';
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload,
  FileText,
  X,
  Check,
  User,
  Calendar,
  MapPin,
  Shield,
  UtensilsCrossed,
  Monitor,
  Truck,
  Save,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Progress Step Component (matches other booking steps)
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

// Fake uploaded files for demo
const demoFiles = [
  { name: 'event_proposal_v2.pdf', size: '2.4 MB', type: 'pdf' },
  { name: 'floor_plan_draft.dwg', size: '1.8 MB', type: 'dwg' },
  { name: 'company_trade_license.pdf', size: '890 KB', type: 'pdf' },
];

const BookingStep4 = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isRTL = language === 'ar';
  const venueId = searchParams.get('venue');

  const selectedVenue = venueId ? getVenueById(venueId) : null;

  const [uploadedFiles, setUploadedFiles] = useState<typeof demoFiles>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Dummy event data (in real app, would come from state/context)
  const eventData = {
    title: isRTL ? 'مؤتمر الابتكار 2025' : 'Innovation Summit 2025',
    type: isRTL ? 'مؤتمر' : 'Conference',
    description: isRTL 
      ? 'مؤتمر سنوي يجمع قادة الصناعة لمناقشة أحدث الابتكارات في مجال التكنولوجيا والاستدامة.'
      : 'Annual conference bringing together industry leaders to discuss the latest innovations in technology and sustainability.',
    attendees: 350,
    date: '15 April 2025',
    time: '09:00 - 18:00',
  };

  const selectedServices = {
    security: true,
    riskLevel: isRTL ? 'متوسط' : 'Medium',
    catering: true,
    cateringType: isRTL ? 'بوفيه' : 'Buffet',
    fbCovers: 350,
    av: [isRTL ? 'نظام صوت' : 'Sound system', isRTL ? 'شاشة LED' : 'LED screen', isRTL ? 'أجهزة عرض' : 'Projectors'],
    logistics: [isRTL ? 'مسرح' : 'Stage', isRTL ? 'جلوس مسرحي' : 'Theatre seating'],
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // For demo, add fake files
    setUploadedFiles(demoFiles);
  }, []);

  const handleBrowse = () => {
    // For demo, add fake files
    setUploadedFiles(demoFiles);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(files => files.filter((_, i) => i !== index));
  };

  const handleBack = () => {
    navigate('/booking/step3' + (venueId ? `?venue=${venueId}` : ''));
  };

  const handleSubmit = () => {
    // Generate new booking reference
    navigate('/booking/confirmation?ref=EVD-2025-003&status=submitted');
  };

  const handleSaveDraft = () => {
    navigate('/booking/confirmation?ref=EVD-2025-003&status=draft');
  };

  const termsText = isRTL
    ? `شروط وأحكام حجز الأماكن في إكسبو سيتي دبي

1. يتم قبول جميع الحجوزات مع مراعاة التوافر والموافقة من قبل فريق إدارة الأماكن في إكسبو سيتي دبي.

2. يجب تقديم جميع المستندات المطلوبة قبل 30 يومًا على الأقل من تاريخ الفعالية.

3. يخضع استخدام المكان لجميع اللوائح والمبادئ التوجيهية المعمول بها في إكسبو سيتي دبي.

4. يتحمل المنظم مسؤولية الحصول على جميع التصاريح والتراخيص اللازمة للفعالية.

5. قد يتم تطبيق رسوم إضافية للخدمات الإضافية والمتطلبات الخاصة.

6. تخضع سياسة الإلغاء للبنود المحددة في اتفاقية الحجز النهائية.

7. يحتفظ إكسبو سيتي دبي بالحق في تعديل أو إلغاء أي حجز لأسباب تشغيلية أو أمنية.

8. يوافق المنظم على الالتزام بجميع معايير الصحة والسلامة أثناء الفعالية.

9. يجب الحصول على موافقة مسبقة لأي تعديلات على تصميم المكان أو البنية التحتية.

10. تخضع هذه الشروط والأحكام للقوانين المعمول بها في دولة الإمارات العربية المتحدة.`
    : `Expo City Dubai Venue Booking Terms and Conditions

1. All bookings are accepted subject to availability and approval by the Expo City Dubai Venue Management team.

2. All required documents must be submitted at least 30 days prior to the event date.

3. Use of the venue is subject to all applicable Expo City Dubai regulations and guidelines.

4. The organizer is responsible for obtaining all necessary permits and licenses for the event.

5. Additional charges may apply for supplementary services and special requirements.

6. Cancellation policy is subject to the terms specified in the final booking agreement.

7. Expo City Dubai reserves the right to modify or cancel any booking for operational or security reasons.

8. The organizer agrees to comply with all health and safety standards during the event.

9. Prior approval must be obtained for any modifications to venue design or infrastructure.

10. These terms and conditions are governed by the laws applicable in the United Arab Emirates.`;

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={4} isRTL={isRTL} />

          {/* Page Title */}
          <div className={cn("mb-6", isRTL && "text-right")}>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {isRTL ? 'المستندات والمراجعة والتقديم' : 'Documents, Review & Submit'}
            </h1>
            <p className="text-muted-foreground">
              {isRTL 
                ? 'قم بتحميل المستندات الداعمة ومراجعة طلبك قبل التقديم' 
                : 'Upload supporting documents and review your request before submission'}
            </p>
          </div>

          <div className="space-y-6">
            {/* Upload Documents Section */}
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                  <Upload className="w-5 h-5 text-primary" />
                  {isRTL ? 'تحميل المستندات' : 'Upload Documents'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer",
                    isDragging 
                      ? "border-primary bg-primary/5" 
                      : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                  )}
                  onClick={handleBrowse}
                >
                  <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-foreground font-medium mb-1">
                    {isRTL ? 'اسحب الملفات هنا أو انقر للتصفح' : 'Drag files here or click to browse'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? 'الأنواع المدعومة: PDF، DOC، DWG، JPG، PNG' : 'Supported: PDF, DOC, DWG, JPG, PNG'}
                  </p>
                </div>

                {/* Document Types Hint */}
                <div className={cn("text-sm text-muted-foreground", isRTL && "text-right")}>
                  <p className="font-medium mb-2">
                    {isRTL ? 'أنواع المستندات المطلوبة:' : 'Example document types:'}
                  </p>
                  <ul className={cn("space-y-1", isRTL ? "mr-4" : "ml-4")}>
                    <li>• {isRTL ? 'مقترح الفعالية' : 'Event proposal'}</li>
                    <li>• {isRTL ? 'مخطط الطابق الأولي' : 'Preliminary floor plan'}</li>
                    <li>• {isRTL ? 'الرخصة التجارية للشركة' : 'Company trade license'}</li>
                    <li>• {isRTL ? 'وثائق الهوية' : 'ID documents'}</li>
                  </ul>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2 pt-4">
                    <Label className={cn(isRTL && "text-right block")}>
                      {isRTL ? 'الملفات المرفقة:' : 'Attached files:'}
                    </Label>
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg bg-muted/50 border",
                          isRTL && "flex-row-reverse"
                        )}
                      >
                        <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                          <FileText className="w-5 h-5 text-primary" />
                          <div className={cn(isRTL && "text-right")}>
                            <p className="text-sm font-medium text-foreground">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.size}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Review Summary Section */}
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", isRTL && "flex-row-reverse text-right")}>
                  <FileText className="w-5 h-5 text-primary" />
                  {isRTL ? 'مراجعة طلبك' : 'Review Your Request'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Event Details */}
                <div className="space-y-3">
                  <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    <Calendar className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-foreground">
                      {isRTL ? 'تفاصيل الفعالية' : 'Event Details'}
                    </h4>
                  </div>
                  <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-lg bg-muted/30", isRTL && "text-right")}>
                    <div>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'عنوان الفعالية' : 'Event Title'}</p>
                      <p className="text-sm font-medium text-foreground">{eventData.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'النوع' : 'Type'}</p>
                      <p className="text-sm font-medium text-foreground">{eventData.type}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-muted-foreground">{isRTL ? 'الوصف' : 'Description'}</p>
                      <p className="text-sm text-foreground">{eventData.description}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'عدد الحضور' : 'Attendees'}</p>
                      <p className="text-sm font-medium text-foreground">{eventData.attendees}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'التاريخ والوقت' : 'Date & Time'}</p>
                      <p className="text-sm font-medium text-foreground">{eventData.date}, {eventData.time}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Organizer Info */}
                <div className="space-y-3">
                  <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    <User className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-foreground">
                      {isRTL ? 'معلومات المنظم' : 'Organizer Information'}
                    </h4>
                  </div>
                  <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-lg bg-muted/30", isRTL && "text-right")}>
                    <div>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'الاسم' : 'Name'}</p>
                      <p className="text-sm font-medium text-foreground">{sampleUser.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'المنظمة' : 'Organization'}</p>
                      <p className="text-sm font-medium text-foreground">{sampleUser.organization}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'البريد الإلكتروني' : 'Email'}</p>
                      <p className="text-sm font-medium text-foreground">{sampleUser.email}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Venue */}
                <div className="space-y-3">
                  <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    <MapPin className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-foreground">
                      {isRTL ? 'المكان' : 'Venue'}
                    </h4>
                  </div>
                  {selectedVenue ? (
                    <div className={cn("flex items-center gap-4 p-4 rounded-lg bg-muted/30", isRTL && "flex-row-reverse")}>
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                        <img 
                          src={selectedVenue.image} 
                          alt={selectedVenue.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={cn(isRTL && "text-right")}>
                        <p className="font-medium text-foreground">
                          {isRTL ? selectedVenue.nameAr : selectedVenue.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? selectedVenue.typeLabelAr : selectedVenue.typeLabel} • {selectedVenue.capacity.toLocaleString()} {isRTL ? 'شخص' : 'capacity'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground p-4 rounded-lg bg-muted/30">
                      {isRTL ? 'لم يتم اختيار مكان' : 'No venue selected'}
                    </p>
                  )}
                </div>

                <Separator />

                {/* Services Summary */}
                <div className="space-y-3">
                  <h4 className={cn("font-semibold text-foreground", isRTL && "text-right")}>
                    {isRTL ? 'الخدمات المختارة' : 'Selected Services'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Security */}
                    <div className={cn("flex items-start gap-3 p-3 rounded-lg bg-muted/30", isRTL && "flex-row-reverse text-right")}>
                      <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{isRTL ? 'الأمن' : 'Security'}</p>
                        <p className="text-xs text-muted-foreground">
                          {isRTL ? 'مستوى المخاطر:' : 'Risk level:'} {selectedServices.riskLevel}
                        </p>
                      </div>
                    </div>

                    {/* F&B */}
                    <div className={cn("flex items-start gap-3 p-3 rounded-lg bg-muted/30", isRTL && "flex-row-reverse text-right")}>
                      <UtensilsCrossed className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{isRTL ? 'الطعام والمشروبات' : 'F&B'}</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedServices.cateringType}, {selectedServices.fbCovers} {isRTL ? 'شخص' : 'covers'}
                        </p>
                      </div>
                    </div>

                    {/* AV */}
                    <div className={cn("flex items-start gap-3 p-3 rounded-lg bg-muted/30", isRTL && "flex-row-reverse text-right")}>
                      <Monitor className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{isRTL ? 'السمعي والبصري' : 'AV & IT'}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedServices.av.map((item, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{item}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Logistics */}
                    <div className={cn("flex items-start gap-3 p-3 rounded-lg bg-muted/30", isRTL && "flex-row-reverse text-right")}>
                      <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{isRTL ? 'اللوجستيات' : 'Logistics'}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedServices.logistics.map((item, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{item}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className={cn(isRTL && "text-right")}>
                  {isRTL ? 'الشروط والأحكام' : 'Terms & Conditions'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-48 rounded-lg border bg-muted/20 p-4">
                  <pre className={cn("text-sm text-muted-foreground whitespace-pre-wrap font-sans", isRTL && "text-right")}>
                    {termsText}
                  </pre>
                </ScrollArea>
                
                <div className={cn("flex items-start space-x-3", isRTL && "space-x-reverse")}>
                  <Checkbox 
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="terms" className={cn("text-sm cursor-pointer leading-relaxed", isRTL && "text-right")}>
                    {isRTL 
                      ? 'أؤكد أن المعلومات الواردة أعلاه صحيحة وأوافق على شروط وأحكام حجز المكان.'
                      : 'I confirm that the above information is accurate and agree to the venue booking terms and conditions.'}
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="sm:order-1"
              >
                <ArrowLeft className="w-4 h-4 me-2 rtl:rotate-180" />
                {isRTL ? 'السابق: الخدمات' : 'Back: Services'}
              </Button>
              
              <Button 
                variant="secondary"
                onClick={handleSaveDraft}
                className="sm:order-2 sm:ms-auto"
              >
                <Save className="w-4 h-4 me-2" />
                {isRTL ? 'حفظ كمسودة' : 'Save as Draft'}
              </Button>

              <Button 
                onClick={handleSubmit}
                disabled={!agreedToTerms}
                className="sm:order-3 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="w-4 h-4 me-2" />
                {isRTL ? 'تقديم الحجز' : 'Submit Booking'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingStep4;