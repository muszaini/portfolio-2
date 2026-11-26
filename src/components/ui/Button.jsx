import React from 'react';

const VARIANT_CLASSES = {
  primary:
    'bg-[#C6A15B] text-[#101010] border border-[#C6A15B] hover:bg-[#D7B878] hover:border-[#D7B878] font-medium',
  secondary:
    'bg-transparent text-[#F4F0E8] border border-[#C6A15B]/45 hover:border-[#C6A15B] hover:bg-[#C6A15B]/10 font-normal',
  ghost:
    'bg-[#191919] text-[#F4F0E8] border border-[#F4F0E8]/12 hover:border-[#C6A15B]/55 hover:text-[#C6A15B] font-normal',
};

const SIZE_CLASSES = {
  sm: 'px-4 py-2.5 text-xs tracking-[0.14em]',
  md: 'px-6 py-3.5 text-xs tracking-[0.16em]',
  lg: 'px-7 py-4 text-xs tracking-[0.18em]',
};

export function Button({
  as = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const Component = as;
  const classes = [
    'inline-flex items-center justify-center gap-2.5 uppercase transition-all duration-300 active:scale-[0.985] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-[2px]',
    VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary,
    SIZE_CLASSES[size] || SIZE_CLASSES.md,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
