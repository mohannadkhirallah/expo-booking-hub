import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import expoLogo from '@/assets/expo-logo.png';
import expoLogoWhite from '@/assets/expo-logo-white.png';

const Footer = () => {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();

  const links = [
    { to: '/guidelines', label: t('footer.faqs') },
    { to: '/contact', label: t('footer.contact') },
    { href: 'https://expocitydubai.com', label: t('footer.website'), external: true },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className={cn(
          "flex flex-col md:flex-row items-center justify-between gap-6",
          isRTL && "md:flex-row-reverse"
        )}>
          {/* Logo & Copyright */}
          <div className={cn(
            "flex flex-col items-center md:items-start gap-3",
            isRTL && "md:items-end"
          )}>
            <img 
              src={isDark ? expoLogoWhite : expoLogo} 
              alt="Expo City Dubai" 
              className="h-8 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              {t('footer.rights')}
            </p>
          </div>

          {/* Links */}
          <nav className={cn(
            "flex flex-wrap items-center justify-center gap-4 md:gap-6",
            isRTL && "flex-row-reverse"
          )}>
            {links.map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to!}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
