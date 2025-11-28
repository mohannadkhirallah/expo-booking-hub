import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  HelpCircle, 
  Mail, 
  Phone,
  Search,
  ClipboardCheck,
  CheckCircle2,
  CalendarCheck,
  Shield,
  Clock,
  AlertTriangle,
  Utensils,
  XCircle,
  Send,
  Building2,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

const Guidelines = () => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isRTL ? 'تم إرسال الرسالة' : 'Message Sent',
      description: isRTL 
        ? 'شكراً لتواصلك معنا. سنرد عليك قريباً.'
        : 'Thank you for contacting us. We will get back to you shortly.',
    });
    setFormData({ name: '', email: '', organization: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Process steps
  const processSteps = [
    {
      icon: Search,
      title: isRTL ? 'استكشاف الأماكن' : 'Explore Venues',
      description: isRTL 
        ? 'تصفح أماكننا المتاحة واعثر على المكان المثالي لفعاليتك.'
        : 'Browse our available venues and find the perfect location for your event.'
    },
    {
      icon: ClipboardCheck,
      title: isRTL ? 'تقديم طلب الحجز' : 'Submit Booking Request',
      description: isRTL 
        ? 'أكمل نموذج الحجز مع تفاصيل الفعالية والمتطلبات والمستندات.'
        : 'Complete the booking form with event details, requirements, and documents.'
    },
    {
      icon: Shield,
      title: isRTL ? 'المراجعة والموافقات الداخلية' : 'Internal Review & Approvals',
      description: isRTL 
        ? 'تقوم الفرق الداخلية بمراجعة طلبك (الأمن، التراخيص، الخدمات، اللوجستيات).'
        : 'Internal teams review your request (security, licensing, services, logistics).'
    },
    {
      icon: CalendarCheck,
      title: isRTL ? 'التأكيد النهائي والتنفيذ' : 'Final Confirmation & Delivery',
      description: isRTL 
        ? 'احصل على الموافقة النهائية وتنسيق تنفيذ فعاليتك.'
        : 'Receive final approval and coordinate your event delivery.'
    }
  ];

  // Key policies
  const policies = [
    {
      icon: Clock,
      title: isRTL ? 'المهلة الزمنية المطلوبة' : 'Lead Time Required',
      content: isRTL 
        ? 'يجب تقديم جميع طلبات الحجز قبل 30 يومًا على الأقل من تاريخ الفعالية المقترح. قد تتطلب الفعاليات الكبيرة مهلة 60-90 يومًا.'
        : 'All booking requests must be submitted at least 30 days before the proposed event date. Large-scale events may require 60-90 days lead time.'
    },
    {
      icon: AlertTriangle,
      title: isRTL ? 'قيود الضوضاء والتوقيت' : 'Noise & Timing Restrictions',
      content: isRTL 
        ? 'يجب أن تنتهي الفعاليات الخارجية بحلول الساعة 11 مساءً. يُسمح بالموسيقى الحية والصوت المضخم فقط في أماكن محددة وبموافقة مسبقة.'
        : 'Outdoor events must conclude by 11 PM. Live music and amplified sound are only permitted in designated venues with prior approval.'
    },
    {
      icon: Shield,
      title: isRTL ? 'قواعد السلامة والأمن' : 'Safety & Security Rules',
      content: isRTL 
        ? 'يجب توفير خطة أمنية معتمدة لجميع الفعاليات التي تضم أكثر من 200 ضيف. يلزم توفير خدمات إسعافية للتجمعات الكبيرة.'
        : 'An approved security plan is required for all events with more than 200 guests. Medical services must be on-site for large gatherings.'
    },
    {
      icon: Utensils,
      title: isRTL ? 'سياسات التموين' : 'Catering Policies',
      content: isRTL 
        ? 'يجب استخدام موردي التموين المعتمدين فقط. يجب الحصول على تصاريح سلامة الغذاء قبل أسبوعين من الفعالية.'
        : 'Only approved catering vendors may be used. Food safety permits must be obtained 2 weeks before the event.'
    },
    {
      icon: XCircle,
      title: isRTL ? 'قواعد الإلغاء' : 'Cancellation Rules',
      content: isRTL 
        ? 'الإلغاء قبل 30 يومًا: استرداد كامل. قبل 14 يومًا: استرداد 50%. أقل من 14 يومًا: لا يوجد استرداد. تطبق شروط خاصة على الفعاليات الكبيرة.'
        : 'Cancellation 30+ days out: full refund. 14-30 days: 50% refund. Less than 14 days: no refund. Special terms apply for large events.'
    }
  ];

  // FAQs
  const faqs = [
    {
      question: isRTL ? 'كم يستغرق الحصول على الموافقة عادةً؟' : 'How long does approval usually take?',
      answer: isRTL 
        ? 'تتم معالجة معظم طلبات الحجز خلال 5-10 أيام عمل. قد تستغرق الفعاليات المعقدة التي تتطلب موافقات متعددة 2-3 أسابيع. ستتلقى تحديثات عبر البريد الإلكتروني في كل مرحلة.'
        : 'Most booking requests are processed within 5-10 business days. Complex events requiring multiple approvals may take 2-3 weeks. You will receive email updates at each stage.'
    },
    {
      question: isRTL ? 'هل يمكنني تعديل حجزي بعد التقديم؟' : 'Can I modify my booking after submission?',
      answer: isRTL 
        ? 'نعم، يمكنك طلب تعديلات من خلال صفحة تفاصيل الحجز. قد تتطلب التغييرات الكبيرة إعادة المراجعة وتأخير الموافقة. التعديلات الطفيفة مثل تغيير جهة الاتصال أو تحديثات جدول الأعمال عادةً ما تكون سريعة.'
        : 'Yes, you can request modifications through your booking details page. Major changes may require re-review and delay approval. Minor adjustments like contact changes or agenda updates are typically quick.'
    },
    {
      question: isRTL ? 'ما هي الأماكن المناسبة للفعاليات الخارجية الكبيرة؟' : 'Which venues are suitable for large outdoor events?',
      answer: isRTL 
        ? 'ساحة الوصل مثالية للفعاليات الكبيرة حتى 10,000 ضيف. حديقة اليوبيل تستوعب حتى 2,000 ضيف للمهرجانات والمعارض. ألف - الحلبة مناسبة للفعاليات التفاعلية حتى 600 ضيف.'
        : 'Al Wasl Plaza is ideal for large events up to 10,000 guests. Jubilee Park accommodates up to 2,000 guests for festivals and exhibitions. Alif - The Bowl suits interactive events up to 600 guests.'
    },
    {
      question: isRTL ? 'كيف سأعرف إذا تمت الموافقة على حجزي؟' : 'How will I know if my booking is approved?',
      answer: isRTL 
        ? 'ستتلقى إشعارًا بالبريد الإلكتروني عند كل تحديث للحالة. يمكنك أيضًا تتبع تقدم طلبك في الوقت الفعلي من خلال لوحة "حجوزاتي". عند الموافقة، ستتلقى تأكيدًا رسميًا ومعلومات العقد.'
        : 'You will receive an email notification at each status update. You can also track your request progress in real-time through the "My Bookings" dashboard. Upon approval, you will receive official confirmation and contract information.'
    },
    {
      question: isRTL ? 'ما المستندات المطلوبة لتقديم الحجز؟' : 'What documents are required to submit a booking?',
      answer: isRTL 
        ? 'المستندات الأساسية تشمل: مقترح الفعالية، الرخصة التجارية، وثائق التأمين، وبطاقات الهوية للمنظمين الرئيسيين. قد تتطلب الفعاليات الكبيرة مخططات الطوابق وخطط الأمن.'
        : 'Essential documents include: event proposal, trade license, insurance documentation, and ID copies of key organizers. Large events may require floor plans and security plans.'
    },
    {
      question: isRTL ? 'هل يمكنني حجز عدة أماكن لنفس الفعالية؟' : 'Can I book multiple venues for the same event?',
      answer: isRTL 
        ? 'نعم، يمكنك تقديم طلبات لعدة أماكن. يرجى الإشارة في ملاحظاتك أن الطلبات مرتبطة. سيقوم فريقنا بتنسيق الموافقات لضمان التوافق.'
        : 'Yes, you can submit requests for multiple venues. Please indicate in your notes that the requests are linked. Our team will coordinate approvals to ensure compatibility.'
    }
  ];

  return (
    <div className={cn("min-h-screen flex flex-col bg-background", isRTL ? 'rtl' : 'ltr')} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Intro Section */}
          <section className={cn("mb-16", isRTL && "text-right")}>
            <div className={cn("flex items-center gap-4 mb-4", isRTL && "flex-row-reverse")}>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
                </Link>
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {isRTL ? 'الإرشادات وعملية الحجز' : 'Guidelines & Booking Process'}
              </h1>
            </div>
            <p className={cn("text-lg text-muted-foreground max-w-3xl", isRTL ? "mr-14" : "ml-14")}>
              {isRTL 
                ? 'يتيح لك هذا البوابة تقديم طلبات حجز الأماكن في إكسبو سيتي دبي. تتم معالجة الطلبات من قبل فرقنا الداخلية عبر أنظمة إدارة متكاملة لضمان تجربة سلسة وآمنة لفعاليتك.'
                : 'This portal allows you to submit venue booking requests for Expo City Dubai. Requests are processed by our internal teams through integrated management systems to ensure a smooth and secure experience for your event.'}
            </p>
          </section>

          {/* How the Process Works */}
          <section className="mb-16">
            <h2 className={cn("text-2xl font-bold text-foreground mb-8", isRTL && "text-right")}>
              {isRTL ? 'كيف تعمل العملية' : 'How the Process Works'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <Card key={index} className="relative">
                  <CardHeader className="pb-3">
                    <div className={cn("flex items-center gap-3 mb-2", isRTL && "flex-row-reverse")}>
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {index + 1}
                      </div>
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className={cn("text-lg", isRTL && "text-right")}>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={cn("text-sm text-muted-foreground", isRTL && "text-right")}>
                      {step.description}
                    </p>
                  </CardContent>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 rtl:-left-3 rtl:right-auto rtl:rotate-180">
                      <ChevronRight className="w-6 h-6 text-muted-foreground/50" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </section>

          {/* Key Policies */}
          <section className="mb-16">
            <h2 className={cn("text-2xl font-bold text-foreground mb-8", isRTL && "text-right")}>
              {isRTL ? 'السياسات الرئيسية' : 'Key Policies'}
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {policies.map((policy, index) => (
                <AccordionItem 
                  key={index} 
                  value={`policy-${index}`}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger className={cn("hover:no-underline", isRTL && "flex-row-reverse")}>
                    <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <policy.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{policy.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className={cn("text-muted-foreground pb-4", isRTL && "text-right")}>
                    {policy.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className={cn("text-2xl font-bold text-foreground mb-8 flex items-center gap-3", isRTL && "flex-row-reverse text-right")}>
              <HelpCircle className="w-7 h-7 text-primary" />
              {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger className={cn("hover:no-underline text-left", isRTL && "text-right flex-row-reverse")}>
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className={cn("text-muted-foreground pb-4", isRTL && "text-right")}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Need Help / Contact Section */}
          <section className="mb-16">
            <h2 className={cn("text-2xl font-bold text-foreground mb-8 flex items-center gap-3", isRTL && "flex-row-reverse text-right")}>
              <Mail className="w-7 h-7 text-primary" />
              {isRTL ? 'هل تحتاج مساعدة؟' : 'Need Help?'}
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className={cn("text-lg flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    <Building2 className="w-5 h-5 text-primary" />
                    {isRTL ? 'معلومات الاتصال' : 'Contact Information'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div className={isRTL ? "text-right" : ""}>
                      <p className="text-sm text-muted-foreground">
                        {isRTL ? 'الهاتف' : 'Phone'}
                      </p>
                      <p className="font-medium" dir="ltr">+971 4 XXX XXXX</p>
                    </div>
                  </div>
                  <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className={isRTL ? "text-right" : ""}>
                      <p className="text-sm text-muted-foreground">
                        {isRTL ? 'البريد الإلكتروني' : 'Email'}
                      </p>
                      <p className="font-medium">bookings@expocitydubai.ae</p>
                    </div>
                  </div>
                  <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className={isRTL ? "text-right" : ""}>
                      <p className="text-sm text-muted-foreground">
                        {isRTL ? 'ساعات العمل' : 'Working Hours'}
                      </p>
                      <p className="font-medium">
                        {isRTL ? 'الأحد - الخميس: 9 ص - 6 م' : 'Sun - Thu: 9 AM - 6 PM'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className={cn("text-lg", isRTL && "text-right")}>
                    {isRTL ? 'أرسل لنا رسالة' : 'Send us a Message'}
                  </CardTitle>
                  <CardDescription className={isRTL ? "text-right" : ""}>
                    {isRTL 
                      ? 'املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن.'
                      : 'Fill out the form below and we will get back to you as soon as possible.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className={isRTL ? "block text-right" : ""}>
                          {isRTL ? 'الاسم' : 'Name'}
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className={isRTL ? "text-right" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className={isRTL ? "block text-right" : ""}>
                          {isRTL ? 'البريد الإلكتروني' : 'Email'}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={isRTL ? "text-right" : ""}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="organization" className={isRTL ? "block text-right" : ""}>
                          {isRTL ? 'المؤسسة' : 'Organization'}
                        </Label>
                        <Input
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          className={isRTL ? "text-right" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className={isRTL ? "block text-right" : ""}>
                          {isRTL ? 'الموضوع' : 'Subject'}
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className={isRTL ? "text-right" : ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className={isRTL ? "block text-right" : ""}>
                        {isRTL ? 'الرسالة' : 'Message'}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className={isRTL ? "text-right" : ""}
                      />
                    </div>
                    <Button type="submit" className="w-full md:w-auto">
                      <Send className="w-4 h-4 me-2" />
                      {isRTL ? 'إرسال الرسالة' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Quick Links */}
          <section className={cn("border-t pt-8", isRTL && "text-right")}>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {isRTL ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <div className={cn("flex flex-wrap gap-4", isRTL && "flex-row-reverse")}>
              <Button variant="outline" asChild>
                <Link to="/">
                  {isRTL ? 'الصفحة الرئيسية' : 'Home'}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/venues">
                  {isRTL ? 'استكشف الأماكن' : 'Explore Venues'}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/my-bookings">
                  {isRTL ? 'حجوزاتي' : 'My Bookings'}
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Guidelines;
