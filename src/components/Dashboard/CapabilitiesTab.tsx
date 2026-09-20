import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Capability } from '../../types';
import { ImageWithFallback } from '../ImageWithFallback';
import { Briefcase, Plus, Trash2, Edit3, Image as ImageIcon } from 'lucide-react';

export const CapabilitiesTab: React.FC = () => {
  const { siteConfig, updateSiteConfig, language } = usePortfolio();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const capabilities = siteConfig.capabilities || [];

  const handleUpdateCapability = (index: number, field: keyof Capability, value: any) => {
    updateSiteConfig((prev) => {
      const updated = [...(prev.capabilities || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, capabilities: updated };
    });
  };

  const handleAddCapability = () => {
    const newCap: Capability = {
      number: String(capabilities.length + 1).padStart(2, '0'),
      titleAr: 'خدمة وتخصص جديد',
      titleEn: 'New Discipline & Service',
      descAr: 'وصف تفصيلي للخدمة والمخرجات الإبداعية الملموسة للعميل.',
      descEn: 'Strategic and creative deliverables tailored for high-end brands.',
      previewImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=900&auto=format&fit=crop',
      tagsAr: ['استراتيجية', 'تنفيذ'],
      tagsEn: ['Strategy', 'Execution'],
    };
    updateSiteConfig((prev) => ({
      ...prev,
      capabilities: [...(prev.capabilities || []), newCap],
    }));
    setEditingIndex(capabilities.length);
  };

  const handleDeleteCapability = (index: number) => {
    if (window.confirm(language === 'ar' ? 'هل أنتِ متأكدة من حذف هذه الخدمة؟' : 'Delete this capability?')) {
      updateSiteConfig((prev) => {
        const filtered = (prev.capabilities || []).filter((_, i) => i !== index);
        // Re-number sequentially
        const renumbered = filtered.map((c, i) => ({
          ...c,
          number: String(i + 1).padStart(2, '0'),
        }));
        return { ...prev, capabilities: renumbered };
      });
      if (editingIndex === index) setEditingIndex(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-4 border-b border-[#171717]/8">
        <div className="flex items-center gap-2.5">
          <Briefcase className="w-4 h-4 text-[#B49A7A]" />
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
              {language === 'ar'
                ? `الخدمات والقدرات الإبداعية (${capabilities.length})`
                : `Creative Services & Capabilities (${capabilities.length})`}
            </h3>
            <p className="text-xs text-[#77736F]">
              {language === 'ar'
                ? 'حددي مجالات عملك التي تظهر في قسم الخبرات والخدمات'
                : 'Manage your creative offerings displayed in the Expertise section'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddCapability}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-xs font-semibold transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'إضافة خدمة' : 'Add Service'}</span>
        </button>
      </div>

      <div className="space-y-4">
        {capabilities.map((cap, index) => {
          const isExpanded = editingIndex === index;

          return (
            <div
              key={index}
              className="p-5 rounded-2xl bg-[#EFECE7]/60 border border-[#171717]/8 space-y-4 transition-all"
            >
              {/* Row Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#B49A7A] px-2 py-1 rounded bg-[#171717]/5">
                    {cap.number}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#171717]">
                      {language === 'ar' ? cap.titleAr : cap.titleEn}
                    </h4>
                    <span className="text-xs text-[#77736F]">
                      {language === 'ar' ? cap.titleEn : cap.titleAr}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingIndex(isExpanded ? null : index)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F7F5F2] hover:bg-[#171717] hover:text-[#F7F5F2] text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>
                      {isExpanded
                        ? language === 'ar'
                          ? 'إغلاق'
                          : 'Collapse'
                        : language === 'ar'
                        ? 'تعديل'
                        : 'Edit'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteCapability(index)}
                    className="p-1.5 rounded-lg bg-[#F7F5F2] hover:bg-red-600 hover:text-white text-[#77736F] transition-colors cursor-pointer"
                    title={language === 'ar' ? 'حذف' : 'Delete'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Edit Details when expanded */}
              {isExpanded && (
                <div className="pt-4 border-t border-[#171717]/8 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-medium text-[#77736F] mb-1">
                      {language === 'ar' ? 'عنوان الخدمة (بالعربية)' : 'Title (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={cap.titleAr}
                      onChange={(e) => handleUpdateCapability(index, 'titleAr', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                      dir="rtl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#77736F] mb-1">
                      {language === 'ar' ? 'عنوان الخدمة (بالإنجليزية)' : 'Title (English)'}
                    </label>
                    <input
                      type="text"
                      value={cap.titleEn}
                      onChange={(e) => handleUpdateCapability(index, 'titleEn', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#77736F] mb-1">
                      {language === 'ar' ? 'الوصف التوضيحي (بالعربية)' : 'Description (Arabic)'}
                    </label>
                    <textarea
                      rows={2}
                      value={cap.descAr}
                      onChange={(e) => handleUpdateCapability(index, 'descAr', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                      dir="rtl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#77736F] mb-1">
                      {language === 'ar' ? 'الوصف التوضيحي (بالإنجليزية)' : 'Description (English)'}
                    </label>
                    <textarea
                      rows={2}
                      value={cap.descEn}
                      onChange={(e) => handleUpdateCapability(index, 'descEn', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#77736F] mb-1">
                      {language === 'ar' ? 'الوسوم والمخرجات (عربي - مفصولة بفواصل)' : 'Tags (Arabic - comma separated)'}
                    </label>
                    <input
                      type="text"
                      value={(cap.tagsAr || []).join('، ')}
                      onChange={(e) =>
                        handleUpdateCapability(
                          index,
                          'tagsAr',
                          e.target.value.split(/[,،]/).map((t) => t.trim()).filter(Boolean)
                        )
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                      placeholder="استراتيجية، شعار، دليل الهوية"
                      dir="rtl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#77736F] mb-1">
                      {language === 'ar' ? 'الوسوم والمخرجات (إنجليزي - مفصولة بفواصل)' : 'Tags (English - comma separated)'}
                    </label>
                    <input
                      type="text"
                      value={(cap.tagsEn || []).join(', ')}
                      onChange={(e) =>
                        handleUpdateCapability(
                          index,
                          'tagsEn',
                          e.target.value.split(/[,،]/).map((t) => t.trim()).filter(Boolean)
                        )
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                      placeholder="Strategy, Logomark, Guidelines"
                      dir="ltr"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-xs font-medium text-[#77736F]">
                      {language === 'ar' ? 'رابط صورة المعاينة عند التحويم (Preview Image URL)' : 'Hover Preview Image URL'}
                    </label>
                    <div className="flex gap-3 items-center">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-[#F7F5F2] shrink-0 border border-[#171717]/10">
                        <ImageWithFallback
                          src={cap.previewImage}
                          alt="preview"
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="url"
                        value={cap.previewImage}
                        onChange={(e) =>
                          handleUpdateCapability(index, 'previewImage', e.target.value)
                        }
                        className="flex-1 px-3.5 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717]"
                        placeholder="https://images.unsplash.com/..."
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
