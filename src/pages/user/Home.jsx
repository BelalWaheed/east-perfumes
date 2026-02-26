import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaTruck, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ProductCard from '@/components/ProductCard';
import { useTranslation } from '@/hooks/useTranslation';
import { useSEO } from '@/hooks/useSEO';

export default function Home() {
  const { products } = useSelector((s) => s.products);
  const { t, isRTL } = useTranslation();

  useSEO({
    title: t('home.discover') + ' ' + t('home.latestFashion'),
    description: t('home.heroDescription'),
    keywords: 'perfumes, عطور, TIVAQ Fragrance, oud, بخور, عود, luxury fragrances',
  });

  const featuredProducts = products.slice(0, 4);
  const categories = [...new Set(products.map((p) => p.category))].slice(0, 4);

  const features = [
    { icon: FaTruck, title: t('home.freeShipping'), desc: t('home.freeShippingDesc') },
    { icon: FaShieldAlt, title: t('home.securePayment'), desc: t('home.securePaymentDesc') },
    { icon: FaHeadset, title: t('home.support247'), desc: t('home.support247Desc') },
    { icon: FaStar, title: t('home.premiumQuality'), desc: t('home.premiumQualityDesc') },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-100px)] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-6 ${isRTL ? 'lg:order-2' : ''}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <FaStar className="text-yellow-500" />
              <span>{t('home.newCollection')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">{t('home.discover')}</span>
              <br />
              <span className="text-foreground">{t('home.latestFashion')}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md">
              {t('home.heroDescription')}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products">
                <button className="btn-premium px-8 py-4 text-white text-lg group flex items-center gap-2">
                  {t('common.shop')}
                  <FaArrowRight className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-12 pt-8">
              <div>
                <p className="text-3xl font-bold gradient-text">{products.length}+</p>
                <p className="text-sm text-muted-foreground">{t('common.products')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">10K+</p>
                <p className="text-sm text-muted-foreground">{t('home.happyCustomers')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">24/7</p>
                <p className="text-sm text-muted-foreground">{t('home.support')}</p>
              </div>
            </div>
          </div>

          {/* Hero Image/Products */}
          <div className={`relative ${isRTL ? 'lg:order-1' : ''}`}>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 gradient-primary rounded-full opacity-20 blur-3xl animate-pulse" />
              <div className="relative w-full h-full rounded-full bg-linear-to-br from-primary/5 to-accent/5 border border-primary/10 flex items-center justify-center overflow-hidden">
                {featuredProducts[0] && (
                  <img
                    src={featuredProducts[0].image}
                    alt="Featured Product"
                    className="w-3/4 h-3/4 object-contain animate-float"
                  />
                )}
              </div>

              {/* Floating product cards */}
              {featuredProducts[1] && (
                <div className="absolute -top-4 -right-4 w-24 h-24 card-premium p-2 animate-float shadow-lg">
                  <img src={featuredProducts[1].image} alt="" className="w-full h-full object-contain" />
                </div>
              )}
              {featuredProducts[2] && (
                <div className="absolute -bottom-4 -left-4 w-28 h-28 card-premium p-2 animate-float shadow-lg delay-500">
                  <img src={featuredProducts[2].image} alt="" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <item.icon className="text-xl" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="gradient-text">{t('home.featuredProducts')}</span>
              </h2>
              <p className="text-muted-foreground">{t('home.featuredDesc')}</p>
            </div>
            <Link to="/products">
              <button className="border border-border rounded-full px-6 py-2.5 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 group flex items-center gap-2">
                {t('common.viewAll')}
                <FaArrowRight className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent to-secondary/20 pointer-events-none" />
        <div className="absolute -left-20 top-40 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -right-20 bottom-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t('home.shopByCategory')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.categoryDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const categoryProducts = products.filter((p) => p.category === category);
              const displayImage = categoryProducts[0]?.image;

              return (
                <Link
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className="group relative"
                >
                  <div className="h-80 rounded-3xl overflow-hidden card-premium transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border-none relative group">
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-60 z-10 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="w-full h-full p-8 flex items-center justify-center bg-white dark:bg-white/5">
                      {displayImage && (
                        <img
                          src={displayImage}
                          alt={category}
                          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-foreground capitalize mb-2 group-hover:text-primary transition-colors">
                            {t(`categories.${category}`, category)}
                          </h3>
                          <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                              {categoryProducts.length} {t('common.items')}
                            </span>
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                          <FaArrowRight className={isRTL ? 'rotate-180' : ''} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
