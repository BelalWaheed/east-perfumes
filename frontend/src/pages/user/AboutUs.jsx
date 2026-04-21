import { useTranslation } from '@/hooks/useTranslation';
import { useSEO } from '@/hooks/useSEO';
import { FaFileContract, FaHistory } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import aboutHero from '@/assets/about_us_hero.png';

export default function AboutUs() {
  const { t } = useTranslation();

  useSEO({
    title: t('aboutUs.title'),
    description: t('aboutUs.subtitle'),
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
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
            <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-4 py-2 bg-primary/5 rounded-r-xl">
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
            <div className="absolute inset-0 bg-linear-to-r from-card via-card/20 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-card lg:hidden block" />
          </div>
        </div>
      </section>

      {/* Merged Info & Tax Section */}
      <section id="info" className="max-w-4xl mx-auto pb-12">
        <div className="card-premium p-8 md:p-12 border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all duration-500 rounded-[2.5rem] relative overflow-hidden group">
          {/* Decorative element */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700" />
          
          <div className="relative z-10 space-y-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform duration-500">
                <HiSparkles />
              </div>
              <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed max-w-2xl px-4">
                {t('aboutUs.mergedInfo')}
              </p>
               <p className="text-lg text-foreground leading-relaxed">
                <span className="font-bold text-primary">{t('customerService.taxRegistrationPrefix')}</span> <span className="font-mono bg-secondary px-2 py-0.5 rounded-md text-primary/80">{t('customerService.taxNumber')}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
