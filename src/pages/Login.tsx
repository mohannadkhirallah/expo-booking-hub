import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Login = () => {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 md:pt-28 pb-16 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <div className={cn(
            "bg-card border border-border rounded-2xl p-8",
            isRTL && "text-right"
          )}>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {isRTL ? 'تسجيل الدخول' : 'Sign In'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {isRTL 
                ? 'أدخل بريدك الإلكتروني للوصول إلى حجوزاتك'
                : 'Enter your email to access your bookings'}
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="email">
                  {isRTL ? 'البريد الإلكتروني' : 'Email'}
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  className={cn(isRTL && "text-right")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  {isRTL ? 'كلمة المرور' : 'Password'}
                </Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                  className={cn(isRTL && "text-right")}
                />
              </div>

              <Button variant="hero" className="w-full">
                {isRTL ? 'تسجيل الدخول' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  {isRTL ? 'سجل الآن' : 'Register'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
