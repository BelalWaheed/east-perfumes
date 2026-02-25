import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiSearch, HiX } from 'react-icons/hi';
import { FaFilter } from 'react-icons/fa';
import ProductCard from '@/components/ProductCard';
import Loader from '@/components/Loader';
import { useTranslation } from '@/hooks/useTranslation';

export default function Products() {
  const { products, loading } = useSelector((s) => s.products);
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  // Price stats
  const priceStats = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 5000 };
    const prices = products.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  // Filter states
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGender, setSelectedGender] = useState('all');
  const [priceRange, setPriceRange] = useState([priceStats.min, priceStats.max]);
  const [showFilters, setShowFilters] = useState(initialCategory !== 'all');
  const [priceInitialized, setPriceInitialized] = useState(false);
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Sync category from URL
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
      setShowFilters(true);
    }
  }, [searchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedGender, priceRange, search]);

  // Categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ['all', ...cats];
  }, [products]);

  // Initialize price range
  if (!priceInitialized && products.length > 0) {
    setPriceRange([priceStats.min, priceStats.max]);
    setPriceInitialized(true);
  }

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesGender = selectedGender === 'all' || product.gender?.toLowerCase() === selectedGender.toLowerCase();
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSearch = !search.trim() ||
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesPrice && matchesGender && matchesSearch;
    });
  }, [products, selectedCategory, priceRange, selectedGender, search]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedGender('all');
    setPriceRange([priceStats.min, priceStats.max]);
    setSearch('');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedGender !== 'all' ||
    priceRange[0] !== priceStats.min ||
    priceRange[1] !== priceStats.max ||
    search.trim();

  if (loading) return <Loader message={t('common.loading')} />;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="xl:max-w-10/12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">{t('common.ourProducts')}</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
            {t('home.featuredDesc')}
          </p>
        </div>

        {/* Compact Filter Bar / Command Center */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8">
          {/* Main Controls Group */}
          <div className="flex-1 flex flex-col md:flex-row items-center gap-3">
            {/* Search */}
            <div className="relative w-full md:max-w-xs group">
              <HiSearch className="absolute top-1/2 inset-s-3.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('common.search')}
                className="w-full ps-10 pe-9 py-2 rounded-xl bg-card border border-border text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute top-1/2 inset-e-2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary text-muted-foreground transition-all"
                >
                  <HiX className="text-xs" />
                </button>
              )}
            </div>

            {/* Segmented Gender Control */}
            <div className="flex p-1 bg-secondary rounded-xl w-full md:w-auto">
              {['all', 'male', 'female'].map((gender) => (
                <button
                  key={gender}
                  onClick={() => setSelectedGender(gender)}
                  className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedGender === gender
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(`filters.gender.${gender}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Actions Group */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border shadow-sm ${
                showFilters
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground border-border hover:bg-secondary'
              }`}
            >
              <FaFilter className={`text-[10px] ${showFilters ? 'rotate-180' : ''}`} />
              {showFilters ? t('common.hideFilters') : t('common.showFilters')}
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                title={t('common.clearFilters')}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all border border-border"
              >
                <HiX />
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p className="text-sm text-muted-foreground">
            {t('common.showing')}{' '}
            <span className="font-semibold text-foreground">{filteredProducts.length}</span>{' '}
            {t('common.of')}{' '}
            <span className="font-semibold text-foreground">{products.length}</span>{' '}
            {t('common.products')}
          </p>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="card-premium p-6 mb-8 animate-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t('filters.category')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'btn-premium text-white shadow-md'
                          : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {category === 'all' ? t('common.allCategories') : (t(`categories.${category}`) || category)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t('filters.priceRange')}
                  </h3>
                  <div className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {priceRange[0]} — {priceRange[1]} {t('common.currency')}
                  </div>
                </div>
                
                <div className="px-2 pt-2">
                  <div className="dual-range-slider-container">
                    <div className="dual-range-slider-track" />
                    <div 
                      className="dual-range-slider-progress"
                      style={{
                        insetInlineStart: `${((priceRange[0] - priceStats.min) / (priceStats.max - priceStats.min)) * 100}%`,
                        insetInlineEnd: `${100 - ((priceRange[1] - priceStats.min) / (priceStats.max - priceStats.min)) * 100}%`
                      }}
                    />
                    <input
                      type="range"
                      min={priceStats.min}
                      max={priceStats.max}
                      value={priceRange[0]}
                      onChange={(e) => {
                        const val = Math.min(Number(e.target.value), priceRange[1] - 1);
                        setPriceRange([val, priceRange[1]]);
                      }}
                      className="dual-range-slider-input"
                    />
                    <input
                      type="range"
                      min={priceStats.min}
                      max={priceStats.max}
                      value={priceRange[1]}
                      onChange={(e) => {
                        const val = Math.max(Number(e.target.value), priceRange[0] + 1);
                        setPriceRange([priceRange[0], val]);
                      }}
                      className="dual-range-slider-input"
                    />
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground mt-4 font-medium">
                    <span>{priceStats.min} {t('common.currency')}</span>
                    <span>{priceStats.max} {t('common.currency')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-2.5 rounded-full border border-border text-foreground hover:bg-secondary transition-all font-medium disabled:opacity-50"
                >
                  ←
                </button>
                <span className="text-sm font-medium text-foreground">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2.5 rounded-full border border-border text-foreground hover:bg-secondary transition-all font-medium disabled:opacity-50"
                >
                  →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t('common.noProductsFound')}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              {t('common.tryAdjustingFilters')}
            </p>
            <button onClick={resetFilters} className="btn-premium text-white px-6 py-3">
              {t('common.resetFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
