// src/composables/useTasks.ts
import { ref, onMounted } from 'vue'
import type { ITask } from '../types/task'
import { taskService } from '../services/taskService'

export const useTasks = () => {
  const tasks = ref<ITask[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadTasks = async () => {
    try {
      isLoading.value = true
      error.value = null
      tasks.value = await taskService.getTasks()
    } catch (err) {
      console.error(err)
      error.value = 'Не удалось загрузить задачи'
    } finally {
      isLoading.value = false
    }
  }
  const createTask = async (title: string, description = '') => {
    try {
      error.value = null

      const newTask = await taskService.createTask({
        title,
        description,
      })

      // Добавляем новую задачу в начало списка
      tasks.value.unshift(newTask)
    } catch (err) {
      console.error('Ошибка при создании задачи', err)
      error.value = 'Не удалось создать задачу'
    }
  }

  const deleteTask = async (id: number) => {
    try {
      tasks.value = tasks.value.filter((task) => task.id !== id)
      await taskService.deleteTask(id)
    } catch (err) {
      console.error(err)
      error.value = 'Не удалось удалить задачу'
      await loadTasks()
    }
  }
  const toggleTaskStatus = async (task: ITask) => {
    try {
      error.value = null

      const nextCompleted: 0 | 1 = task.is_completed === 1 ? 0 : 1

      const updated = await taskService.updateTask(task.id, {
        is_completed: nextCompleted,
      })

      const index = tasks.value.findIndex((t) => t.id === task.id)
      if (index !== -1) {
        tasks.value[index] = updated
      }
    } catch (err) {
      console.error('Ошибка при обновлении статуса задачи', err)
      error.value = 'Не удалось обновить статус задачи'
    }
  }
  const updateTask = async (
    id: number,
    payload: { title: string; description: string }
  ) => {
    try {
      const updated = await taskService.updateTask(id, payload)

      const index = tasks.value.findIndex((t) => t.id === id)
      if (index !== -1) tasks.value[index] = updated
    } catch (err) {
      console.error('Ошибка при обновлении', err)
    }
  }

  onMounted(loadTasks)

  return {
    tasks,
    isLoading,
    error,
    loadTasks,
    deleteTask,
    toggleTaskStatus,
    createTask,
    updateTask,
  }
}
