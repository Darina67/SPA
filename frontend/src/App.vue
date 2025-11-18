<script setup lang="ts">
import { computed } from 'vue'
import TodoModal from './components/TodoModal.vue'
import { useTasks } from './composables/useTasks'

const { tasks, isLoading, error, deleteTask } = useTasks()

const hasTasks = computed(() => tasks.value.length > 0)

import { ref } from 'vue'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const addTask = (title: string) => {
  console.log('Новая задача:', title)
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
        <li v-for="task in tasks" :key="task.id" class="todo__item">
          <span class="todo__item-text">
            <!-- подставь правильное поле: title / name / text -->
            {{ task.title }}
          </span>

          <div class="todo__item-actions">
            <button
              type="button"
              class="todo__btn todo__btn--complete"
              aria-label="Отметить задачу как выполненную"
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

    <button
      @click="openModal"
      type="button"
      class="todo__add-btn"
      aria-label="Добавить новую задачу"
    >
      +
    </button>
    <TodoModal v-model="isModalOpen" @submit="addTask" />
  </main>
</template>
