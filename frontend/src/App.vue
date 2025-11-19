<script setup lang="ts">
import { computed, ref } from 'vue'
import TodoModal from './components/TodoModal.vue'
import { useTasks } from './composables/useTasks'
import type { ITask } from './types/task'

// Подключаем логику задач
const {
  tasks,
  isLoading,
  error,
  deleteTask,
  toggleTaskStatus,
  createTask,
  updateTask,
} = useTasks()

// Состояния
const hasTasks = computed(() => tasks.value.length > 0)
const isModalOpen = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const editableTask = ref<ITask | null>(null)

// ---------- ОТКРЫТЬ МОДАЛКУ ДЛЯ СОЗДАНИЯ ----------
const openModal = () => {
  modalMode.value = 'create'
  editableTask.value = null
  isModalOpen.value = true
}

// ---------- ОТКРЫТЬ МОДАЛКУ ДЛЯ РЕДАКТИРОВАНИЯ ----------
const openEdit = (task: ITask) => {
  modalMode.value = 'edit'
  editableTask.value = task
  isModalOpen.value = true
}

// ---------- ОБРАБОТКА SUBMIT ИЗ МОДАЛКИ ----------
const handleModalSubmit = async ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  if (modalMode.value === 'create') {
    await createTask(title, description)
  }

  if (modalMode.value === 'edit' && editableTask.value) {
    await updateTask(editableTask.value.id, { title, description })
  }
}
</script>

<template>
  <main class="todo" aria-labelledby="todo-title">
    <header class="todo__header">
      <h1 id="todo-title" class="todo__title">ToDo list</h1>
    </header>

    <section class="todo__content">
      <div class="todo__tools">
        <label class="todo__search">
          <input
            type="text"
            class="todo__search-input"
            placeholder="Поиск по задачам..."
          />
        </label>

        <label class="todo__filter">
          <select class="todo__filter-select">
            <option value="all">Все</option>
            <option value="completed">Выполнено</option>
            <option value="uncompleted">В ожидании</option>
          </select>
        </label>
      </div>

      <!-- состояние загрузки / ошибки -->
      <div v-if="isLoading" class="todo__state">Загрузка задач...</div>
      <div v-else-if="error" class="todo__state todo__state--error">
        {{ error }}
      </div>
      <div v-else-if="!hasTasks" class="todo__state">Задач пока нет</div>

      <ul v-else class="todo__list">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="todo__item"
          :class="{ 'todo__item--completed': task.is_completed === 1 }"
          @click="openEdit(task)"
        >
          <span class="todo__item-text">
            {{ task.title }}
          </span>

          <div class="todo__item-actions" @click.stop>
            <button
              type="button"
              class="todo__btn todo__btn--complete"
              aria-label="Отметить задачу как выполненную"
              @click="toggleTaskStatus(task)"
            >
              ✔
            </button>
            <button
              type="button"
              class="todo__btn todo__btn--delete"
              aria-label="Удалить задачу"
              @click="deleteTask(task.id)"
            >
              ✘
            </button>
          </div>
        </li>
      </ul>
    </section>

    <!-- КНОПКА СОЗДАНИЯ -->
    <button
      @click="openModal"
      type="button"
      class="todo__add-btn"
      aria-label="Добавить новую задачу"
    >
      +
    </button>

    <!-- МОДАЛЬНОЕ ОКНО -->
    <TodoModal
      v-model="isModalOpen"
      :mode="modalMode"
      :task="editableTask"
      @submit="handleModalSubmit"
    />
  </main>
</template>
