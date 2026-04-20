import { useTranslation } from '@/hooks/useTranslation';
import { useSEO } from '@/hooks/useSEO';
import { FaFileContract, FaHistory, FaGem, FaGlobe } from 'react-icons/fa';
import aboutHero from '@/assets/about_us_hero.png';

export default function AboutUs() {
  const { t } = useTranslation();

  useSEO({
    title: t('aboutUs.title'),
    description: t('aboutUs.subtitle'),
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-card border border-border shadow-2xl">
        <div className="grid lg:grid-cols-2 gap-0 items-center">
          <div className="p-8 md:p-16 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
              <FaHistory /> {t('aboutUs.title')}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="gradient-text">{t('aboutUs.storyTitle')}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed italic">
              "Every scent has a story, every bottle holds a soul."
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('aboutUs.storyText')}
            </p>
          </div>
          <div className="relative h-64 lg:h-full min-h-[400px] overflow-hidden">
            <img
              src={aboutHero}
              alt="About TIVAQ"
              className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]"
            />
            {/* Gradient Overlay for content readability on small screens */}
            <div className="absolute inset-0 bg-linear-to-r from-card via-card/20 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-card lg:hidden block" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card-premium p-10 space-y-6 group hover:border-primary/50 transition-colors duration-500">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary text-2xl group-hover:scale-110 transition-transform duration-500">
            <FaGem />
          </div>
          <h2 className="text-2xl font-bold">{t('aboutUs.missionTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('aboutUs.missionText')}
          </p>
        </div>
        <div className="card-premium p-10 space-y-6 group hover:border-primary/50 transition-colors duration-500">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary text-2xl group-hover:scale-110 transition-transform duration-500">
            <FaGlobe />
          </div>
          <h2 className="text-2xl font-bold">{t('aboutUs.founderTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('aboutUs.founderText')}
          </p>
        </div>
      </div>

      {/* Tax Registration Section - Integrated here now */}
      <section id="tax" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-3">
             <span className="w-8 h-px bg-border hidden md:block" />
             {t('customerService.taxRegistration')}
             <span className="w-8 h-px bg-border hidden md:block" />
          </h2>
        </div>
        <div className="card-premium p-8 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8 group">
          <div className="flex items-center gap-6">
            <span className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
              <FaFileContract className="text-2xl sm:text-4xl text-primary" />
            </span>
            <div className="text-center md:text-start">
              <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-1 tracking-tighter">
                {t('customerService.taxNumber')}
              </h3>
              <p className="text-muted-foreground uppercase text-xs font-bold tracking-widest flex items-center justify-center md:justify-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t('customerService.taxRegistration')}
              </p>
            </div>
          </div>
          <div className="px-6 py-2 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
            OFFICIAL REGISTRATION
          </div>
        </div>
      </section>
    </div>
  );
}
