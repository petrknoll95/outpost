<script setup>
import { ref, computed } from 'vue';
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
    type: [String, Number],
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 6
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
      class="form-field-wrapper"
      :class="{ 'form-field-error': error }"
    >
      <textarea
        :id="label.toLowerCase().replace(/\s+/g, '-')"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        @input="updateValue"
        @focus="handleFocus"
        @blur="handleBlur"
        :required="required"
        class="form-field textarea-field"
      ></textarea>
    </div>
    
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<style scoped>
/* Component-specific styles only */
</style> 