<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', payload: { title: string; description: string }): void
}>()

const title = ref('')
const description = ref('')

// Закрытие модалки
const close = () => {
  emit('update:modelValue', false)
}

// Сабмит
const submit = () => {
  if (!title.value.trim()) return

  emit('submit', {
    title: title.value.trim(),
    description: description.value.trim(),
  })

  title.value = ''
  description.value = ''
  close()
}

// Закрытие по ESC
const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close()
  }
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
    } else {
      document.removeEventListener('keydown', handleKey)
    }
  }
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKey)
})
</script>

<template>
  <transition name="fade">
    <section
      v-if="modelValue"
      class="todo-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="todo-modal-title"
    >
      <div class="todo-modal__overlay" @click="close"></div>

      <div class="todo-modal__content">
        <button
          type="button"
          class="todo-modal__close"
          aria-label="Закрыть окно"
          @click="close"
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
            v-model="inputValue"
            @keyup.enter="submit"
          />
        </label>
        <label class="todo-modal__field">
          <span class="visually-hidden">Описание задачи</span>
          <textarea
            class="todo-modal__textarea"
            placeholder="Введите описание задачи..."
            rows="4"
            v-model="description"
          ></textarea>
        </label>

        <button type="button" class="todo-modal__submit" @click="submit">
          Добавить задачу
        </button>
      </div>
    </section>
  </transition>
</template>
