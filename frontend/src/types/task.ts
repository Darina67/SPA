// src/types/task.ts
export interface ITask {
  id: number
  title: string
  description?: string
  is_completed: 0 | 1
  createdAt: string
  updatedAt: string
}
