import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | 'auto';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'auto',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const aspectClasses = {
    video: 'aspect-[16/10]',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    wide: 'aspect-[21/9]',
    auto: '',
  }[aspectRatio];

  return (
    <div
      className={`relative overflow-hidden bg-[#EFECE7] transition-colors ${aspectClasses} ${containerClassName}`}
    >
      {/* Subtle pulsing skeleton until loaded */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-[#EFECE7] animate-pulse" />
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[#77736F] bg-[#EFECE7]">
          <span className="text-xs uppercase tracking-widest text-[#B49A7A] font-medium mb-1">
            Visual Archive
          </span>
          <p className="text-xs text-[#77736F] max-w-[200px] truncate">{alt}</p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
