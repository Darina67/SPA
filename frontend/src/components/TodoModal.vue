<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import type { ITask } from '../types/task'

interface Props {
  modelValue: boolean
  mode: 'create' | 'edit'
  task: ITask | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', payload: { title: string; description: string }): void
}>()

const title = ref('')
const description = ref('')

// Заполняем поля при открытии модалки в режиме редактирования
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen && props.mode === 'edit' && props.task) {
      title.value = props.task.title
      description.value = props.task.description ?? ''
    }
    if (isOpen && props.mode === 'create') {
      title.value = ''
      description.value = ''
    }
  }
)

const close = () => emit('update:modelValue', false)

const submit = () => {
  if (!title.value.trim()) return

  emit('submit', {
    title: title.value.trim(),
    description: description.value.trim(),
  })

  close()
}

const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) document.addEventListener('keydown', handleKey)
    else document.removeEventListener('keydown', handleKey)
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

        <h2 class="todo-modal__title">
          {{
            mode === 'edit' ? 'Редактирование задачи' : 'Добавить новую задачу'
          }}
        </h2>

        <label class="todo-modal__field">
          <input
            type="text"
            class="todo-modal__input"
            placeholder="Название задачи"
            v-model="title"
          />
        </label>

        <label class="todo-modal__field">
          <textarea
            class="todo-modal__textarea"
            placeholder="Описание"
            v-model="description"
          ></textarea>
        </label>

        <button type="button" class="todo-modal__submit" @click="submit">
          {{ mode === 'edit' ? 'Редактировать задачу' : 'Создать задачу' }}
        </button>
      </div>
    </section>
  </transition>
</template>
