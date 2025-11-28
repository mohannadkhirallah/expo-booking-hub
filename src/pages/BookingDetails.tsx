import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { sampleBookings, getVenueById, sampleUser } from '@/data/venueData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Download,
  Upload,
  XCircle,
  Users,
  Building2,
  FileText,
  Shield,
  Utensils,
  Monitor,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  User,
  Bot,
  Plus,
  Star,
  Hash
} from 'lucide-react';

// Dummy data for department approvals
const getDepartmentApprovals = (bookingId: string) => {
  if (bookingId === 'evd-2025-001') {
    return [
      { id: 'submitted', name: 'Submitted', nameAr: 'تم التقديم', status: 'completed', date: '2025-01-10' },
      { id: 'screening', name: 'Initial Screening', nameAr: 'الفحص الأولي', status: 'completed', date: '2025-01-12' },
      { id: 'security', name: 'Security', nameAr: 'الأمن', status: 'in-progress', date: null },
      { id: 'licensing', name: 'Licensing', nameAr: 'التراخيص', status: 'pending', date: null },
      { id: 'fnb', name: 'F&B Services', nameAr: 'خدمات الطعام', status: 'pending', date: null },
      { id: 'logistics', name: 'Logistics', nameAr: 'اللوجستيات', status: 'pending', date: null },
      { id: 'final', name: 'Final Decision', nameAr: 'القرار النهائي', status: 'pending', date: null },
    ];
  } else if (bookingId === 'evd-2025-002') {
    return [
      { id: 'submitted', name: 'Submitted', nameAr: 'تم التقديم', status: 'completed', date: '2025-01-05' },
      { id: 'screening', name: 'Initial Screening', nameAr: 'الفحص الأولي', status: 'completed', date: '2025-01-07' },
      { id: 'security', name: 'Security', nameAr: 'الأمن', status: 'completed', date: '2025-01-10' },
      { id: 'licensing', name: 'Licensing', nameAr: 'التراخيص', status: 'completed', date: '2025-01-12' },
      { id: 'fnb', name: 'F&B Services', nameAr: 'خدمات الطعام', status: 'completed', date: '2025-01-14' },
      { id: 'logistics', name: 'Logistics', nameAr: 'اللوجستيات', status: 'completed', date: '2025-01-15' },
      { id: 'final', name: 'Final Decision', nameAr: 'القرار النهائي', status: 'completed', date: '2025-01-18' },
    ];
  }
  return [
    { id: 'submitted', name: 'Submitted', nameAr: 'تم التقديم', status: 'completed', date: '2025-01-20' },
    { id: 'screening', name: 'Initial Screening', nameAr: 'الفحص الأولي', status: 'in-progress', date: null },
    { id: 'security', name: 'Security', nameAr: 'الأمن', status: 'pending', date: null },
    { id: 'licensing', name: 'Licensing', nameAr: 'التراخيص', status: 'pending', date: null },
    { id: 'fnb', name: 'F&B Services', nameAr: 'خدمات الطعام', status: 'pending', date: null },
    { id: 'logistics', name: 'Logistics', nameAr: 'اللوجستيات', status: 'pending', date: null },
    { id: 'final', name: 'Final Decision', nameAr: 'القرار النهائي', status: 'pending', date: null },
  ];
};

// Dummy uploaded documents
const getDocuments = (bookingId: string) => {
  const baseDocuments = [
    { name: 'Event_Proposal.pdf', size: '2.4 MB', date: '2025-01-10' },
    { name: 'Floor_Plan_v1.dwg', size: '5.1 MB', date: '2025-01-10' },
    { name: 'Company_Trade_License.pdf', size: '1.2 MB', date: '2025-01-10' },
  ];
  
  if (bookingId === 'evd-2025-001') {
    return [
      ...baseDocuments,
      { name: 'Floor_Plan_v2_Updated.dwg', size: '5.3 MB', date: '2025-01-28' },
    ];
  }
  return baseDocuments;
};

