import type { HTMLProps } from 'react'

import { cn } from '@/lib/utils'

interface Props extends HTMLProps<HTMLHeadingElement> {}
export function H3({ children, className, ...rest }: Props) {
  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...rest}>
      {children}
    </h3>
  )
}
