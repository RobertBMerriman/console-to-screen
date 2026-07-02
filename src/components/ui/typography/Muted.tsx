import type { HTMLProps } from 'react'

import { cn } from '@/lib/utils'

interface Props extends HTMLProps<HTMLParagraphElement> {}
export function Muted({ children, className, ...rest }: Props) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)} {...rest}>
      {children}
    </p>
  )
}
