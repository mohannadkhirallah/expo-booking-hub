import { Link } from 'react-router-dom';
import { Sun, Moon, Globe, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import expoLogo from '@/assets/expo-logo.png';
import expoLogoWhite from '@/assets/expo-logo-white.png';
import expoLogoAr from '@/assets/expo-logo-ar.png';

const Header = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/venues', label: t('nav.explore') },
    { to: '/my-bookings', label: t('nav.myBookings'), requiresAuth: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={isRTL ? expoLogoAr : (isDark ? expoLogoWhite : expoLogo)} 
              alt="Expo City Dubai" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className={cn(
            "hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2",
            isRTL && "flex-row-reverse"
          )}>
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button variant="nav" size="sm" className="relative">
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className={cn(
            "flex items-center gap-2",
            isRTL && "flex-row-reverse"
          )}>
            {/* Sign In Icon Button */}
            <Link to="/login" className="hidden lg:block">
              <Button variant="ghost" size="icon" aria-label={t('nav.signIn')}>
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="relative"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
              <span className="absolute -bottom-0.5 text-[10px] font-bold">
                {language === 'en' ? 'AR' : 'EN'}
              </span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    {link.label}
                  </Button>
                </Link>
              ))}
              {/* Sign In for mobile */}
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <User className="w-4 h-4" />
                  {t('nav.signIn')}
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
