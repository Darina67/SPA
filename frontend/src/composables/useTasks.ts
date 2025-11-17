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

  onMounted(loadTasks)

  return {
    tasks,
    isLoading,
    error,
    loadTasks,
  }
}
