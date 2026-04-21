import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiTrash, HiPlus, HiChevronUp, HiChevronDown } from 'react-icons/hi';
import { FaMusic } from 'react-icons/fa';
import { updateProduct } from '@/redux/slices/productSlice';
import { useTranslation } from '@/hooks/useTranslation';
import Swal from 'sweetalert2';

export default function AdminAudio() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { products } = useSelector((s) => s.products);

  const [selectedProductId, setSelectedProductId] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const selectedProduct = useMemo(
    () => products.find((p) => String(p.id) === String(selectedProductId)),
    [products, selectedProductId]
  );

  const audioList = selectedProduct?.audioURL || [];

  const saveAudioList = async (updatedList) => {
    if (!selectedProduct) return false;
    setSaving(true);
    try {
      await dispatch(updateProduct({ id: selectedProduct.id, data: { audioURL: updatedList } })).unwrap();
      return true;
    } catch {
      Swal.fire({ icon: 'error', text: t('admin.error') });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async () => {
    const url = newUrl.trim();
    if (!url) return;
    if (audioList.includes(url)) {
      return Swal.fire({ icon: 'warning', text: t('admin.audioDuplicate') });
    }
    const success = await saveAudioList([...audioList, url]);
    if (success) {
      setNewUrl('');
      Swal.fire({ icon: 'success', text: t('admin.audioAdded'), timer: 1200, showConfirmButton: false });
    }
  };

  const handleRemove = async (index) => {
    const result = await Swal.fire({
      title: t('admin.deleteConfirm'),
      text: t('admin.audioRemoveConfirm'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: t('common.delete'),
      cancelButtonText: t('profile.cancel'),
    });
    if (!result.isConfirmed) return;

    const updated = audioList.filter((_, i) => i !== index);
    const success = await saveAudioList(updated);
    if (success) {
      Swal.fire({ icon: 'success', text: t('admin.audioRemoved'), timer: 1200, showConfirmButton: false });
    }
  };

  const handleMove = async (index, direction) => {
    const newList = [...audioList];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newList.length) return;
    [newList[index], newList[swapIndex]] = [newList[swapIndex], newList[index]];
    await saveAudioList(newList);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
          <FaMusic className="text-xl text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">{t('admin.manageAudio')}</span>
          </h1>
          <p className="text-sm text-muted-foreground">{t('admin.manageAudioDesc')}</p>
        </div>
      </div>

      {/* Product Selector */}
      <div className="card-premium p-6 mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">{t('admin.selectProduct')}</label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
        >
          <option value="">{t('admin.selectProductPlaceholder')}</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({(p.audioURL || []).length} {t('admin.tracks')})
            </option>
          ))}
        </select>
      </div>

      {selectedProduct && (
        <>
          {/* Add New Audio URL */}
          <div className="card-premium p-6 mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">{t('admin.addAudioURL')}</label>
            <div className="flex gap-3">
              <input
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://example.com/audio.mp3"
                className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
              <button
                onClick={handleAdd}
                disabled={saving || !newUrl.trim()}
                className="btn-premium px-6 py-3 text-white flex items-center gap-2 disabled:opacity-50"
              >
                <HiPlus className="text-lg" />
                {t('common.add')}
              </button>
            </div>

            {/* Preview new URL */}
            {newUrl.trim() && (
              <div className="mt-3">
                <audio controls src={newUrl.trim()} className="w-full h-10 rounded-xl" />
              </div>
            )}
          </div>

          {/* Audio Track List */}
          <div className="card-premium overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-secondary/30">
              <h2 className="text-sm font-semibold text-foreground">
                {t('admin.audioTracks')} — {selectedProduct.name}
                <span className="text-muted-foreground font-normal ms-2">({audioList.length})</span>
              </h2>
            </div>

            {audioList.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <FaMusic className="text-4xl text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">{t('admin.noAudioTracks')}</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {audioList.map((url, index) => (
                  <div
                    key={index}
                    className="px-6 py-4 hover:bg-secondary/20 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Track Number */}
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                        {index + 1}
                      </div>

                      {/* Track Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate" title={url}>
                          {url.split('/').pop() || url}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{url}</p>
                      </div>

                      {/* Reorder + Delete */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleMove(index, -1)}
                          disabled={saving || index === 0}
                          className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all disabled:opacity-20"
                          title="Move up"
                        >
                          <HiChevronUp className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleMove(index, 1)}
                          disabled={saving || index === audioList.length - 1}
                          className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all disabled:opacity-20"
                          title="Move down"
                        >
                          <HiChevronDown className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleRemove(index)}
                          disabled={saving}
                          className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                          title={t('common.delete')}
                        >
                          <HiTrash className="text-lg" />
                        </button>
                      </div>
                    </div>

                    {/* Inline Player */}
                    <div className="mt-3 ms-12">
                      <audio controls src={url} className="w-full h-9 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
