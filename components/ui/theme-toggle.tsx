'use client';

import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
}

export function ThemeToggle({ className, showLabels = false }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ] as const;

  return (
    <div className={cn("flex items-center space-x-1 p-1 bg-surface-secondary rounded-lg", className)}>
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors focus-ring",
            {
              "bg-surface text-primary shadow-sm": theme === value,
              "text-secondary hover:text-primary hover-bg": theme !== value,
            }
          )}
          aria-label={`Switch to ${label.toLowerCase()} theme`}
          title={`Switch to ${label.toLowerCase()} theme`}
        >
          <Icon className="w-4 h-4" />
          {showLabels && <span>{label}</span>}
        </button>
      ))}
    </div>
  );
}

export function ThemeToggleButton({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'light') return Sun;
    if (theme === 'dark') return Moon;
    return Monitor;
  };

  const getLabel = () => {
    if (theme === 'light') return 'Switch to dark mode';
    if (theme === 'dark') return 'Switch to system theme';
    return 'Switch to light mode';
  };

  const Icon = getIcon();

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "p-2 rounded-md text-secondary hover:text-primary hover-bg focus-ring transition-colors",
        className
      )}
      aria-label={getLabel()}
      title={getLabel()}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}