<script setup lang="ts">
import { computed } from 'vue'
import { useTasks } from './composables/useTasks' // если alias '@' настроен
// если alias ещё не настроен, используй: '../../composables/useTasks'

const { tasks, isLoading, error } = useTasks()

const hasTasks = computed(() => tasks.value.length > 0)

import { ref } from 'vue'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
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

    <!-- модалка пока оставляем как есть -->
    <transition name="fade">
      <section
        v-if="isModalOpen"
        class="todo-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="todo-modal-title"
      >
        <div class="todo-modal__content">
          <button
            @click="closeModal"
            type="button"
            class="todo-modal__close"
            aria-label="Закрыть окно добавления задачи"
          >
            &times;
          </button>

          <h2 id="todo-modal-title" class="todo-modal__title">
            Добавить новую задачу
          </h2>

          <label class="todo-modal__field">
            <span class="visually-hidden">Текст задачи</span>
            <input
              type="text"
              class="todo-modal__input"
              placeholder="Введите текст задачи"
            />
          </label>

          <button type="button" class="todo-modal__submit">
            Добавить задачу
          </button>
        </div>
      </section>
    </transition>
  </main>
</template>
