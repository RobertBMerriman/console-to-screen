import type { HTMLProps } from 'react'

import { cn } from '@/lib/utils'

interface Props extends HTMLProps<HTMLHeadingElement> {}
export function H4({ children, className, ...rest }: Props) {
  return (
    <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...rest}>
      {children}
    </h4>
  )
}
