import type { HTMLProps } from 'react'

import { cn } from '@/lib/utils'

interface Props extends HTMLProps<HTMLHeadingElement> {}
export function H1({ children, className, ...rest }: Props) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className
      )}
      {...rest}
    >
      {children}
    </h1>
  )
}
