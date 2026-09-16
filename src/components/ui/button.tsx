import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'link' | 'outline' | 'ghost'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          variant === 'default' &&
            'bg-[#1a2090] text-white px-6 py-3 hover:bg-[#3040cc]',
          variant === 'link' &&
            'text-[#1a2090] underline-offset-4 hover:underline px-4 py-2',
          variant === 'outline' &&
            'border border-[#1a2090]/20 bg-white text-[#1a2090] hover:bg-[#f8f7f4] px-6 py-3',
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
