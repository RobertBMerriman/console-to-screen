import type { FallbackProps } from 'react-error-boundary'

import { ResetEverythingConfirmation } from '@/components/ResetEverythingConfirmation'
import { Button } from '@/components/ui/button'
import { H2 } from '@/components/ui/typography/H2'
import { Muted } from '@/components/ui/typography/Muted'
import { resetSelections } from '@/stores/recovery'

export function ErrorFallback({ error }: FallbackProps) {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-6 p-4 text-center">
      <H2>Something went wrong</H2>

      <p className="max-w-prose">
        Something you had selected may be out of date with this version of the app. Clearing your
        selected consoles and screens is usually enough to fix it.
      </p>

      <div className="flex flex-col items-center gap-2">
        <Button onClick={resetSelections}>Reset selected consoles and screens</Button>
        <Muted>Your custom screens and settings are kept.</Muted>
      </div>

      <div className="flex flex-col items-center gap-2">
        <ResetEverythingConfirmation />
        <Muted>Deletes your custom screens and settings too.</Muted>
      </div>

      <Muted className="max-w-prose wrap-break-word">
        {error instanceof Error && error.message}
      </Muted>
    </div>
  )
}
