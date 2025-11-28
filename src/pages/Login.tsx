import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { User, Building2, Landmark, Mail, Lock, Phone, CheckCircle2, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const venueParam = searchParams.get('venue');
  const facilityParam = searchParams.get('facility');

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Create Account state
  const [fullName, setFullName] = useState('');
  const [orgType, setOrgType] = useState<string>('');
  const [orgName, setOrgName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const organizationTypes = [
    { value: 'individual', labelEn: 'Individual', labelAr: 'فردي', icon: User },
    { value: 'company', labelEn: 'Company', labelAr: 'شركة', icon: Building2 },
    { value: 'government', labelEn: 'Government', labelAr: 'حكومي', icon: Landmark },
  ];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signInEmail || !signInPassword) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    // Mock successful sign-in
    toast({
      title: isRTL ? 'تم تسجيل الدخول بنجاح' : 'Signed in successfully',
      description: isRTL ? 'مرحباً بك في بوابة حجز الأماكن' : 'Welcome to the Venue Booking Portal',
    });

    // Navigate based on redirect parameter or default to my-bookings
    if (redirectUrl) {
      let finalUrl = redirectUrl;
      const params = new URLSearchParams();
      if (venueParam) params.set('venue', venueParam);
      if (facilityParam) params.set('facility', facilityParam);
      if (params.toString()) finalUrl += `?${params.toString()}`;
      navigate(finalUrl);
    } else {
      navigate('/my-bookings');
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !orgType || !registerEmail || !registerPassword || !confirmPassword) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (registerPassword !== confirmPassword) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'يرجى الموافقة على الشروط والأحكام' : 'Please agree to the terms and conditions',
        variant: 'destructive',
      });
      return;
    }

    // Show success state
    setRegistrationSuccess(true);
  };

  const handleContinueAfterRegistration = () => {
    if (redirectUrl) {
      let finalUrl = redirectUrl;
      const params = new URLSearchParams();
      if (venueParam) params.set('venue', venueParam);
      if (facilityParam) params.set('facility', facilityParam);
      if (params.toString()) finalUrl += `?${params.toString()}`;
      navigate(finalUrl);
    } else {
      navigate('/my-bookings');
    }
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 md:pt-28 pb-16 flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-md">
            <div className={cn(
              "bg-card border border-border rounded-2xl p-8 text-center",
              isRTL && "text-right"
            )}>
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {isRTL ? 'تم إنشاء الحساب بنجاح!' : 'Account Created Successfully!'}
              </h1>
              <p className="text-muted-foreground mb-6">
                {isRTL 
                  ? 'مرحباً بك في بوابة حجز أماكن إكسبو سيتي دبي. يمكنك الآن البدء في حجز الأماكن.'
                  : 'Welcome to Expo City Dubai Venue Booking Portal. You can now start booking venues.'}
              </p>
              <Button variant="hero" className="w-full" onClick={handleContinueAfterRegistration}>
                {isRTL ? 'متابعة' : 'Continue'}
                {!isRTL && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 md:pt-28 pb-16 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-lg">
          <div className={cn(
            "bg-card border border-border rounded-2xl p-6 md:p-8",
            isRTL && "text-right"
          )}>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">
                  {isRTL ? 'تسجيل الدخول' : 'Sign In'}
                </TabsTrigger>
                <TabsTrigger value="register">
                  {isRTL ? 'إنشاء حساب' : 'Create Account'}
                </TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground mb-1">
                    {isRTL ? 'مرحباً بعودتك' : 'Welcome Back'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {isRTL 
                      ? 'أدخل بياناتك للوصول إلى حجوزاتك'
                      : 'Enter your credentials to access your bookings'}
                  </p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">
                      {isRTL ? 'البريد الإلكتروني' : 'Email'}
                    </Label>
                    <div className="relative">
                      <Mail className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                        isRTL ? "right-3" : "left-3"
                      )} />
                      <Input 
                        id="signin-email" 
                        type="email" 
                        placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        className={cn("h-11", isRTL ? "pr-10 text-right" : "pl-10")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">
                      {isRTL ? 'كلمة المرور' : 'Password'}
                    </Label>
                    <div className="relative">
                      <Lock className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                        isRTL ? "right-3" : "left-3"
                      )} />
                      <Input 
                        id="signin-password" 
                        type={showSignInPassword ? "text" : "password"}
                        placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        className={cn("h-11", isRTL ? "pr-10 pl-10 text-right" : "pl-10 pr-10")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignInPassword(!showSignInPassword)}
                        className={cn(
                          "absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                          isRTL ? "left-3" : "right-3"
                        )}
                      >
                        {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className={cn("flex items-center justify-between", isRTL && "flex-row-reverse")}>
                    <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                      <Checkbox 
                        id="remember" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                        {isRTL ? 'تذكرني' : 'Remember me'}
                      </Label>
                    </div>
                    <button type="button" className="text-sm text-primary hover:underline">
                      {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                    </button>
                  </div>

                  <Button variant="hero" className="w-full h-11" type="submit">
                    {isRTL ? 'تسجيل الدخول' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? 'جديد على بوابة حجز أماكن إكسبو سيتي دبي؟' : 'New to Expo City Dubai venue booking?'}{' '}
                    <button 
                      type="button"
                      onClick={() => document.querySelector('[data-state="inactive"][value="register"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}
                      className="text-primary hover:underline font-medium"
                    >
                      {isRTL ? 'إنشاء حساب' : 'Create an account'}
                    </button>
                  </p>
                </div>
              </TabsContent>

              {/* Create Account Tab */}
              <TabsContent value="register">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground mb-1">
                    {isRTL ? 'إنشاء حساب جديد' : 'Create New Account'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {isRTL 
                      ? 'سجل لبدء حجز الأماكن في إكسبو سيتي دبي'
                      : 'Register to start booking venues at Expo City Dubai'}
                  </p>
                </div>

                {/* User Role Badges */}
                <div className={cn("flex flex-wrap gap-2 mb-6", isRTL && "justify-end")}>
                  {organizationTypes.map((type) => (
                    <div 
                      key={type.value}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border",
                        orgType === type.value 
                          ? "bg-primary/10 border-primary/30 text-primary" 
                          : "bg-muted/50 border-border text-muted-foreground",
                        isRTL && "flex-row-reverse"
                      )}
                    >
                      <type.icon className="w-3.5 h-3.5" />
                      {isRTL ? type.labelAr : type.labelEn}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleCreateAccount} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">
                      {isRTL ? 'الاسم الكامل' : 'Full Name'} <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <User className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                        isRTL ? "right-3" : "left-3"
                      )} />
                      <Input 
                        id="fullname" 
                        type="text" 
                        placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={cn("h-11", isRTL ? "pr-10 text-right" : "pl-10")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orgtype">
                      {isRTL ? 'نوع المنظمة' : 'Organization Type'} <span className="text-destructive">*</span>
                    </Label>
                    <Select value={orgType} onValueChange={setOrgType}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder={isRTL ? 'اختر نوع المنظمة' : 'Select organization type'} />
                      </SelectTrigger>
                      <SelectContent>
                        {organizationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                              <type.icon className="w-4 h-4" />
                              {isRTL ? type.labelAr : type.labelEn}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {(orgType === 'company' || orgType === 'government') && (
                    <div className="space-y-2">
                      <Label htmlFor="orgname">
                        {isRTL ? 'اسم المنظمة' : 'Organization Name'} <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Building2 className={cn(
                          "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                          isRTL ? "right-3" : "left-3"
                        )} />
                        <Input 
                          id="orgname" 
                          type="text" 
                          placeholder={isRTL ? 'أدخل اسم المنظمة' : 'Enter organization name'}
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          className={cn("h-11", isRTL ? "pr-10 text-right" : "pl-10")}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email">
                        {isRTL ? 'البريد الإلكتروني' : 'Email'} <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className={cn(
                          "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                          isRTL ? "right-3" : "left-3"
                        )} />
                        <Input 
                          id="register-email" 
                          type="email" 
                          placeholder={isRTL ? 'البريد الإلكتروني' : 'Email address'}
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          className={cn("h-11", isRTL ? "pr-10 text-right" : "pl-10")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile">
                        {isRTL ? 'رقم الهاتف' : 'Mobile Number'}
                      </Label>
                      <div className="relative">
                        <Phone className={cn(
                          "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                          isRTL ? "right-3" : "left-3"
                        )} />
                        <Input 
                          id="mobile" 
                          type="tel" 
                          placeholder={isRTL ? '+971 XX XXX XXXX' : '+971 XX XXX XXXX'}
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          className={cn("h-11", isRTL ? "pr-10 text-right" : "pl-10")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-password">
                        {isRTL ? 'كلمة المرور' : 'Password'} <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Lock className={cn(
                          "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                          isRTL ? "right-3" : "left-3"
                        )} />
                        <Input 
                          id="register-password" 
                          type={showRegisterPassword ? "text" : "password"}
                          placeholder={isRTL ? 'كلمة المرور' : 'Password'}
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          className={cn("h-11", isRTL ? "pr-10 pl-10 text-right" : "pl-10 pr-10")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          className={cn(
                            "absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                            isRTL ? "left-3" : "right-3"
                          )}
                        >
                          {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        {isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'} <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Lock className={cn(
                          "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                          isRTL ? "right-3" : "left-3"
                        )} />
                        <Input 
                          id="confirm-password" 
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={isRTL ? 'تأكيد كلمة المرور' : 'Confirm password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={cn("h-11", isRTL ? "pr-10 pl-10 text-right" : "pl-10 pr-10")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className={cn(
                            "absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                            isRTL ? "left-3" : "right-3"
                          )}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={cn("flex items-start gap-2", isRTL && "flex-row-reverse")}>
                    <Checkbox 
                      id="terms" 
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                      {isRTL 
                        ? 'أوافق على الشروط والأحكام وسياسة الخصوصية الخاصة بإكسبو سيتي دبي'
                        : 'I agree to Expo City Dubai\'s Terms and Conditions and Privacy Policy'}
                    </Label>
                  </div>

                  <Button variant="hero" className="w-full h-11" type="submit">
                    {isRTL ? 'إنشاء حساب' : 'Create Account'}
                  </Button>
                </form>

                {/* Role Explanation */}
                <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                  <h4 className={cn("text-sm font-semibold text-foreground mb-2", isRTL && "text-right")}>
                    {isRTL ? 'أنواع الحسابات' : 'Account Types'}
                  </h4>
                  <div className="space-y-2">
                    <div className={cn("flex items-start gap-2 text-xs text-muted-foreground", isRTL && "flex-row-reverse text-right")}>
                      <User className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        <strong>{isRTL ? 'فردي:' : 'Individual:'}</strong>{' '}
                        {isRTL ? 'للمنظمين الأفراد الذين يحجزون بشكل شخصي' : 'For individual organizers booking on their own'}
                      </span>
                    </div>
                    <div className={cn("flex items-start gap-2 text-xs text-muted-foreground", isRTL && "flex-row-reverse text-right")}>
                      <Building2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        <strong>{isRTL ? 'شركة / حكومي:' : 'Corporate / Government:'}</strong>{' '}
                        {isRTL ? 'للمؤسسات مع إمكانية إدارة عدة مستخدمين' : 'For organizations with multi-user management capabilities'}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
