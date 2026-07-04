import { Plus } from 'lucide-react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useCustomScreenStore } from '@/stores/customScreenStore'
import { useForm } from '@tanstack/react-form'

function calcGcf(a: number, b: number) {
  a = Math.abs(a)
  b = Math.abs(b)
  if (a === 0 || b === 0) {
    return 1
  }

  while (b > 0) {
    let temp = b
    b = a % temp
    a = temp
  }
  return a
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Must be at least 1 character.')
    .max(32, 'Must be at most 256 characters.'),
  sizeInches: z.number().gte(1).lte(120),
  resX: z.int().gte(1).lte(15360),
  resY: z.int('whole number pls').gte(1).lte(15360),
})

export function AddCustomScreenDialog() {
  const addCustomScreen = useCustomScreenStore((state) => state.addCustomScreen)
  const selectTag = useCustomScreenStore((state) => state.selectTag)

  const [open, setOpen] = useState(false)

  const [ratioX, setRatioX] = useState(0)
  const [ratioY, setRatioY] = useState(0)

  const form = useForm({
    defaultValues: {
      name: '',
      sizeInches: 0,
      resX: 0,
      resY: 0,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value: customScreen }) => {
      const tag = uuidv4()
      addCustomScreen({
        tag,
        ...customScreen,
        ratioX,
        ratioY,
      })

      selectTag(tag)

      setOpen(false)

      form.reset()
      setRatioX(0)
      setRatioY(0)
    },
  })

  function calcAspectRatio() {
    const resX = Math.floor(form.getFieldValue('resX'))
    const resY = Math.floor(form.getFieldValue('resY'))

    const gcf = calcGcf(resX, resY)

    let ratioX = resX / gcf
    let ratioY = resY / gcf

    if (ratioX === 8 && ratioY === 5) {
      ratioX = 16
      ratioY = 10
    }

    setRatioX(ratioX)
    setRatioY(ratioY)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button variant={'secondary'} size={'icon-lg'} className="w-9!">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add a custom screen</DialogTitle>
        </DialogHeader>

        <form
          id="custom-screen-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Custom screen name"
                      autoComplete="off"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="sizeInches">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Screen size</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      step={0.1}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          isNaN(e.target.valueAsNumber) ? 0 : Math.abs(e.target.valueAsNumber),
                        )
                      }
                      aria-invalid={isInvalid}
                      placeholder="Diagonal screen size in inches"
                      autoComplete="off"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>

            <div className="flex flex-row gap-2">
              <form.Field
                name="resX"
                listeners={{ onChangeDebounceMs: 500, onChange: calcAspectRatio }}
              >
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Horizontal resolution</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        value={field.state.value || ''}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            isNaN(e.target.valueAsNumber)
                              ? 0
                              : Math.abs(Math.floor(e.target.valueAsNumber)),
                          )
                        }
                        aria-invalid={isInvalid}
                        placeholder="i.e. 1920"
                        autoComplete="off"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
              <form.Field
                name="resY"
                listeners={{ onChangeDebounceMs: 500, onChange: calcAspectRatio }}
              >
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Vertical resolution</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        value={field.state.value || ''}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            isNaN(e.target.valueAsNumber)
                              ? 0
                              : Math.abs(Math.floor(e.target.valueAsNumber)),
                          )
                        }
                        aria-invalid={isInvalid}
                        placeholder="i.e. 1080"
                        autoComplete="off"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            </div>

            <p>
              Aspect ratio:{' '}
              {!!ratioX && !!ratioY ? (
                <>
                  {ratioX}:{ratioY}
                </>
              ) : (
                <>- : -</>
              )}
            </p>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
