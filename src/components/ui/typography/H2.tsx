import type { HTMLProps } from 'react'

import { cn } from '@/lib/utils'

interface Props extends HTMLProps<HTMLHeadingElement> {}
export function H2({ children, className, ...rest }: Props) {
  return (
    <h2 className={cn('scroll-m-20 text-3xl font-semibold tracking-tight', className)} {...rest}>
      {children}
    </h2>
  )
}
