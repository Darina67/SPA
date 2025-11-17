// src/types/task.ts
export type TTaskStatus = 'completed' | 'uncompleted'

export interface ITask {
  id: number
  title: string
  description?: string
  status: TTaskStatus
  createdAt: string
  updatedAt: string
}