// Dummy messages
const getMessages = (bookingId: string, isRTL: boolean) => {
  const messages = [
    {
      type: 'system',
      sender: isRTL ? 'النظام' : 'System',
      message: isRTL 
        ? 'تم تقديم طلب الحجز الخاص بك بنجاح. سيقوم فريقنا بمراجعته قريباً.'
        : 'Your booking request has been submitted successfully. Our team will review it shortly.',
      date: '2025-01-10 09:30',
    },
    {
      type: 'coordinator',
      sender: isRTL ? 'منسق إكسبو سيتي' : 'Expo City Coordinator',
      message: isRTL
        ? 'مرحباً، يرجى تقديم مخطط الطابق المحدث قبل 1 فبراير للمتابعة في المراجعة.'
        : 'Hello, please provide an updated floor plan before 01 Feb to proceed with the review.',
      date: '2025-01-15 14:22',
    },
  ];

  if (bookingId === 'evd-2025-001') {
    messages.push({
      type: 'organizer',
      sender: sampleUser.name,
      message: isRTL
        ? 'تم رفع مخطط الطابق المحدث. يرجى مراجعته.'
        : 'Uploaded the updated floor plan. Please review.',
      date: '2025-01-28 11:45',
    });
  }

  if (bookingId === 'evd-2025-002') {
    messages.push(
      {
        type: 'organizer',
        sender: sampleUser.name,
        message: isRTL
          ? 'شكراً للتحديث. ننتظر الموافقة النهائية.'
          : 'Thank you for the update. Awaiting final approval.',
        date: '2025-01-16 10:00',
      },
      {
        type: 'coordinator',
        sender: isRTL ? 'منسق إكسبو سيتي' : 'Expo City Coordinator',
        message: isRTL
          ? 'تمت الموافقة على طلب الحجز الخاص بك! سيتم إرسال العقد قريباً.'
          : 'Your booking request has been approved! Contract will be sent shortly.',
        date: '2025-01-18 16:30',
      }
    );
  }

  return messages;
};

