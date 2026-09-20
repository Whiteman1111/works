import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, X, AlertCircle, Sparkles } from 'lucide-react';

export const PasscodeModal: React.FC = () => {
  const {
    isPasscodeModalOpen,
    setIsPasscodeModalOpen,
    unlockWithPasscode,
    language,
    ownerPasscode,
  } = usePortfolio();

  const [inputCode, setInputCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPasscodeModalOpen) {
      setInputCode('');
      setErrorMessage(null);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isPasscodeModalOpen]);

  if (!isPasscodeModalOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputCode.trim()) {
      setErrorMessage(language === 'ar' ? 'يرجى إدخال الرمز' : 'Please enter the code');
      return;
    }

    const success = unlockWithPasscode(inputCode);
    if (!success) {
      setIsShaking(true);
      setErrorMessage(
        language === 'ar'
          ? 'رمز الأمان غير صحيح! الرمز الافتراضي: 1234'
          : 'Incorrect passcode! Default PIN is: 1234'
      );
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleDigitClick = (digit: string) => {
    setInputCode((prev) => prev + digit);
    setErrorMessage(null);
  };

  const handleBackspace = () => {
    setInputCode((prev) => prev.slice(0, -1));
    setErrorMessage(null);
  };

  const handleClear = () => {
    setInputCode('');
    setErrorMessage(null);
  };

  return (
    <div
      id="owner-passcode-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171717]/85 backdrop-blur-md animate-fadeIn"
      onClick={() => setIsPasscodeModalOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full max-w-md bg-[#1C1B1A] border border-[#B49A7A]/30 rounded-3xl p-6 sm:p-8 text-[#F7F5F2] shadow-2xl transition-all duration-200 ${
          isShaking ? 'animate-shake' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setIsPasscodeModalOpen(false)}
          className="absolute top-5 end-5 w-8 h-8 rounded-full bg-[#2B2927] hover:bg-[#383533] text-[#A6A09B] hover:text-[#F7F5F2] flex items-center justify-center transition-colors cursor-pointer"
          title={language === 'ar' ? 'إغلاق' : 'Close'}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#171717] to-[#2B2927] border border-[#B49A7A]/40 flex items-center justify-center shadow-lg shadow-[#B49A7A]/10">
              <Lock className="w-7 h-7 text-[#B49A7A]" />
            </div>
            <div className="absolute -bottom-1 -end-1 w-6 h-6 rounded-full bg-[#B49A7A] text-[#171717] flex items-center justify-center shadow-sm">
              <KeyRound className="w-3.5 h-3.5" />
            </div>
          </div>

          <span className="text-[11px] uppercase tracking-widest text-[#B49A7A] font-medium mb-1">
            {language === 'ar' ? 'حماية وتحكم مالك الموقع' : 'Owner Security Area'}
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F7F5F2] tracking-tight">
            {language === 'ar' ? 'رمز الدخول إلى لوحة التحكم' : 'Enter Studio Passcode'}
          </h2>
          <p className="text-xs sm:text-sm text-[#A6A09B] mt-1.5 max-w-xs leading-relaxed">
            {language === 'ar'
              ? 'لوحة التعديل مقفلة ومخصصة لمالك الموقع فقط. أدخل رمز الأمان للمتابعة.'
              : 'The studio editor is locked. Enter your owner security passcode to unlock and edit content.'}
          </p>
        </div>

        {/* Passcode Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type={showCode ? 'text' : 'password'}
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                setErrorMessage(null);
              }}
              placeholder={language === 'ar' ? 'أدخل رمز الأمان...' : 'Enter passcode...'}
              className="w-full text-center tracking-widest text-xl font-mono py-3.5 px-12 rounded-xl bg-[#282624] border border-[#B49A7A]/30 text-[#F7F5F2] placeholder-[#6E6964] focus:outline-none focus:border-[#B49A7A] focus:ring-2 focus:ring-[#B49A7A]/20 transition-all"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className="absolute end-3.5 top-1/2 -translate-y-1/2 text-[#A6A09B] hover:text-[#F7F5F2] transition-colors p-1"
              title={showCode ? 'إخفاء' : 'إظهار'}
            >
              {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="flex items-center justify-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-800/40 py-2 px-3 rounded-lg">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Quick Keypad for Touch / Fast Entry */}
          <div className="grid grid-cols-3 gap-2 pt-1 pb-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleDigitClick(digit)}
                className="py-2.5 rounded-xl bg-[#252321] hover:bg-[#32302D] active:bg-[#B49A7A] active:text-[#171717] text-sm font-semibold text-[#F7F5F2] border border-[#F7F5F2]/5 transition-colors cursor-pointer"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={handleClear}
              className="py-2.5 rounded-xl bg-[#252321] hover:bg-[#32302D] text-xs font-medium text-[#A6A09B] hover:text-[#F7F5F2] border border-[#F7F5F2]/5 transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'مسح' : 'Clear'}
            </button>
            <button
              type="button"
              onClick={() => handleDigitClick('0')}
              className="py-2.5 rounded-xl bg-[#252321] hover:bg-[#32302D] active:bg-[#B49A7A] active:text-[#171717] text-sm font-semibold text-[#F7F5F2] border border-[#F7F5F2]/5 transition-colors cursor-pointer"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="py-2.5 rounded-xl bg-[#252321] hover:bg-[#32302D] text-xs font-medium text-[#A6A09B] hover:text-[#F7F5F2] border border-[#F7F5F2]/5 transition-colors cursor-pointer"
            >
              ⌫
            </button>
          </div>

          {/* Action button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-[#B49A7A] hover:bg-[#C5AB8C] text-[#171717] font-semibold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'ar' ? 'فتح لوحة التحكم' : 'Unlock Studio'}</span>
          </button>
        </form>

        {/* Helper Hint */}
        <div className="mt-5 pt-4 border-t border-[#2B2927] flex items-center justify-between text-[11px] text-[#7E7873]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#B49A7A]" />
            <span>{language === 'ar' ? 'الرمز الافتراضي:' : 'Default Passcode:'}</span>
            <code className="bg-[#2B2927] px-1.5 py-0.5 rounded text-[#B49A7A] font-mono font-bold">
              1234
            </code>
          </span>
          <span>{language === 'ar' ? 'قابل للتغيير من الإعدادات' : 'Editable in Settings'}</span>
        </div>
      </div>
    </div>
  );
};
