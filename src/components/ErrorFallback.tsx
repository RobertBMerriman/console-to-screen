import type { FallbackProps } from 'react-error-boundary'

import { Button } from '@/components/ui/button'
import { H2 } from '@/components/ui/typography/H2'
import { Muted } from '@/components/ui/typography/Muted'
import { clearStoredState } from '@/stores/storageKeys'

export function ErrorFallback({ error }: FallbackProps) {
  function reset() {
    clearStoredState()
    location.reload()
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <H2>Something went wrong</H2>

      <p className="max-w-prose">
        Your saved consoles, screens and settings may be out of date with this version of the app.
        Resetting them clears everything you have selected and reloads the page.
      </p>

      <Button onClick={reset}>Reset saved settings</Button>

      <Muted className="max-w-prose wrap-break-word">{error instanceof Error && error.message}</Muted>
    </div>
  )
}
