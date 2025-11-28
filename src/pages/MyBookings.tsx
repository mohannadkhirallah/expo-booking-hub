import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { sampleBookings, getVenueSiteById, getFacilityById, venueSites, sampleUser } from '@/data/venueData';
import { Calendar, MapPin, Filter, FileText, Upload, XCircle, Eye, TrendingUp, Clock, CheckCircle, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

const MyBookings = () => {
  const { language, isRTL } = useLanguage();
  const [statusFilter, setStatusFilter] = useState('All');
  const [venueFilter, setVenueFilter] = useState('All');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'default';
      case 'Under Review':
      case 'Submitted':
        return 'secondary';
      case 'Rejected':
        return 'destructive';
      case 'Draft':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-3 h-3" />;
      case 'Under Review':
      case 'Submitted':
        return <Clock className="w-3 h-3" />;
      case 'Draft':
        return <FileText className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return sampleBookings.filter((booking) => {
      const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
      const matchesVenue = venueFilter === 'All' || booking.venueSiteId === venueFilter;
      return matchesStatus && matchesVenue;
    });
  }, [statusFilter, venueFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const active = sampleBookings.filter(b => 
      ['Under Review', 'Submitted', 'Approved'].includes(b.status)
    ).length;
    
    const upcoming = sampleBookings.filter(b => {
      const bookingDate = new Date(b.date);
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return bookingDate <= nextMonth && bookingDate >= new Date();
    }).length;

    const drafts = sampleBookings.filter(b => b.status === 'Draft').length;

    return { active, upcoming, drafts };
  }, []);

  return (
    <div className={cn("min-h-screen flex flex-col bg-background", isRTL ? 'rtl' : 'ltr')} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className={cn("mb-8", isRTL && "text-right")}>
            <div className={cn("flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2", isRTL && "md:flex-row-reverse")}>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {isRTL ? 'حجوزاتي' : 'My Bookings'}
                </h1>
                <p className="text-muted-foreground">
                  {isRTL 
                    ? 'تتبع حالة طلبات الحجز الخاصة بك'
                    : 'Track the status of your booking requests'}
                </p>
              </div>
              <div className={cn("flex items-center gap-3 bg-muted/50 rounded-lg px-4 py-3", isRTL && "flex-row-reverse")}>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {sampleUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className={isRTL ? "text-right" : ""}>
                  <p className="font-medium text-foreground text-sm">{sampleUser.name}</p>
                  <p className="text-xs text-muted-foreground">{sampleUser.organization}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className={cn("text-sm font-medium text-muted-foreground flex items-center gap-2", isRTL && "flex-row-reverse")}>
                  <TrendingUp className="w-4 h-4 text-primary" />
                  {isRTL ? 'الحجوزات النشطة' : 'Active Bookings'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.active}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className={cn("text-sm font-medium text-muted-foreground flex items-center gap-2", isRTL && "flex-row-reverse")}>
                  <Calendar className="w-4 h-4 text-primary" />
                  {isRTL ? 'القادمة هذا الشهر' : 'Upcoming This Month'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.upcoming}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className={cn("text-sm font-medium text-muted-foreground flex items-center gap-2", isRTL && "flex-row-reverse")}>
                  <FileText className="w-4 h-4 text-primary" />
                  {isRTL ? 'المسودات' : 'Drafts'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.drafts}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className={cn("flex items-center gap-2 text-lg", isRTL && "flex-row-reverse")}>
                <Filter className="w-5 h-5 text-primary" />
                {isRTL ? 'تصفية النتائج' : 'Filter Results'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status Filter */}
                <div className="space-y-2">
                  <label className={cn("text-sm font-medium text-foreground", isRTL && "block text-right")}>
                    {isRTL ? 'الحالة' : 'Status'}
                  </label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className={cn(isRTL && "text-right")}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">{isRTL ? 'الكل' : 'All'}</SelectItem>
                      <SelectItem value="Draft">{isRTL ? 'مسودة' : 'Draft'}</SelectItem>
                      <SelectItem value="Submitted">{isRTL ? 'مقدم' : 'Submitted'}</SelectItem>
                      <SelectItem value="Under Review">{isRTL ? 'قيد المراجعة' : 'Under Review'}</SelectItem>
                      <SelectItem value="Approved">{isRTL ? 'موافق عليه' : 'Approved'}</SelectItem>
                      <SelectItem value="Rejected">{isRTL ? 'مرفوض' : 'Rejected'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Venue Site Filter */}
                <div className="space-y-2">
                  <label className={cn("text-sm font-medium text-foreground", isRTL && "block text-right")}>
                    {isRTL ? 'موقع المكان' : 'Venue Site'}
                  </label>
                  <Select value={venueFilter} onValueChange={setVenueFilter}>
                    <SelectTrigger className={cn(isRTL && "text-right")}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">{isRTL ? 'جميع المواقع' : 'All Sites'}</SelectItem>
                      {venueSites.map((site) => (
                        <SelectItem key={site.id} value={site.id}>
                          {isRTL ? site.nameAr : site.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className={cn(isRTL && "text-right")}>
                      {isRTL ? 'المرجع' : 'Reference'}
                    </TableHead>
                    <TableHead className={cn(isRTL && "text-right")}>
                      {isRTL ? 'عنوان الفعالية' : 'Event Title'}
                    </TableHead>
                    <TableHead className={cn(isRTL && "text-right")}>
                      {isRTL ? 'الموقع / المرفق' : 'Site / Facility'}
                    </TableHead>
                    <TableHead className={cn(isRTL && "text-right")}>
                      {isRTL ? 'التاريخ' : 'Date'}
                    </TableHead>
                    <TableHead className={cn(isRTL && "text-right")}>
                      {isRTL ? 'الحالة' : 'Status'}
                    </TableHead>
                    <TableHead className={cn(isRTL && "text-right")}>
                      {isRTL ? 'الإجراءات' : 'Actions'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        {isRTL ? 'لا توجد حجوزات' : 'No bookings found'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => {
                      const site = getVenueSiteById(booking.venueSiteId);
                      const facility = getFacilityById(booking.venueSiteId, booking.facilityId);
                      return (
                        <TableRow key={booking.id}>
                          <TableCell className="font-mono text-sm">{booking.id}</TableCell>
                          <TableCell className="font-medium">
                            {isRTL ? booking.eventNameAr : booking.eventName}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className={cn("flex items-center gap-1 text-sm", isRTL && "flex-row-reverse")}>
                                <Building2 className="w-3 h-3 text-primary" />
                                {site && (isRTL ? site.nameAr : site.name)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {facility && (isRTL ? facility.nameAr : facility.name)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(booking.date).toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(booking.status)} className="gap-1">
                              {getStatusIcon(booking.status)}
                              {isRTL ? booking.statusAr : booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                              <Button variant="ghost" size="sm" asChild>
                                <Link to={`/bookings/${booking.id.toLowerCase()}`}>
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </Button>
                              <Button variant="ghost" size="sm" asChild>
                                <Link to={`/bookings/${booking.id.toLowerCase()}#documents`}>
                                  <Upload className="w-4 h-4" />
                                </Link>
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <XCircle className="w-4 h-4 text-destructive" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      {isRTL ? 'إلغاء الطلب' : 'Cancel Request'}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      {isRTL 
                                        ? `هل أنت متأكد أنك تريد إلغاء طلب الحجز ${booking.id}؟ لا يمكن التراجع عن هذا الإجراء.`
                                        : `Are you sure you want to cancel booking request ${booking.id}? This action cannot be undone.`}
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      {isRTL ? 'إلغاء' : 'Cancel'}
                                    </AlertDialogCancel>
                                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                                      {isRTL ? 'تأكيد الإلغاء' : 'Confirm Cancel'}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredBookings.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  {isRTL ? 'لا توجد حجوزات' : 'No bookings found'}
                </CardContent>
              </Card>
            ) : (
              filteredBookings.map((booking) => {
                const site = getVenueSiteById(booking.venueSiteId);
                const facility = getFacilityById(booking.venueSiteId, booking.facilityId);
                return (
                  <Card key={booking.id}>
                    <CardHeader className="pb-3">
                      <div className={cn("flex items-start justify-between gap-2", isRTL && "flex-row-reverse")}>
                        <div className={isRTL ? "text-right" : ""}>
                          <p className="text-sm font-mono text-muted-foreground mb-1">
                            {booking.id}
                          </p>
                          <CardTitle className="text-lg">
                            {isRTL ? booking.eventNameAr : booking.eventName}
                          </CardTitle>
                        </div>
                        <Badge variant={getStatusColor(booking.status)} className="gap-1 whitespace-nowrap">
                          {getStatusIcon(booking.status)}
                          {isRTL ? booking.statusAr : booking.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className={cn("flex items-center gap-2 text-sm", isRTL && "flex-row-reverse")}>
                        <Building2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <div className={isRTL ? "text-right" : ""}>
                          <span className="font-medium">{site && (isRTL ? site.nameAr : site.name)}</span>
                          <span className="text-muted-foreground"> • {facility && (isRTL ? facility.nameAr : facility.name)}</span>
                        </div>
                      </div>
                      <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", isRTL && "flex-row-reverse")}>
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>
                          {new Date(booking.date).toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 pt-3">
                        <Button variant="default" size="sm" asChild className="w-full">
                          <Link to={`/bookings/${booking.id.toLowerCase()}`}>
                            <Eye className="w-4 h-4 me-2" />
                            {isRTL ? 'عرض التفاصيل' : 'View Details'}
                          </Link>
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/bookings/${booking.id.toLowerCase()}#documents`}>
                              <Upload className="w-4 h-4 me-2" />
                              {isRTL ? 'رفع' : 'Upload'}
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-destructive">
                                <XCircle className="w-4 h-4 me-2" />
                                {isRTL ? 'إلغاء' : 'Cancel'}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {isRTL ? 'إلغاء الطلب' : 'Cancel Request'}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {isRTL 
                                    ? `هل أنت متأكد أنك تريد إلغاء طلب الحجز ${booking.id}؟ لا يمكن التراجع عن هذا الإجراء.`
                                    : `Are you sure you want to cancel booking request ${booking.id}? This action cannot be undone.`}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  {isRTL ? 'إلغاء' : 'Cancel'}
                                </AlertDialogCancel>
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
                );
              })
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;
