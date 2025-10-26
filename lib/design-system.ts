/**
 * Design System Utilities
 * Helper functions and utilities for working with the design system
 */

import { designTokens, type Colors } from './design-tokens';
import { cn } from './utils';

// Theme utilities
export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

/**
 * Get CSS custom property value
 */
export function getCSSCustomProperty(property: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
}

/**
 * Set CSS custom property value
 */
export function setCSSCustomProperty(property: string, value: string): void {
  if (typeof window === 'undefined') return;
  document.documentElement.style.setProperty(property, value);
}

/**
 * Get current theme from document
 */
export function getCurrentTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  
  const dataTheme = document.documentElement.getAttribute('data-theme');
  if (dataTheme === 'dark' || dataTheme === 'light') {
    return dataTheme;
  }
  
  // Check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Apply theme to document
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  
  if (theme === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers high contrast
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Color utility functions
 */
export const colorUtils = {
  /**
   * Get RGB values from CSS custom property
   */
  getRGB(colorVar: string): string {
    return getCSSCustomProperty(colorVar);
  },
  
  /**
   * Create RGB color with alpha
   */
  withAlpha(colorVar: string, alpha: number): string {
    const rgb = getCSSCustomProperty(colorVar);
    return `rgb(${rgb} / ${alpha})`;
  },
  
  /**
   * Get semantic color based on type
   */
  semantic: {
    success: 'rgb(var(--color-success-600))',
    error: 'rgb(var(--color-error-600))',
    warning: 'rgb(var(--color-warning-600))',
    info: 'rgb(var(--color-info-600))',
  },
};

/**
 * Typography utility functions
 */
export const typographyUtils = {
  /**
   * Get font size classes
   */
  fontSize: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  },
  
  /**
   * Get font weight classes
   */
  fontWeight: {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  },
};

/**
 * Spacing utility functions
 */
export const spacingUtils = {
  /**
   * Get spacing classes
   */
  padding: {
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  },
  
  margin: {
    xs: 'm-1',
    sm: 'm-2',
    md: 'm-4',
    lg: 'm-6',
    xl: 'm-8',
  },
  
  gap: {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  },
};

/**
 * Component variant utilities
 */
export const componentVariants = {
  button: {
    size: {
      sm: 'h-button-sm px-3 text-sm',
      md: 'h-button-md px-4 text-base',
      lg: 'h-button-lg px-6 text-lg',
    },
    
    variant: {
      primary: 'bg-button-primary hover:bg-button-primary-hover text-white',
      secondary: 'bg-button-secondary hover:bg-button-secondary-hover text-text-primary border border-border',
      outline: 'border border-border hover:bg-hover text-text-primary',
      ghost: 'hover:bg-hover text-text-primary',
      destructive: 'bg-error hover:bg-error-700 text-white',
    },
  },
  
  input: {
    size: {
      sm: 'h-input-sm px-3 text-sm',
      md: 'h-input-md px-3 text-base',
      lg: 'h-input-lg px-4 text-lg',
    },
    
    variant: {
      default: 'bg-input-bg border border-input-border focus:border-input-focus focus:ring-2 focus:ring-focus-ring',
      error: 'bg-input-bg border border-error focus:border-error focus:ring-2 focus:ring-error-200',
    },
  },
  
  card: {
    variant: {
      default: 'bg-surface border border-border rounded-lg shadow-sm',
      elevated: 'bg-surface border border-border rounded-lg shadow-md',
      outlined: 'bg-surface border-2 border-border rounded-lg',
    },
  },
};

/**
 * Animation utilities
 */
export const animationUtils = {
  /**
   * Get transition classes
   */
  transition: {
    fast: 'transition-all duration-150 ease-out',
    normal: 'transition-all duration-200 ease-out',
    slow: 'transition-all duration-300 ease-out',
  },
  
  /**
   * Get animation classes with reduced motion support
   */
  animate: {
    fadeIn: 'animate-in fade-in duration-200',
    fadeOut: 'animate-out fade-out duration-200',
    slideIn: 'animate-in slide-in-from-right duration-300',
    slideOut: 'animate-out slide-out-to-right duration-300',
    scaleIn: 'animate-in zoom-in-95 duration-200',
    scaleOut: 'animate-out zoom-out-95 duration-200',
  },
};

/**
 * Responsive utilities
 */
export const responsiveUtils = {
  /**
   * Get responsive classes for different breakpoints
   */
  breakpoints: {
    sm: 'sm:',
    md: 'md:',
    lg: 'lg:',
    xl: 'xl:',
    '2xl': '2xl:',
  },
  
  /**
   * Common responsive patterns
   */
  grid: {
    responsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    calendar: 'grid grid-cols-7 gap-1 sm:gap-2 lg:gap-3',
  },
  
  text: {
    responsive: 'text-sm sm:text-base lg:text-lg',
    heading: 'text-lg sm:text-xl lg:text-2xl xl:text-3xl',
  },
};

/**
 * Accessibility utilities
 */
export const a11yUtils = {
  /**
   * Screen reader only classes
   */
  srOnly: 'sr-only',
  
  /**
   * Focus visible classes
   */
  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
  
  /**
   * High contrast support
   */
  highContrast: 'contrast-more:border-2 contrast-more:border-current',
  
  /**
   * Common ARIA attributes helper
   */
  aria: {
    button: (label: string) => ({
      'aria-label': label,
      role: 'button',
      tabIndex: 0,
    }),
    
    modal: (labelId: string, descriptionId?: string) => ({
      role: 'dialog',
      'aria-modal': true,
      'aria-labelledby': labelId,
      ...(descriptionId && { 'aria-describedby': descriptionId }),
    }),
    
    toast: (type: 'success' | 'error' | 'warning' | 'info') => ({
      role: 'alert',
      'aria-live': type === 'error' ? 'assertive' : 'polite',
    }),
  },
};

/**
 * Create component class names using design system utilities
 */
export function createComponentClasses(
  base: string,
  variants?: Record<string, string | undefined>,
  className?: string
): string {
  const variantClasses = variants ? Object.values(variants).filter(Boolean).join(' ') : '';
  return cn(base, variantClasses, className);
}

/**
 * Export design tokens for direct access
 */
export { designTokens };

/**
 * Common class combinations for quick use
 */
export const commonClasses = {
  // Layout
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexCol: 'flex flex-col',
  
  // Text
  textCenter: 'text-center',
  textEllipsis: 'truncate',
  
  // Borders
  borderDefault: 'border border-border',
  borderRounded: 'border border-border rounded-lg',
  
  // Shadows
  shadowCard: 'shadow-sm hover:shadow-md transition-shadow',
  shadowModal: 'shadow-xl',
  
  // Interactive
  interactive: 'cursor-pointer transition-colors hover:bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
};