const BookingDetails = () => {
  const { id } = useParams();
  const { language, isRTL } = useLanguage();
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const bookingId = id?.toLowerCase() || '';
  const booking = sampleBookings.find(b => b.id.toLowerCase() === bookingId);
  const venue = booking ? getVenueById(booking.venueId) : null;
  const departmentApprovals = getDepartmentApprovals(bookingId);
  const documents = getDocuments(bookingId);
  const messages = getMessages(bookingId, isRTL);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'default';
      case 'Under Review':
      case 'Submitted':
        return 'secondary';
      case 'Rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getApprovalStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-primary" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Bot className="w-4 h-4" />;
      case 'coordinator':
        return <Building2 className="w-4 h-4" />;
      case 'organizer':
        return <User className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  // File upload handlers
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
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files.map(f => f.name)]);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files.map(f => f.name)]);
    }
  }, []);

  if (!booking) {
    return (
      <div className={cn("min-h-screen flex flex-col bg-background", isRTL ? 'rtl' : 'ltr')} dir={isRTL ? 'rtl' : 'ltr'}>
        <Header />
        <main className="flex-1 pt-24 md:pt-28 pb-16 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">
                {isRTL ? 'الحجز غير موجود' : 'Booking Not Found'}
              </h2>
              <p className="text-muted-foreground mb-4">
                {isRTL ? 'لم نتمكن من العثور على الحجز المطلوب.' : 'We could not find the requested booking.'}
              </p>
              <Button asChild>
                <Link to="/my-bookings">
                  <ArrowLeft className="w-4 h-4 me-2 rtl:rotate-180" />
                  {isRTL ? 'العودة إلى حجوزاتي' : 'Back to My Bookings'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen flex flex-col bg-background", isRTL ? 'rtl' : 'ltr')} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Navigation */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/my-bookings">
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                {isRTL ? 'العودة إلى حجوزاتي' : 'Back to My Bookings'}
              </Link>
            </Button>
          </div>

          {/* Top Summary Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className={cn("flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6", isRTL && "lg:flex-row-reverse")}>
                <div className={cn("flex-1", isRTL && "text-right")}>
                  <div className={cn("flex items-center gap-3 mb-3 flex-wrap", isRTL && "flex-row-reverse")}>
                    <span className="font-mono text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      {booking.id}
                    </span>
                    <Badge variant={getStatusColor(booking.status)}>
                      {isRTL ? booking.statusAr : booking.status}
                    </Badge>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {isRTL ? booking.eventNameAr : booking.eventName}
                  </h1>
                  <div className={cn("flex flex-wrap gap-4 text-sm text-muted-foreground", isRTL && "flex-row-reverse")}>
                    <span className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                      <MapPin className="w-4 h-4 text-primary" />
                      {venue && (isRTL ? venue.nameAr : venue.name)}
                    </span>
                    <span className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                      <Calendar className="w-4 h-4 text-primary" />
                      {new Date(booking.date).toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className={cn("flex flex-wrap gap-2", isRTL && "flex-row-reverse")}>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 me-2" />
                    {isRTL ? 'تحميل الملخص' : 'Download Summary'}
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="#documents">
                      <Upload className="w-4 h-4 me-2" />
                      {isRTL ? 'رفع المستندات' : 'Upload Documents'}
                    </a>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <XCircle className="w-4 h-4 me-2" />
                        {isRTL ? 'إلغاء الطلب' : 'Cancel Request'}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {isRTL ? 'إلغاء طلب الحجز' : 'Cancel Booking Request'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {isRTL 
                            ? `هل أنت متأكد أنك تريد إلغاء طلب الحجز ${booking.id}؟ لا يمكن التراجع عن هذا الإجراء.`
                            : `Are you sure you want to cancel booking request ${booking.id}? This action cannot be undone.`}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{isRTL ? 'إلغاء' : 'Cancel'}</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                          {isRTL ? 'تأكيد الإلغاء' : 'Confirm Cancel'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Booking Overview */}
            <div className="space-y-6">
              {/* Organizer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className={cn("flex items-center gap-2 text-lg", isRTL && "flex-row-reverse")}>
                    <Building2 className="w-5 h-5 text-primary" />
                    {isRTL ? 'معلومات المنظم' : 'Organizer Information'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
                    <span className="text-muted-foreground">{isRTL ? 'الاسم' : 'Name'}</span>
                    <span className="font-medium">{sampleUser.name}</span>
                  </div>
                  <Separator />
                  <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
                    <span className="text-muted-foreground">{isRTL ? 'المؤسسة' : 'Organization'}</span>
                    <span className="font-medium">{sampleUser.organization}</span>
                  </div>
                  <Separator />
                  <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
                    <span className="text-muted-foreground">{isRTL ? 'البريد الإلكتروني' : 'Email'}</span>
                    <span className="font-medium text-sm">{sampleUser.email}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Event Details */}
              <Card>
                <CardHeader>
                  <CardTitle className={cn("flex items-center gap-2 text-lg", isRTL && "flex-row-reverse")}>
                    <FileText className="w-5 h-5 text-primary" />
                    {isRTL ? 'تفاصيل الفعالية' : 'Event Details'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
                    <span className="text-muted-foreground">{isRTL ? 'نوع الفعالية' : 'Event Type'}</span>
                    <span className="font-medium">{isRTL ? 'مؤتمر' : 'Conference'}</span>
                  </div>
                  <Separator />
                  <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
                    <span className="text-muted-foreground">{isRTL ? 'عدد الحضور المتوقع' : 'Expected Attendees'}</span>
                    <span className="font-medium">500</span>
                  </div>
                  <Separator />
                  <div className={cn("flex justify-between items-center", isRTL && "flex-row-reverse")}>
                    <span className="text-muted-foreground">{isRTL ? 'حضور VIP' : 'VIP Attendance'}</span>
                    <Badge variant="secondary" className="gap-1">
                      <Star className="w-3 h-3" />
                      {isRTL ? 'نعم' : 'Yes'}
                    </Badge>
                  </div>
                  <Separator />
                  <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
                    <span className="text-muted-foreground">{isRTL ? 'المدة' : 'Duration'}</span>
                    <span className="font-medium">{isRTL ? '3 أيام' : '3 days'}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Services Requested */}
              <Card>
                <CardHeader>
                  <CardTitle className={cn("flex items-center gap-2 text-lg", isRTL && "flex-row-reverse")}>
                    <Hash className="w-5 h-5 text-primary" />
                    {isRTL ? 'الخدمات المطلوبة' : 'Services Requested'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={cn("flex items-center gap-2 p-3 rounded-lg bg-muted/50", isRTL && "flex-row-reverse")}>
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm">{isRTL ? 'الأمن' : 'Security'}</span>
                    </div>
                    <div className={cn("flex items-center gap-2 p-3 rounded-lg bg-muted/50", isRTL && "flex-row-reverse")}>
                      <Utensils className="w-4 h-4 text-primary" />
                      <span className="text-sm">{isRTL ? 'الطعام والشراب' : 'F&B'}</span>
                    </div>
                    <div className={cn("flex items-center gap-2 p-3 rounded-lg bg-muted/50", isRTL && "flex-row-reverse")}>
                      <Monitor className="w-4 h-4 text-primary" />
                      <span className="text-sm">{isRTL ? 'الصوت والمرئيات' : 'AV Equipment'}</span>
                    </div>
                    <div className={cn("flex items-center gap-2 p-3 rounded-lg bg-muted/50", isRTL && "flex-row-reverse")}>
                      <Truck className="w-4 h-4 text-primary" />
                      <span className="text-sm">{isRTL ? 'اللوجستيات' : 'Logistics'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Approval Timeline */}
            <div>
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className={cn("flex items-center gap-2 text-lg", isRTL && "flex-row-reverse")}>
                    <Clock className="w-5 h-5 text-primary" />
                    {isRTL ? 'مسار الموافقات' : 'Approval Timeline'}
                  </CardTitle>
                  <CardDescription className={isRTL ? "text-right" : ""}>
                    {isRTL 
                      ? 'يتم تتبع حالة الموافقات من خلال الأنظمة الداخلية'
                      : 'Approval status is tracked through internal systems'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {departmentApprovals.map((approval, index) => (
                      <div key={approval.id} className={cn("flex gap-4 pb-6 last:pb-0", isRTL && "flex-row-reverse")}>
                        {/* Timeline Line */}
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center border-2",
                            approval.status === 'completed' && "border-green-500 bg-green-500/10",
                            approval.status === 'in-progress' && "border-primary bg-primary/10",
                            approval.status === 'pending' && "border-muted-foreground bg-muted"
                          )}>
                            {getApprovalStatusIcon(approval.status)}
                          </div>
                          {index < departmentApprovals.length - 1 && (
                            <div className={cn(
                              "w-0.5 flex-1 mt-2",
                              approval.status === 'completed' ? "bg-green-500" : "bg-muted"
                            )} />
                          )}
                        </div>
                        {/* Content */}
                        <div className={cn("flex-1 pb-2", isRTL && "text-right")}>
                          <p className="font-medium text-foreground">
                            {isRTL ? approval.nameAr : approval.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {approval.status === 'completed' && approval.date && (
                              new Date(approval.date).toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })
                            )}
                            {approval.status === 'in-progress' && (isRTL ? 'قيد المعالجة' : 'In Progress')}
                            {approval.status === 'pending' && (isRTL ? 'في الانتظار' : 'Pending')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Documents Section */}
          <Card className="mb-8" id="documents">
            <CardHeader>
              <CardTitle className={cn("flex items-center gap-2 text-lg", isRTL && "flex-row-reverse")}>
                <FileText className="w-5 h-5 text-primary" />
                {isRTL ? 'المستندات' : 'Documents'}
              </CardTitle>
              <CardDescription className={isRTL ? "text-right" : ""}>
                {isRTL ? 'المستندات المرفوعة لهذا الحجز' : 'Documents uploaded for this booking'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing Documents */}
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border bg-muted/30",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                      <FileText className="w-5 h-5 text-primary" />
                      <div className={isRTL ? "text-right" : ""}>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.size} • {doc.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {uploadedFiles.map((fileName, index) => (
                  <div 
                    key={`new-${index}`}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border bg-green-500/10 border-green-500/20",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                      <FileText className="w-5 h-5 text-green-600" />
                      <div className={isRTL ? "text-right" : ""}>
                        <p className="font-medium text-sm">{fileName}</p>
                        <p className="text-xs text-green-600">{isRTL ? 'تم الرفع للتو' : 'Just uploaded'}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-600">
                      {isRTL ? 'جديد' : 'New'}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "border-2 border-dashed rounded-xl p-6 text-center transition-colors",
                  isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/30"
                )}
              >
                <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-3">
                  {isRTL 
                    ? 'اسحب الملفات هنا أو انقر للتصفح'
                    : 'Drag files here or click to browse'}
                </p>
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Plus className="w-4 h-4 me-2" />
                    {isRTL ? 'رفع المزيد' : 'Upload More'}
                  </label>
                </Button>
              </div>

              {/* Event Brief Download (for approved bookings) */}
              {booking.status === 'Approved' && (
                <div className={cn("flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20", isRTL && "flex-row-reverse")}>
                  <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                    <FileText className="w-5 h-5 text-primary" />
                    <div className={isRTL ? "text-right" : ""}>
                      <p className="font-medium text-sm">{isRTL ? 'ملخص الفعالية' : 'Event Brief'}</p>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'المستند الرسمي للفعالية الموافق عليها' : 'Official document for approved event'}</p>
                    </div>
                  </div>
                  <Button variant="default" size="sm">
                    <Download className="w-4 h-4 me-2" />
                    {isRTL ? 'تحميل' : 'Download'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Messages Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className={cn("flex items-center gap-2 text-lg", isRTL && "flex-row-reverse")}>
                <MessageSquare className="w-5 h-5 text-primary" />
                {isRTL ? 'الرسائل والملاحظات' : 'Messages & Notes'}
              </CardTitle>
              <CardDescription className={isRTL ? "text-right" : ""}>
                {isRTL 
                  ? 'التواصل مع فريق إكسبو سيتي دبي'
                  : 'Communication with Expo City Dubai team'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={cn(
                    "p-4 rounded-lg",
                    msg.type === 'system' && "bg-muted/50",
                    msg.type === 'coordinator' && "bg-primary/5 border border-primary/20",
                    msg.type === 'organizer' && "bg-muted/30 border"
                  )}
                >
                  <div className={cn("flex items-center gap-2 mb-2", isRTL && "flex-row-reverse")}>
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center",
                      msg.type === 'system' && "bg-muted",
                      msg.type === 'coordinator' && "bg-primary/20",
                      msg.type === 'organizer' && "bg-muted"
                    )}>
                      {getMessageIcon(msg.type)}
                    </div>
                    <span className="font-medium text-sm">{msg.sender}</span>
                    <span className="text-xs text-muted-foreground">• {msg.date}</span>
                  </div>
                  <p className={cn("text-sm text-foreground", isRTL && "text-right")}>
                    {msg.message}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Bottom Actions */}
          <div className={cn("flex flex-wrap gap-4 justify-center", isRTL && "flex-row-reverse")}>
            <Button variant="outline" asChild>
              <Link to="/my-bookings">
                <ArrowLeft className="w-4 h-4 me-2 rtl:rotate-180" />
                {isRTL ? 'العودة إلى حجوزاتي' : 'Back to My Bookings'}
              </Link>
            </Button>
            <Button asChild>
              <Link to="/venues">
                <Plus className="w-4 h-4 me-2" />
                {isRTL ? 'حجز مكان آخر' : 'Book Another Venue'}
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingDetails;
