import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLProps } from 'react'

import { cn } from '@/lib/utils'

const variants = cva('text-muted-foreground', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

interface Props extends Omit<HTMLProps<HTMLParagraphElement>, 'size'> {}
export function Muted({
  size,
  children,
  className,
  ...rest
}: Props & VariantProps<typeof variants>) {
  return (
    <p className={cn(variants({ size }), className)} {...rest}>
      {children}
    </p>
  )
}
