'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          // Base
          'relative inline-flex items-center justify-center font-semibold tracking-wide',
          'rounded-sm transition-all duration-300 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'overflow-hidden group',

          // Variants
          variant === 'primary' && [
            'border border-amber-500/70 bg-amber-500/10 text-amber-300',
            'hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-200',
            'hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]',
            'active:scale-[0.98]',
          ],

          variant === 'outline' && [
            'border border-white/20 bg-transparent text-white',
            'hover:border-white/50 hover:bg-white/5',
          ],

          variant === 'ghost' && [
            'border-none bg-transparent text-white/70',
            'hover:text-white hover:bg-white/5',
          ],

          // Sizes
          size === 'sm' && 'px-5 py-2 text-sm gap-2',
          size === 'md' && 'px-7 py-3 text-sm gap-2.5',
          size === 'lg' && 'px-10 py-4 text-base gap-3',

          className
        )}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent
                     group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
        />
        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'
