import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative bg-card/50 backdrop-blur-sm border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <Link to="/">
                <span className="font-bold text-xl text-foreground">{t('common.brandName')}</span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('footer.brandDescription')}
              </p>
              <div className="flex gap-3">
                {[
                  { icon: FaWhatsapp, href: `https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE || ''}` },
                  { icon: FaInstagram, href: '#' },
                  { icon: FaFacebookF, href: '#' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-secondary hover:gradient-primary text-foreground hover:text-white flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-3">
                {[
                  { to: '/', label: t('common.home') },
                  { to: '/products', label: t('common.shop') },
                  { to: '/profile', label: t('common.profile') },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-primary transition-colors animated-underline inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                {t('footer.customerService')}
              </h3>
              <ul className="space-y-3">
                {[
                  { label: t('footer.faq'), to: '/customer-service#faq' },
                  { label: t('footer.shippingReturns'), to: '/customer-service#shipping' },
                  { label: t('footer.terms'), to: '/customer-service#terms' },
                  { label: t('footer.privacy'), to: '/customer-service#privacy' },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-primary transition-colors animated-underline inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* NFC Verify */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                {t('common.verifyProduct')}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('nfc.title')}
              </p>
              <Link
                to="/verify"
                className="inline-block btn-premium px-6 py-2.5 text-white text-sm"
              >
                {t('nfc.verify')}
              </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} {t('common.brandName')}. {t('footer.rights')}.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                {[
                  { label: t('footer.bottomTerms'), href: '/customer-service#terms' },
                  { label: t('footer.bottomPrivacy'), href: '/customer-service#privacy' },
                  { label: t('footer.cookies'), href: '#' },
                ].map((link, i) => (
                  <Link key={i} to={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
