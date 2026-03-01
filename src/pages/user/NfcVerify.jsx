import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HiShieldCheck, HiExclamationCircle, HiGift } from 'react-icons/hi';
import { useTranslation } from '@/hooks/useTranslation';
import { useSEO } from '@/hooks/useSEO';
import { purchaseProduct } from '@/redux/slices/profileSlice';
import { updateProduct } from '@/redux/slices/productSlice';
import { setPlaylist } from '@/redux/slices/audioSlice';
import AudioPlayer from '@/components/AudioPlayer';

export default function NfcVerify() {
  const { nfcCode: paramCode } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((s) => s.products);
  const { loggedUser, logged } = useSelector((s) => s.profile);
  const { t } = useTranslation();

  useSEO({
    title: t('verify.title'),
    description: t('verify.subtitle'),
  });
  const [code, setCode] = useState(paramCode || '');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Stop audio and clear playlist when leaving this page
  useEffect(() => {
    return () => {
      dispatch(setIsPlaying(false));
      dispatch(setPlaylist([]));
    };
  }, [dispatch]);

  // Auto-verify if code came from URL
  useEffect(() => {
    if (paramCode) verify(paramCode);
  }, [paramCode]);

  const verify = (c) => {
    setLoading(true);
    setTimeout(() => {
      // Search all products for one whose nfcCode array contains a matching code
      let found = null;
      let matchedEntry = null;
      for (const p of products) {
        const codes = p.nfcCode || [];
        const entry = codes.find((e) => e.code === c);
        if (entry) {
          found = p;
          matchedEntry = entry;
          break;
        }
      }

      if (found && matchedEntry) {
        const isAlreadyUsed = matchedEntry.used === '1';
        setResult({ authentic: true, product: found, alreadyUsed: isAlreadyUsed });

        // Only award points if code is NOT already used
        if (!isAlreadyUsed) {
          if (logged && loggedUser) {
            dispatch(
              purchaseProduct({
                user: loggedUser,
                product: found,
                finalPrice: found.price,
                pointsUsed: 0,
                fixedPoints: 50,
              })
            );
          } else {
            localStorage.setItem('ep-pendingVerification', JSON.stringify({
              productId: found.id,
              points: 50,
            }));
          }

          // Mark the NFC code as used
          const updatedCodes = (found.nfcCode || []).map((e) =>
            e.code === c ? { ...e, used: '1' } : e
          );
          dispatch(updateProduct({ id: found.id, data: { nfcCode: updatedCodes } }));
        }

        // Play product's audio playlist
        const productAudio = found.audioURL || [];
        if (productAudio.length > 0) {
          dispatch(setPlaylist(productAudio));
        }
      } else {
        setResult({ authentic: false });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-xl mx-auto px-4 pt-2 pb-8">
      <div className="text-center mb-12">
        <div className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6">
          <HiShieldCheck className="text-4xl text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">{t('nfc.title')}</span>
        </h1>
      </div>

      {/* Instructions or Result */}
      {!result ? (
        <div className="card-premium p-8 glass text-center border-l-4 border-l-primary">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <HiShieldCheck className="text-3xl text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-4">{t('verify.howItWorks')}</h2>
          <div className="text-start max-w-sm mx-auto">
            <ol className="text-sm text-muted-foreground space-y-4 list-decimal ps-4">
              <li>{t('verify.step1')}</li>
              <li>{t('verify.step2')}</li>
              <li>
                <span className="font-semibold text-foreground">{t('verify.scanTag')}:</span> 
                {" "}{t('verify.scanTagDesc')}
              </li>
              <li>{t('verify.step3')}</li>
            </ol>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2">{t('verify.exclusiveAccess')}</p>
            <p className="text-sm text-foreground/70">
              {t('verify.exclusiveAccessDesc')}
            </p>
          </div>
        </div>
      ) : (
        <div className={`card-premium p-8 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-300 ${
          result.authentic
            ? 'border-green-500/30'
            : 'border-destructive/30'
        } border-2`}>
          {result.authentic ? (
            <>
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-green-500/10">
                <HiShieldCheck className="text-3xl text-green-500" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-green-500">
                {t('nfc.productAuthentic')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('nfc.authenticDesc')}
              </p>

              {/* Points Redemption Info */}
              <div className="mb-6 animate-in zoom-in-95 duration-500">
                {result.alreadyUsed ? (
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border text-center">
                    <p className="text-sm font-bold text-foreground mb-1">{t('verify.alreadyUsed')}</p>
                    <p className="text-xs text-muted-foreground">{t('verify.alreadyUsedDesc')}</p>
                  </div>
                ) : logged ? (
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center gap-3">
                    <HiGift className="text-2xl text-primary" />
                    <div>
                      <p className="text-sm font-bold text-foreground">{t('verify.success')}</p>
                      <p className="text-xs text-muted-foreground">{t('verify.successDesc')}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      {t('common.earnPointsGuest').replace('{points}', 50)}
                    </p>
                    <Link to="/login" className="text-xs text-primary font-semibold hover:underline">
                      {t('common.login')} / {t('common.signUp')}
                    </Link>
                  </div>
                )}
              </div>

              {result.product && (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-green-500/5">
                  <img
                    src={result.product.image}
                    alt={result.product.name}
                    className="w-20 h-20 rounded-lg object-contain bg-white"
                  />
                  <div className="text-start">
                    <p className="font-semibold text-foreground">{result.product.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{result.product.category}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <HiExclamationCircle className="text-3xl text-destructive" />
              </div>
              <h2 className="text-xl font-bold text-destructive mb-2">{t('nfc.productNotFound')}</h2>
              <p className="text-muted-foreground">{t('nfc.invalidDesc')}</p>
            </>
          )}
        </div>
      )}
      {result?.authentic && <AudioPlayer />}
    </div>
  );
}
