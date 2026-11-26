import React from 'react';
import { m } from 'framer-motion';

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  const alignment = align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl';

  return (
    <div className={`${alignment} ${className}`}>
      {eyebrow && (
        <div
          className={`flex items-center gap-3 mb-4 ${
            align === 'center' ? 'justify-center' : ''
          }`}
        >
          <m.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="h-[1px] w-8 bg-[#C6A15B]/75"
            aria-hidden="true"
          />
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#C6A15B] font-medium">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] font-medium leading-[1.12] tracking-[-0.01em] text-[#F4F0E8]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base sm:text-[1.05rem] leading-relaxed text-[#A7A29A] font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}
