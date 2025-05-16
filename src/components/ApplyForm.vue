<script setup>
import { ref, computed } from 'vue';
import InputField from './form/InputField.vue';
import TextAreaField from './form/TextAreaField.vue';
import DatePickerField from './form/DatePickerField.vue';
import RadioGroupField from './form/RadioGroupField.vue';
import MainButton from './MainButton.vue';
import '../assets/forms.css';

const nameAnswer = ref('');
const emailAnswer = ref('');
const workAnswer = ref('');
const whyAnswer = ref('');
const frequencyAnswer = ref('');
const startDateAnswer = ref('');
const socialAnswer = ref('');
// Honeypot field to catch bots
const honeyPotField = ref('');

// Add these refs for UI state handling
const isSubmitting = ref(false);
const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);

const formErrors = ref({
  nameAnswer: '',
  emailAnswer: '',
  workAnswer: '',
  whyAnswer: '',
  frequencyAnswer: '',
  startDateAnswer: '',
  socialAnswer: ''
});

const isFormValid = computed(() => {
  return !formErrors.value.nameAnswer && 
         !formErrors.value.emailAnswer && 
         !formErrors.value.workAnswer && 
         !formErrors.value.whyAnswer && 
         !formErrors.value.frequencyAnswer &&
         !formErrors.value.startDateAnswer &&
         !formErrors.value.socialAnswer &&
         nameAnswer.value && 
         emailAnswer.value &&
         workAnswer.value &&
         whyAnswer.value &&
         frequencyAnswer.value &&
         startDateAnswer.value &&
         socialAnswer.value;
});

const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: '3-4', label: '3-4 days/week' },
  { value: 'occasionally', label: 'Occasionally' },
  { value: 'not-sure', label: 'Not sure yet' }
];

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateForm = () => {
  // Reset errors
  formErrors.value = {
    nameAnswer: '',
    emailAnswer: '',
    workAnswer: '',
    whyAnswer: '',
    frequencyAnswer: '',
    startDateAnswer: '',
    socialAnswer: ''
  };
  
  // Validate name
  if (!nameAnswer.value.trim()) {
    formErrors.value.nameAnswer = 'Name is required';
  }
  
  // Validate email
  if (!emailAnswer.value.trim()) {
    formErrors.value.emailAnswer = 'Email is required';
  } else if (!validateEmail(emailAnswer.value)) {
    formErrors.value.emailAnswer = 'Please enter a valid email address';
  }
  
  // Validate work
  if (!workAnswer.value.trim()) {
    formErrors.value.workAnswer = 'Please tell us what you do for work';
  }
  
  // Validate why interested
  if (!whyAnswer.value.trim()) {
    formErrors.value.whyAnswer = 'Please tell us why you are interested in Outpost';
  }
  
  // Validate frequency selection
  if (frequencyAnswer.value === '') {
    formErrors.value.frequencyAnswer = 'Please select how often you expect to use your desk';
  }
  
  // Validate start date
  if (!startDateAnswer.value) {
    formErrors.value.startDateAnswer = 'Please select when you would want to start';
  }
  
  // Validate social
  if (!socialAnswer.value.trim()) {
    formErrors.value.socialAnswer = 'Please provide a social media profile or portfolio';
  }
  
  return isFormValid.value;
};

const resetForm = () => {
  nameAnswer.value = '';
  emailAnswer.value = '';
  workAnswer.value = '';
  whyAnswer.value = '';
  frequencyAnswer.value = '';
  startDateAnswer.value = '';
  socialAnswer.value = '';
  honeyPotField.value = '';
};

