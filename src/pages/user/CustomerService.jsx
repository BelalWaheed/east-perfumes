import { useState } from 'react';
import { HiChevronDown, HiChevronRight, HiChevronUp } from 'react-icons/hi';
import { FaTruck, FaUndo, FaQuestionCircle, FaFileContract, FaShieldAlt } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';

function Accordion({ question, answer, open, onClick }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-6 py-4 text-foreground font-medium hover:bg-secondary/50 transition-colors text-start"
      >
        <span>{question}</span>
        {open ? <HiChevronUp className="text-primary" /> : <HiChevronDown className="text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed animate-in slide-in-from-top-1 duration-200">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function CustomerService() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: t('customerService.faq1Q'), a: t('customerService.faq1A') },
    { q: t('customerService.faq2Q'), a: t('customerService.faq2A') },
    { q: t('customerService.faq3Q'), a: t('customerService.faq3A') },
    { q: t('customerService.faq4Q'), a: t('customerService.faq4A') },
    { q: t('customerService.faq5Q'), a: t('customerService.faq5A') },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{t('customerService.title')}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('customerService.subtitle')}
        </p>
      </div>

      <div className="space-y-16">
        {/* Verify Product Section */}
        <section id="verify">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FaShieldAlt />
            </div>
            {t('customerService.verifyTitle')}
          </h2>
          <div className="card-premium p-8 text-center sm:text-start flex flex-col sm:flex-row items-center gap-8 group">
            <div className="w-24 h-24 rounded-3xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-500">
              <FaShieldAlt className="text-5xl text-primary animate-pulse" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {t('customerService.verifySubtitle')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('customerService.verifyDescription')}
                </p>
              </div>
              <Link
                to="/verify"
                className="inline-block btn-premium px-6 py-2.5 text-white text-sm"
              >
                {t('common.verifyProduct')}
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FaQuestionCircle />
            </div>
            {t('customerService.faqTitle')}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Accordion
                key={i}
                question={faq.q}
                answer={faq.a}
                open={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </section>

        {/* Shipping & Returns */}
        <section id="shipping">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FaTruck />
            </div>
            {t('customerService.shippingTitle')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-premium p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FaTruck className="text-primary" />
                {t('customerService.shippingPolicy')}
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {t('customerService.shipping1')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {t('customerService.shipping2')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {t('customerService.shipping3')}
                </li>
              </ul>
            </div>
            <div className="card-premium p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FaUndo className="text-primary" />
                {t('customerService.returnsPolicy')}
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {t('customerService.returns1')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {t('customerService.returns2')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {t('customerService.returns3')}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Terms */}
        <section id="terms">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FaFileContract />
            </div>
            {t('customerService.termsTitle')}
          </h2>
          <div className="card-premium p-6 space-y-6">
            <p className="text-muted-foreground">{t('customerService.termsIntro')}</p>
            {['terms1', 'terms2', 'terms3'].map((key) => (
              <div key={key}>
                <h3 className="font-semibold text-foreground mb-2">{t(`customerService.${key}Title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`customerService.${key}Text`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FaShieldAlt />
            </div>
            {t('customerService.privacyTitle')}
          </h2>
          <div className="card-premium p-6 space-y-6">
            <p className="text-muted-foreground">{t('customerService.privacyIntro')}</p>
            {['privacy1', 'privacy2', 'privacy3'].map((key) => (
              <div key={key}>
                <h3 className="font-semibold text-foreground mb-2">{t(`customerService.${key}Title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`customerService.${key}Text`)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

