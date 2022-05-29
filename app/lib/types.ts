import type { Todo as TodoProps } from '~/lib/xata.codegen'
import type { XataRecord } from '@xata.io/client'

export type TodoRecord = TodoProps & XataRecord['xata'] & { id: string }
export type TodoState = 'ongoing' | 'done'
