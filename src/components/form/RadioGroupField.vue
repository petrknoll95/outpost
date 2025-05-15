<script setup>
import { computed, ref, watch } from 'vue';
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
  options: {
    type: Array,
    required: true
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
const focusedIndex = ref(-1);
const localValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
});

const bulletSvgPath = computed(() => {
  return `/images/svg-num/svg-num-${props.bulletNumber.toString().padStart(2, '0')}.svg`;
});

function navigateRadios(direction) {
  if (props.options.length <= 1) return;
  
  let newIndex;
  if (direction === 'next') {
    newIndex = focusedIndex.value < props.options.length - 1 ? focusedIndex.value + 1 : 0;
  } else {
    newIndex = focusedIndex.value > 0 ? focusedIndex.value - 1 : props.options.length - 1;
  }
  
  // Focus the radio button at the new index
  const radioInput = document.getElementById(`${fieldId.value}-${newIndex}`);
  if (radioInput) {
    radioInput.focus();
    radioInput.checked = true;
    localValue.value = props.options[newIndex].value;
  }
}

function handleFocus(index) {
  focusedIndex.value = index;
}

function handleBlur() {
  focusedIndex.value = -1;
}

const fieldId = computed(() => {
  return props.label.toLowerCase().replace(/\s+/g, '-');
});
</script>

<template>
  <div class="form-field-container">
    <div class="form-field-header">
      <div class="label-row">
        <div class="bullet-container">
          <img :src="bulletSvgPath" :alt="`Bullet number ${bulletNumber}`" class="bullet-svg" />
        </div>
        <label :id="`${fieldId}-label`" class="field-label">
          {{ label }} <span v-if="required" class="required-indicator">*</span>
        </label>
      </div>
      <p v-if="description" class="field-description">{{ description }}</p>
    </div>
    
    <div 
      class="radio-options-container" 
      role="radiogroup" 
      :aria-labelledby="`${fieldId}-label`"
      @keydown.down.prevent="navigateRadios('next')"
      @keydown.up.prevent="navigateRadios('prev')"
      @keydown.right.prevent="navigateRadios('next')"
      @keydown.left.prevent="navigateRadios('prev')"
    >
      <div 
        v-for="(option, index) in options" 
        :key="index"
        class="radio-option"
        :class="{ 
          'radio-option-selected': modelValue === option.value,
          'radio-option-focused': focusedIndex === index
        }"
      >
        <label :for="`${fieldId}-${index}`" class="radio-option-label">
          <div class="radio-button-container">
            <div class="radio-button">
              <div v-if="modelValue === option.value" class="radio-button-inner"></div>
            </div>
            <span class="radio-label">{{ option.label }}</span>
          </div>
          <input
            type="radio"
            :id="`${fieldId}-${index}`"
            :name="fieldId"
            :value="option.value"
            v-model="localValue"
            @focus="handleFocus(index)"
            @blur="handleBlur()"
            class="radio-input"
            :required="required && index === 0"
          />
        </label>
      </div>
    </div>
    
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<style scoped>
.radio-options-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
}

.radio-option {
  width: 100%;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-linen) 20%, transparent);
  background-color: var(--color-raisin-black);
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.radio-option-selected {
  background-color: color-mix(in srgb, var(--color-linen) 10%, var(--color-raisin-black));
  box-shadow: inset 0 0 0 1px var(--color-linen);
}

.radio-option-focused:not(.radio-option-selected) {
  box-shadow: inset 0 0 0 1px var(--color-linen);
}

.radio-option:hover:not(.radio-option-selected):not(.radio-option-focused) {
  background-color: color-mix(in srgb, var(--color-linen) 5%, var(--color-raisin-black));
}

.radio-option-label {
  width: 100%;
  display: block;
  padding: 1em;
  cursor: pointer;
}

.radio-button-container {
  display: flex;
  align-items: center;
  gap: 1em;
  width: 100%;
}

.radio-button {
  width: 1.25em;
  height: 1.25em;
  border: 1px solid var(--color-linen);
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: transparent;
}

.radio-option-selected .radio-button {
  background-color: var(--color-linen);
}

.radio-button-inner {
  width: 1em;
  height: 1em;
  background-color: var(--color-raisin-black);
  border-radius: 50%;
  margin: 0;
}

.radio-label {
  font-family: var(--font-aeonik);
  font-size: 1.5em;
  color: var(--color-linen);
  cursor: pointer;
}

.radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-input:focus {
  outline: none;
}
</style> 