const submitForm = async () => {
  // Check if honeypot is filled - if so, act like success but don't submit
  if (honeyPotField.value) {
    console.log('Honeypot triggered - likely bot submission');
    // Fake success to fool the bot
    resetForm();
    showSuccessMessage.value = true;
    return;
  }

  if (validateForm()) {
    const formData = {
      name: nameAnswer.value,
      email: emailAnswer.value,
      work: workAnswer.value,
      why: whyAnswer.value,
      frequency: frequencyAnswer.value,
      startDate: startDateAnswer.value,
      social: socialAnswer.value
    };
    
    // Show loading state
    isSubmitting.value = true;
    
    try {
      const response = await fetch('/api/handle-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Reset form
      resetForm();
      
      // Show success message
      showSuccessMessage.value = true;
    } catch (error) {
      console.error('Error submitting application:', error);
      showErrorMessage.value = true;
    } finally {
      isSubmitting.value = false;
    }
  } else {
    console.log('Form has errors, cannot submit');
  }
};
</script>

<template>
  <div class="apply-form">
    <form @submit.prevent="submitForm" class="form-container" novalidate>
      <div v-if="showSuccessMessage" class="success-message">
        <h3>Application Submitted!</h3>
        <p>Thanks for applying to Outpost. We'll be in touch soon!</p>
      </div>
      
      <div v-if="showErrorMessage" class="error-message">
        <h3>Oops! Something went wrong.</h3>
        <p>Please try again or contact us directly.</p>
      </div>
      
      <!-- Honeypot field - invisible to humans but bots will fill it -->
      <div class="honeypot-container">
        <input 
          type="text" 
          name="website" 
          v-model="honeyPotField" 
          autocomplete="off" 
          tabindex="-1"
          aria-hidden="true"
        />
      </div>
      
      <div v-if="!showSuccessMessage" class="form-grid">
        <!-- Left Column -->
        <div class="form-column">
          <InputField
            label="FULL NAME"
            v-model="nameAnswer"
            placeholder=""
            :bulletNumber="1"
            required
            :error="formErrors.nameAnswer"
          />
          
          <InputField
            label="EMAIL ADDRESS"
            placeholder=""
            type="email"
            v-model="emailAnswer"
            :bulletNumber="2"
            required
            :error="formErrors.emailAnswer"
          />
          
          <InputField
            label="WHAT DO YOU DO FOR WORK?"
            description="Short and sweet—just give us the gist."
            placeholder=""
            v-model="workAnswer"
            :bulletNumber="3"
            required
            :error="formErrors.workAnswer"
          />
          
          <TextAreaField
            label="WHY ARE YOU INTERESTED IN OUTPOST?"
            description="This isn't a pitch. Just tell us what you're looking for in a workspace."
            placeholder=""
            v-model="whyAnswer"
            :bulletNumber="4"
            :rows="8"
            required
            :error="formErrors.whyAnswer"
          />
        </div>
        
        <!-- Right Column -->
        <div class="form-column">
          <RadioGroupField
            label="HOW OFTEN DO YOU EXPECT TO USE YOUR DESK?"
            v-model="frequencyAnswer"
            :options="frequencyOptions"
            :bulletNumber="5"
            required
            :error="formErrors.frequencyAnswer"
          />
          
          <DatePickerField
            label="WHEN WOULD YOU WANT TO START?"
            placeholder=""
            v-model="startDateAnswer"
            :bulletNumber="6"
            required
            :error="formErrors.startDateAnswer"
          />
          
          <InputField
            label="SOCIAL"
            description="Where can we find you? LinkedIn/X/Portfolio"
            placeholder=""
            v-model="socialAnswer"
            :bulletNumber="7"
            required
            :error="formErrors.socialAnswer"
          />
          
          <div class="submit-button-container">
            <button type="submit" class="submit-button" :disabled="isSubmitting">
              {{ isSubmitting ? 'Submitting...' : 'Apply for Membership' }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.form-column {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.submit-button-container {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
}

:deep(.main_button) {
  width: 100%;
  max-width: none;
}

.submit-button {
  --main-button-bg: transparent;
  --main-button-text: var(--color-linen);
  --main-button-border: var(--color-linen);
  --main-button-font-size: 1.25em;
  --main-button-height: 48px;
  --main-button-padding: 0 0.75em;
  font-family: 'Aeonik', sans-serif;
  font-size: var(--main-button-font-size);
  line-height: 1em;
  margin: 0;
  font-weight: 400;
  text-decoration: none;
  box-shadow: 0 0 0 1px inset currentColor;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: var(--main-button-padding);
  background-color: var(--main-button-bg);
  color: var(--main-button-text);
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s, width 0.4s, margin-left 0.4s, margin-right 0.4s, padding 0.2s;
  width: 100%;
  gap: 1em;
  flex-wrap: nowrap;
  flex-shrink: 0;
  height: var(--main-button-height);
  border: none;
  border-radius: 0;
  cursor: pointer;
  outline: none;
}

.submit-button::after {
  content: "";
  background-image: url("data:image/svg+xml,%3Csvg class='nav-link-arrow' width='1em' height='1em' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17.3171 4.68293L4 18M5.70732 4H18V16.2927' stroke='%23FBF1E5' stroke-width='2' /%3E%3C/svg%3E");
  width: 1em;
  height: 1em;
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
}

.submit-button:hover::after {
  background-image: url("data:image/svg+xml,%3Csvg class='nav-link-arrow' width='1em' height='1em' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17.3171 4.68293L4 18M5.70732 4H18V16.2927' stroke='%231A1919' stroke-width='2' /%3E%3C/svg%3E");
}

.submit-button:hover {
  --main-button-bg: var(--color-linen);
  --main-button-text: var(--color-raisin-black);
}

.submit-button:focus {
  outline: none;
}

.success-message, .error-message {
  background-color: color-mix(in srgb, var(--color-linen) 10%, transparent);
  border: 1px solid var(--color-linen);
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.success-message h3 {
  color: var(--color-linen);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.error-message h3 {
  color: #E53E3E;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.honeypot-container {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
</style>
