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
      channel: 'outpost-applications',
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