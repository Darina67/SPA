<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', title: string): void
}>()

const inputValue = ref('')

// Закрытие модалки
const close = () => {
  emit('update:modelValue', false)
}

// Сабмит
const submit = () => {
  if (!inputValue.value.trim()) return
  emit('submit', inputValue.value.trim())
  inputValue.value = ''
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

        <button type="button" class="todo-modal__submit" @click="submit">
          Добавить задачу
        </button>
      </div>
    </section>
  </transition>
</template>

<style scoped lang="scss">
.todo-modal {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: grid;
  place-items: center;
}

.todo-modal__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
}

.todo-modal__content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 400px;
  background: #2c2c2c;
  padding: 24px;
  border-radius: 10px;
  box-sizing: border-box;
}

.todo-modal__close {
  position: absolute;
  right: 12px;
  top: 12px;
  font-size: 26px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.92);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
