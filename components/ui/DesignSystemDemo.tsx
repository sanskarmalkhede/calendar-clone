/**
 * Design System Demo Component
 * Demonstrates the usage of design tokens and utilities
 */

import React from 'react';
import { 
  colorUtils, 
  typographyUtils, 
  spacingUtils, 
  componentVariants, 
  commonClasses,
  createComponentClasses 
} from '@/lib/design-system';
import { cn } from '@/lib/utils';

export function DesignSystemDemo() {
  return (
    <div className="p-8 space-y-8 bg-background text-foreground">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-text-primary">Design System Demo</h1>
        <p className="text-text-secondary">
          This component demonstrates the design system tokens and utilities in action.
        </p>
      </div>

      {/* Color Palette */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-text-secondary">Primary</h3>
            <div className="space-y-1">
              <div className="h-12 bg-primary-500 rounded-md flex items-center justify-center text-white text-sm">
                500
              </div>
              <div className="h-8 bg-primary-600 rounded-md flex items-center justify-center text-white text-xs">
                600
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-text-secondary">Success</h3>
            <div className="space-y-1">
              <div className="h-12 bg-success-500 rounded-md flex items-center justify-center text-white text-sm">
                500
              </div>
              <div className="h-8 bg-success-600 rounded-md flex items-center justify-center text-white text-xs">
                600
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-text-secondary">Error</h3>
            <div className="space-y-1">
              <div className="h-12 bg-error-500 rounded-md flex items-center justify-center text-white text-sm">
                500
              </div>
              <div className="h-8 bg-error-600 rounded-md flex items-center justify-center text-white text-xs">
                600
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-text-secondary">Warning</h3>
            <div className="space-y-1">
              <div className="h-12 bg-warning-500 rounded-md flex items-center justify-center text-white text-sm">
                500
              </div>
              <div className="h-8 bg-warning-600 rounded-md flex items-center justify-center text-white text-xs">
                600
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Typography</h2>
        <div className="space-y-3">
          <div className="text-4xl font-bold text-text-primary">Heading 1 - 4xl Bold</div>
          <div className="text-3xl font-semibold text-text-primary">Heading 2 - 3xl Semibold</div>
          <div className="text-2xl font-semibold text-text-primary">Heading 3 - 2xl Semibold</div>
          <div className="text-xl font-medium text-text-primary">Heading 4 - xl Medium</div>
          <div className="text-base text-text-primary">Body text - base Regular</div>
          <div className="text-sm text-text-secondary">Small text - sm Regular</div>
          <div className="text-xs text-text-muted">Caption text - xs Regular</div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button 
            className={cn(
              'rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
              componentVariants.button.size.md,
              componentVariants.button.variant.primary
            )}
          >
            Primary Button
          </button>
          
          <button 
            className={cn(
              'rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
              componentVariants.button.size.md,
              componentVariants.button.variant.secondary
            )}
          >
            Secondary Button
          </button>
          
          <button 
            className={cn(
              'rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
              componentVariants.button.size.md,
              componentVariants.button.variant.outline
            )}
          >
            Outline Button
          </button>
          
          <button 
            className={cn(
              'rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
              componentVariants.button.size.md,
              componentVariants.button.variant.destructive
            )}
          >
            Destructive Button
          </button>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button 
            className={cn(
              'rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
              componentVariants.button.size.sm,
              componentVariants.button.variant.primary
            )}
          >
            Small
          </button>
          
          <button 
            className={cn(
              'rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
              componentVariants.button.size.lg,
              componentVariants.button.variant.primary
            )}
          >
            Large Button
          </button>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={cn(componentVariants.card.variant.default, 'p-6')}>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Default Card</h3>
            <p className="text-text-secondary">This is a default card with subtle shadow.</p>
          </div>
          
          <div className={cn(componentVariants.card.variant.elevated, 'p-6')}>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Elevated Card</h3>
            <p className="text-text-secondary">This card has more prominent shadow.</p>
          </div>
          
          <div className={cn(componentVariants.card.variant.outlined, 'p-6')}>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Outlined Card</h3>
            <p className="text-text-secondary">This card uses a thicker border instead of shadow.</p>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Form Inputs</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Default Input
            </label>
            <input
              type="text"
              placeholder="Enter text..."
              className={cn(
                'w-full rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
                componentVariants.input.size.md,
                componentVariants.input.variant.default
              )}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Error State Input
            </label>
            <input
              type="text"
              placeholder="This has an error..."
              className={cn(
                'w-full rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
                componentVariants.input.size.md,
                componentVariants.input.variant.error
              )}
            />
            <p className="text-sm text-error mt-1">This field has an error.</p>
          </div>
        </div>
      </section>

      {/* Spacing Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Spacing System</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary-500 rounded"></div>
            <span className="text-sm text-text-secondary">Gap 2 (0.5rem)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-primary-500 rounded"></div>
            <span className="text-sm text-text-secondary">Gap 4 (1rem)</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-4 h-4 bg-primary-500 rounded"></div>
            <span className="text-sm text-text-secondary">Gap 6 (1.5rem)</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="w-4 h-4 bg-primary-500 rounded"></div>
            <span className="text-sm text-text-secondary">Gap 8 (2rem)</span>
          </div>
        </div>
      </section>

      {/* Theme Toggle Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Theme Support</h2>
        <div className="p-4 bg-surface border border-border rounded-lg">
          <p className="text-text-secondary mb-4">
            The design system supports both light and dark themes. Colors automatically adapt based on the current theme.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-background border border-border rounded"></div>
              <span className="text-sm">Background</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-surface border border-border rounded"></div>
              <span className="text-sm">Surface</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary border border-border rounded"></div>
              <span className="text-sm">Primary</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}