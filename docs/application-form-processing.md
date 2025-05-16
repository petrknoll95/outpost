# Application Form Processing

## Overview
This document outlines the implementation plan for processing application form submissions from the Outpost website. The solution uses Vercel serverless functions to handle form submissions, send notifications to Slack, and send confirmation emails to applicants.

## Architecture
![Architecture Diagram](https://mermaid.ink/img/pako:eNp1kMFqwzAMhl_F6JRC3ovXwygb3S5jh5amNo3xbGFLHST03bfGGduhdIek_59-Sb4BB2GBQDu0PvxoGzE4-FG4Xm-VYQOu_GDr_bVzP8f7upBcYT4_ywMu0S6IQ_pHlUuJ3vTCHaXx6G9nfZNXbZtVeZF9Pl2KvMmxgmPyCUlc31bYiDbTi9iP4n7yHo9i6BXrEHvUIMkJdWA1aCdTNTpDMaaAsAZfRJ18Cv3oXWrVx-HEKe2Gzq5IOkBQc6CGo2EzzoBjpDCHd86fxLCM0EXUBv7r9wvbLHJN?type=png)

1. **User Submits Application**: User completes and submits the application form on the website
2. **Vercel API Route Processes Request**: Serverless function handles the submission
3. **Notification to Slack**: Details are posted to a Slack channel for review
4. **Confirmation Email**: An email is sent to the applicant confirming receipt
5. **Optional Storage**: Application data can be stored in a database if needed

## Implementation Steps

### 1. Prerequisites
- Vercel account connected to the GitHub repository
- Slack workspace with permission to create apps
- Resend.com account for email delivery

### 2. Create API Endpoint
Create a new file at `api/handle-application.js`:

```javascript
import { WebClient } from '@slack/web-api';
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    // Parse application data
    const formData = req.body;
    
    // Format data for Slack message
    const slackMessage = formatSlackMessage(formData);
    
    // Send to Slack
    const slack = new WebClient(process.env.SLACK_TOKEN);
    await slack.chat.postMessage({
      channel: 'applications',
      text: `New application from ${formData.name}!`,
      blocks: slackMessage
    });
    
    // Send confirmation email
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Outpost <applications@yourdomain.com>',
      to: formData.email,
      subject: 'Application Received - Outpost',
      html: getEmailTemplate(formData)
    });
    
    // Return success response
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing application:', error);
    return res.status(500).json({ error: 'Failed to process application' });
  }
}

// Format message for Slack with application details
function formatSlackMessage(formData) {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*New Application!* :tada:\n*Name:* ${formData.name}\n*Email:* ${formData.email}`
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Work:* ${formData.work || 'Not provided'}`
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Why Outpost:* ${formData.why || 'Not provided'}`
      }
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Frequency:* ${formData.frequency || 'Not provided'}`
        },
        {
          type: "mrkdwn",
          text: `*Start Date:* ${formData.startDate || 'Not provided'}`
        }
      ]
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Social:* ${formData.social || 'Not provided'}`
      }
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Approve",
            emoji: true
          },
          style: "primary",
          value: `approve_${Date.now()}`
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Reject",
            emoji: true
          },
          style: "danger",
          value: `reject_${Date.now()}`
        }
      ]
    }
  ];
}

// Email template HTML
function getEmailTemplate(formData) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { margin-bottom: 30px; }
          .footer { margin-top: 30px; font-size: 14px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thanks for applying to Outpost!</h2>
          </div>
          
          <p>Hi ${formData.name},</p>
          
          <p>We've received your application and are excited to learn more about you. We'll review your information and be in touch within a few days if it seems like a good fit.</p>
          
          <p>If you have any questions in the meantime, feel free to reply to this email.</p>
          
          <p>Best,<br>The Outpost Team</p>
          
          <div class="footer">
            <p>This is an automated message, please do not reply directly.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
```

### 3. Update Form Component
Modify the `submitForm` function in `src/components/ApplyForm.vue`:

```javascript
const submitForm = async () => {
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
      showErrorMessage.value = false;
    } finally {
      isSubmitting.value = false;
    }
  } else {
    console.log('Form has errors, cannot submit');
  }
};

// Add these refs for UI state handling
const isSubmitting = ref(false);
const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);

const resetForm = () => {
  nameAnswer.value = '';
  emailAnswer.value = '';
  workAnswer.value = '';
  whyAnswer.value = '';
  frequencyAnswer.value = '';
  startDateAnswer.value = '';
  socialAnswer.value = '';
};
```

### 4. Add UI for Success/Error States
Add to the form template in `src/components/ApplyForm.vue`:

```html
<!-- Success message -->
<div v-if="showSuccessMessage" class="success-message">
  <h3>Application Submitted!</h3>
  <p>Thanks for applying to Outpost. We'll be in touch soon!</p>
</div>

<!-- Error message -->
<div v-if="showErrorMessage" class="error-message">
  <h3>Oops! Something went wrong.</h3>
  <p>Please try again or contact us directly.</p>
</div>

<!-- Loading state on button -->
<button type="submit" class="submit-button" :disabled="isSubmitting">
  {{ isSubmitting ? 'Submitting...' : 'Apply for Membership' }}
</button>
```

### 5. Dependencies Setup
Install required dependencies:

```bash
npm install @slack/web-api resend
```

### 6. Environment Variables
In the Vercel dashboard, add these environment variables:

- `SLACK_TOKEN`: Your Slack bot token
- `RESEND_API_KEY`: Your Resend API key

### 7. Slack Integration Setup

#### Create a Slack App
1. Go to https://api.slack.com/apps and click "Create New App"
2. Choose "From scratch" and provide a name (e.g., "Outpost Applications")
3. Select your workspace

#### Configure Permissions
1. Navigate to "OAuth & Permissions" in the sidebar
2. Under "Scopes" > "Bot Token Scopes", add:
   - `chat:write`
   - `chat:write.public`
3. Click "Install to Workspace" at the top of the page
4. Copy the "Bot User OAuth Token" (starts with `xoxb-`)

#### Create Channel
1. Create a new channel in Slack called `#applications`
2. Invite your bot to the channel with `/invite @OutpostApplications`

### 8. Resend Email Setup

#### Create Resend Account
1. Sign up at https://resend.com
2. Verify your account
3. Create an API key from the dashboard

#### Domain Setup
1. For production, add and verify your domain
2. For testing, you can use Resend's sandbox domain

## Testing the Implementation

1. Deploy the changes to Vercel
2. Fill out the application form on your site
3. Verify that:
   - A message appears in the Slack channel
   - A confirmation email is sent to the applicant
   - The form resets and shows a success message

## Security Considerations

- Protect API routes from spam with rate limiting
- Consider adding CSRF protection
- Ensure sensitive information is properly sanitized

## Future Enhancements

1. **Application Dashboard**: Create a simple admin dashboard to view and manage applications
2. **Email Templates**: Develop more sophisticated email templates for different stages of the application process
3. **Follow-up Automation**: Implement automated follow-ups for applicants
4. **Analytics**: Track conversion rates and other metrics

## Maintenance Notes

- Monitor Slack API usage to avoid rate limits
- Check Resend dashboard for email delivery metrics
- Regularly review Vercel logs for any errors in the serverless function 