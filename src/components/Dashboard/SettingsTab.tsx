import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Palette,
  Download,
  Upload,
  RotateCcw,
  Check,
  Copy,
  AlertTriangle,
  HardDrive,
  Sparkles,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
} from 'lucide-react';

const ACCENT_PRESETS = [
  { name: 'Sand Gold (Default)', color: '#B49A7A', desc: 'فاخر وهادئ' },
  { name: 'Desert Ochre', color: '#C28B58', desc: 'دافئ وأصيل' },
  { name: 'Sage Emerald', color: '#657962', desc: 'طبيعي ومريح' },
  { name: 'Terracotta Clay', color: '#B05D49', desc: 'حيوي وعصري' },
  { name: 'Deep Bronze', color: '#8C6D46', desc: 'عميق وتراثي' },
  { name: 'Minimalist Noir', color: '#262626', desc: 'أحادي ونقي' },
];

export const SettingsTab: React.FC = () => {
  const {
    accentColor,
    setAccentColor,
    resetToDefaults,
    exportJSON,
    importJSON,
    lastSaved,
    language,
    ownerPasscode,
    setOwnerPasscode,
  } = usePortfolio();

  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    msg: string;
  }>({ type: 'idle', msg: '' });

  // Passcode editing state
  const [newPasscode, setNewPasscode] = useState(ownerPasscode || '1234');
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcodeSaved, setPasscodeSaved] = useState(false);

  const handleSavePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode.trim()) return;
    setOwnerPasscode(newPasscode.trim());
    setPasscodeSaved(true);
    setTimeout(() => setPasscodeSaved(false), 2500);
  };

  const handleCopyJSON = () => {
    const json = exportJSON();
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownloadJSON = () => {
    const json = exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-content-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importJSON(content);
        if (res.success) {
          setImportStatus({ type: 'success', msg: res.message });
        } else {
          setImportStatus({ type: 'error', msg: res.message });
        }
      }
    };
    reader.readAsText(file);
  };

  const handleManualImport = () => {
    if (!importText.trim()) return;
    const res = importJSON(importText);
    if (res.success) {
      setImportStatus({ type: 'success', msg: res.message });
      setImportText('');
    } else {
      setImportStatus({ type: 'error', msg: res.message });
    }
  };

  const handleReset = () => {
    const confirmMsg =
      language === 'ar'
        ? 'تحذير: هل أنتِ متأكدة من استعادة البيانات النموذجية الافتراضية؟ سيتم مسح أي تعديلات غير محفوظة خارجياً.'
        : 'Warning: Are you sure you want to reset all data back to the default showcase state?';
    if (window.confirm(confirmMsg)) {
      resetToDefaults();
      setImportStatus({
        type: 'success',
        msg: language === 'ar' ? 'تمت استعادة البيانات النموذجية بنجاح' : 'Reset to defaults successful',
      });
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* 1. Brand Accent Palette */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#171717]/8">
          <Palette className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'لون التمييز الفاخر (Accent Color)' : 'Luxury Accent Palette'}
          </h3>
        </div>

        <p className="text-xs text-[#77736F]">
          {language === 'ar'
            ? 'يؤثر لون التمييز فوراً على الأزرار والشعارات والخطوط العريضة والروابط في جميع أنحاء الموقع.'
            : 'Controls key accents, borders, interactive highlights, and monograms across the entire portfolio.'}
        </p>

        {/* Swatches Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {ACCENT_PRESETS.map((preset) => {
            const isSelected = accentColor.toLowerCase() === preset.color.toLowerCase();

            return (
              <button
                key={preset.color}
                type="button"
                onClick={() => setAccentColor(preset.color)}
                className={`p-3 rounded-2xl border text-start flex flex-col items-center sm:items-start gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#171717] bg-[#EFECE7] shadow-sm'
                    : 'border-[#171717]/8 bg-[#F7F5F2] hover:bg-[#EFECE7]/50'
                }`}
              >
                <span
                  className="w-8 h-8 rounded-full shadow-inner flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: preset.color }}
                >
                  {isSelected && <Check className="w-4 h-4" />}
                </span>
                <div>
                  <span className="block text-xs font-semibold text-[#171717]">
                    {preset.name}
                  </span>
                  <span className="block text-[10px] text-[#77736F]">
                    {preset.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Hex Input */}
        <div className="flex items-center gap-3 pt-2">
          <label className="text-xs font-medium text-[#77736F]">
            {language === 'ar' ? 'أو أدخلي كود اللون يدوياً (Hex):' : 'Or enter custom hex code:'}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-8 h-8 rounded-lg border border-[#171717]/10 cursor-pointer"
            />
            <input
              type="text"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-28 px-3 py-1.5 rounded-lg bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717]"
              placeholder="#B49A7A"
            />
          </div>
        </div>
      </section>

      {/* 2. Backup & Export */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#171717]/8">
          <HardDrive className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'النسخ الاحتياطي وحفظ البيانات' : 'Data Backup & Export'}
          </h3>
        </div>

        <div className="p-5 rounded-2xl bg-[#EFECE7]/60 border border-[#171717]/8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold text-[#171717]">
                {language === 'ar' ? 'تصدير كامل تفاصيل الموقع' : 'Export Full Site Configuration'}
              </h4>
              <p className="text-xs text-[#77736F]">
                {language === 'ar'
                  ? 'احفظي ملف JSON يحتوي على جميع بياناتك، مشاريعك، روابطك وسيرتك الذاتية في ملف آمن.'
                  : 'Download or copy a portable JSON file containing your real details, case studies, and bio.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyJSON}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F7F5F2] hover:bg-[#171717] hover:text-[#F7F5F2] text-xs font-medium text-[#171717] transition-colors cursor-pointer border border-[#171717]/8"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'نسخ JSON' : 'Copy JSON')}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadJSON}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-xs font-semibold transition-colors cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تحميل كملف' : 'Download File'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Import Configuration */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#171717]/8">
          <Upload className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'استيراد بيانات الموقع' : 'Import Configuration'}
          </h3>
        </div>

        {importStatus.type !== 'idle' && (
          <div
            className={`p-3 rounded-xl text-xs font-medium ${
              importStatus.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {importStatus.msg}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'رفع ملف نسخة احتياطية (.json)' : 'Upload Backup File (.json)'}
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="block w-full text-xs text-[#77736F] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#171717] file:text-[#F7F5F2] hover:file:bg-[#B49A7A] file:cursor-pointer"
            />
          </div>

          <div className="pt-2">
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'أو لصق نص كود JSON هنا:' : 'Or paste JSON code directly:'}
            </label>
            <textarea
              rows={3}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder='{ "siteConfig": { ... }, "projects": [ ... ] }'
              className="w-full px-3 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717]"
              dir="ltr"
            />
            <button
              type="button"
              onClick={handleManualImport}
              disabled={!importText.trim()}
              className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#B49A7A] disabled:opacity-30 text-[#F7F5F2] text-xs font-semibold transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'استيراد الآن' : 'Apply Import'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Passcode Security & Access Control */}
      <section className="space-y-4 pt-4 border-t border-[#171717]/8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'حماية لوحة التحكم برمز سري' : 'Dashboard Passcode Security'}
          </h3>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#171717]/8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-[#171717]">
                {language === 'ar' ? 'رمز دخول المالك (Passcode)' : 'Owner Security Passcode'}
              </h4>
              <p className="text-xs text-[#77736F] mt-0.5">
                {language === 'ar'
                  ? 'يمنع الزوار العاديين من فتح لوحة التحكم وتعديل بياناتك. الرمز الافتراضي: 1234'
                  : 'Restricts editing access to you only. Default factory passcode: 1234'}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200 self-start sm:self-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {language === 'ar' ? 'الحماية مفعّلة' : 'Protection Active'}
            </span>
          </div>

          <form onSubmit={handleSavePasscode} className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <KeyRound className="w-4 h-4 text-[#77736F] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPasscode ? 'text' : 'password'}
                value={newPasscode}
                onChange={(e) => setNewPasscode(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل الرمز السري الجديد...' : 'Enter new passcode...'}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#171717]/15 text-sm font-mono text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77736F] hover:text-[#171717] p-1 cursor-pointer"
                title={showPasscode ? 'Hide' : 'Show'}
              >
                {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-xs font-semibold transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              {passcodeSaved ? <Check className="w-3.5 h-3.5 text-green-400" /> : <KeyRound className="w-3.5 h-3.5" />}
              <span>
                {passcodeSaved
                  ? language === 'ar'
                    ? 'تم تحديث الرمز!'
                    : 'Passcode Updated!'
                  : language === 'ar'
                  ? 'حفظ الرمز السري'
                  : 'Save Passcode'}
              </span>
            </button>
          </form>
        </div>
      </section>

      {/* 5. Reset to Showcase Defaults */}
      <section className="space-y-4 pt-4 border-t border-[#171717]/8">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'استعادة البيانات النموذجية' : 'Showcase Data Reset'}
          </h3>
        </div>

        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-[#171717]">
              {language === 'ar' ? 'إعادة ضبط كل البيانات للافتراضية' : 'Reset Everything to Default'}
            </h4>
            <p className="text-xs text-[#77736F] mt-0.5">
              {language === 'ar'
                ? 'استعادة النصوص والمشاريع الأصلية لنوران طارق لمراجعة النموذج الأولي.'
                : 'Restores the original designer sample content and portfolio case studies.'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'استعادة الافتراضي' : 'Reset to Defaults'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
