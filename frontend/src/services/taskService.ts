// src/services/taskService.ts
import { apiClient } from './apiClient'
import type { ITask } from '../types/task'

export interface ICreateTaskPayload {
  title: string
  description?: string
}

export interface IUpdateTaskPayload {
  title?: string
  description?: string
  is_completed?: ITask['is_completed']
}

export const taskService = {
  getTasks(): Promise<ITask[]> {
    return apiClient.get<ITask[]>('/tasks')
  },

  getTask(id: number): Promise<ITask> {
    return apiClient.get<ITask>(`/tasks/${id}`)
  },

  createTask(payload: ICreateTaskPayload): Promise<ITask> {
    return apiClient.post<ITask>('/tasks', payload)
  },

  updateTask(id: number, payload: IUpdateTaskPayload): Promise<ITask> {
    // у тебя PUT /tasks/{id}/edit
    return apiClient.put<ITask>(`/tasks/${id}/edit`, payload)
  },

  deleteTask(id: number): Promise<{ success: boolean }> {
    // DELETE /tasks/{id}/delete
    return apiClient.delete<{ success: boolean }>(`/tasks/${id}/delete`)
  },
}
