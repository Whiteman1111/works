import React, { useEffect, useState } from 'react';
import { Language } from '../types';

interface CustomCursorProps {
  language: Language;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ language }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isProjectHover, setIsProjectHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only enable on precise pointer devices (desktop mouse), NOT touch screens
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(finePointerQuery.matches);

    const handlePointerQueryChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    finePointerQuery.addEventListener('change', handlePointerQueryChange);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isProject = Boolean(target.closest('#project-card') || target.closest('[id^="project-card-"]'));
        setIsProjectHover(isProject);

        const interactive = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A'
        );
        setIsPointer(interactive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      finePointerQuery.removeEventListener('change', handlePointerQueryChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isFinePointer || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
      aria-hidden="true"
    >
      {isProjectHover ? (
        <div className="px-3 py-1.5 rounded-full bg-[#171717] text-[#F7F5F2] text-[11px] font-semibold tracking-wider shadow-lg flex items-center justify-center animate-in zoom-in-90 duration-150">
          <span>{language === 'ar' ? 'عرض' : 'VIEW'}</span>
        </div>
      ) : (
        <div
          className={`rounded-full transition-all duration-200 ease-out border border-[#171717]/40 ${
            isPointer
              ? 'w-9 h-9 bg-[#B49A7A]/15 scale-110'
              : 'w-4 h-4 bg-[#171717]/20'
          }`}
        />
      )}
    </div>
  );
};
