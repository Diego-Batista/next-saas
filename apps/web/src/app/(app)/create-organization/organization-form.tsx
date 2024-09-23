'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useFormState } from '@/hooks/use-form-state'

import {
  createOrganizationAction,
  OrganizationSchema,
  updateOrganizationAction,
} from './actions'

interface OrganizationformProps {
  isUpdating?: boolean;
  initialData?: OrganizationSchema;
}

export function OrganizationForm({
  isUpdating = false,
  initialData,
}: OrganizationformProps) {
  const formAction = isUpdating
    ? updateOrganizationAction
    : createOrganizationAction
  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(formAction)
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save organization failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <label htmlFor="name">Organization name</label>
        <Input name="name" id="name" defaultValue={initialData?.name} />

        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors?.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="domain">E-mail domain</label>
        <Input
          name="domain"
          type="text"
          id="domain"
          inputMode="url"
          placeholder="Example.com"
          defaultValue={initialData?.domain ?? undefined}
        />

        {errors?.domain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors?.domain[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="items-top flex space-x-2">
          <Checkbox
            name="shouldAttachUsersByDomain"
            id="shouldAttachUsersByDomain"
            defaultChecked={initialData?.shouldAttachUsersByDomain}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="shouldAttachUsersByDomain"
              className="space-y-1 text-sm font-medium leading-none">
              Auto-join new members
            </label>
            <p className="tex-sm text-muted-foreground">
              This will automatically invite all members with same e-mail domain
              to this organization.
            </p>
          </div>
        </div>
      </div>

      {errors?.shouldAttachUsersByDomain && (
        <p className="text-xs font-medium text-red-500 dark:text-red-400">
          {errors?.shouldAttachUsersByDomain[0]}
        </p>
      )}

      <Button type="submit" className="w-full">
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save Organization'
        )}
      </Button>
    </form>
  )
}
