<script setup>
import { ref, computed, onMounted } from 'vue';
import '../../assets/forms.css';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  bulletNumber: {
    type: Number,
    default: 1
  },
  error: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const focused = ref(false);
const todayDate = ref('');

onMounted(() => {
  // Set today's date in YYYY-MM-DD format for min attribute
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  todayDate.value = `${year}-${month}-${day}`;
});

const bulletSvgPath = computed(() => {
  return `/images/svg-num/svg-num-${props.bulletNumber.toString().padStart(2, '0')}.svg`;
});

function updateValue(event) {
  emit('update:modelValue', event.target.value);
}

function handleFocus() {
  focused.value = true;
}

function handleBlur() {
  focused.value = false;
}
</script>

<template>
  <div class="form-field-container">
    <div class="form-field-header">
      <div class="label-row">
        <div class="bullet-container">
          <img :src="bulletSvgPath" :alt="`Bullet number ${bulletNumber}`" class="bullet-svg" />
        </div>
        <label :for="label.toLowerCase().replace(/\s+/g, '-')" class="field-label">
          {{ label }} <span v-if="required" class="required-indicator">*</span>
        </label>
      </div>
      <p v-if="description" class="field-description">{{ description }}</p>
    </div>
    
    <div 
      class="form-field-wrapper date-field-wrapper"
      :class="{ 'form-field-error': error }"
    >
      <input
        :id="label.toLowerCase().replace(/\s+/g, '-')"
        type="date"
        :min="todayDate"
        :value="modelValue"
        :placeholder="placeholder"
        @input="updateValue"
        @focus="handleFocus"
        @blur="handleBlur"
        :required="required"
        class="form-field date-field"
      />
      <div class="date-icon-container">
        <img src="/images/icons/calendar.svg" alt="Calendar" class="calendar-icon" />
      </div>
    </div>
    
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<style scoped>
.date-field-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.date-field {
  padding-right: 3rem;
}

.date-field::-webkit-calendar-picker-indicator {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}

.date-icon-container {
  position: absolute;
  right: 1rem;
  pointer-events: none;
}

.calendar-icon {
  width: 1.25em;
  height: 1.25em;
}
</style> 