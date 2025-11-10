import { FormVariant } from './MultiStepForm';

export const formVariants: Record<string, FormVariant> = {
  consultation: {
    id: 'consultation',
    title: 'Schedule Your Free Strategy Session',
    subtitle: 'Get a custom marketing strategy in 30 minutes',
    step1Title: 'Get Your Free 30-Minute Strategy Session',
    step1Subtitle: 'Join 200+ business owners who have transformed their marketing with a personalized strategy session. No sales pitch - just actionable insights.',
    step2Fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'John'
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        placeholder: 'Smith'
      },
      {
        name: 'company',
        label: 'Company Name',
        type: 'text',
        required: true,
        placeholder: 'Acme Corp'
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        placeholder: '(555) 123-4567'
      },
      {
        name: 'monthlyBudget',
        label: 'Monthly Marketing Budget',
        type: 'select',
        required: true,
        placeholder: 'Select budget range',
        options: [
          'Under $1,000',
          '$1,000 - $5,000',
          '$5,000 - $10,000',
          '$10,000 - $25,000',
          '$25,000 - $50,000',
          '$50,000+'
        ]
      },
      {
        name: 'biggestChallenge',
        label: "What's your biggest marketing challenge?",
        type: 'textarea',
        required: true,
        placeholder: 'Tell me about your current marketing situation and what you want to improve...'
      }
    ],
    submitText: 'Schedule My Session',
    successMessage: 'Thank you for your interest! I\'ll get in touch shortly to talk about your project and next steps.'
  },

  audit: {
    id: 'audit',
    title: 'Get Your Free Marketing Audit',
    subtitle: 'Discover hidden opportunities in your current marketing',
    step1Title: 'Get Your Free Marketing Performance Audit',
    step1Subtitle: 'I\'ll analyze your current marketing and provide a detailed report with specific recommendations to improve your ROI.',
    step2Fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'John'
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        placeholder: 'Smith'
      },
      {
        name: 'company',
        label: 'Company Name',
        type: 'text',
        required: true,
        placeholder: 'Acme Corp'
      },
      {
        name: 'website',
        label: 'Website URL',
        type: 'url',
        required: true,
        placeholder: 'https://yourwebsite.com'
      },
      {
        name: 'monthlyBudget',
        label: 'Current Monthly Ad Spend',
        type: 'select',
        required: true,
        placeholder: 'Select current spend',
        options: [
          'Under $1,000',
          '$1,000 - $5,000',
          '$5,000 - $10,000',
          '$10,000 - $25,000',
          '$25,000 - $50,000',
          '$50,000+'
        ]
      },
      {
        name: 'mainGoal',
        label: 'What is your main marketing goal?',
        type: 'select',
        required: true,
        placeholder: 'Select your main goal',
        options: [
          'Increase leads/conversions',
          'Reduce cost per acquisition',
          'Improve ROI/ROAS',
          'Scale existing campaigns',
          'Launch new campaigns',
          'Better tracking/attribution'
        ]
      }
    ],
    submitText: 'Get My Free Audit',
    successMessage: 'Thank you for your interest! I\'ll get in touch shortly to talk about your project and share your audit results.'
  },

  campaign: {
    id: 'campaign',
    title: 'Start Your Marketing Campaign',
    subtitle: 'Let\'s build a campaign that drives real results',
    step1Title: 'Ready to Launch Your Next Campaign?',
    step1Subtitle: 'Tell me about your business and I\'ll create a custom campaign strategy designed to maximize your ROI from day one.',
    step2Fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'John'
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        placeholder: 'Smith'
      },
      {
        name: 'company',
        label: 'Company Name',
        type: 'text',
        required: true,
        placeholder: 'Acme Corp'
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        placeholder: '(555) 123-4567'
      },
      {
        name: 'budgetRange',
        label: 'Campaign Budget Range',
        type: 'select',
        required: true,
        placeholder: 'Select budget range',
        options: [
          '$2,000 - $5,000/month',
          '$5,000 - $10,000/month',
          '$10,000 - $25,000/month',
          '$25,000 - $50,000/month',
          '$50,000+/month'
        ]
      },
      {
        name: 'servicesInterested',
        label: 'Which services are you most interested in?',
        type: 'select',
        required: true,
        placeholder: 'Select primary service',
        options: [
          'Google Ads Management',
          'Facebook/Instagram Advertising',
          'Email Marketing Automation',
          'Conversion Rate Optimization',
          'Marketing Analytics & Tracking',
          'Full Marketing Strategy'
        ]
      },
      {
        name: 'timeline',
        label: 'When would you like to start?',
        type: 'select',
        required: true,
        placeholder: 'Select timeline',
        options: [
          'Immediately',
          'Within 2 weeks',
          'Within 1 month',
          'Within 3 months',
          'Just exploring options'
        ]
      }
    ],
    submitText: 'Start My Campaign',
    successMessage: 'Thank you for your interest! I\'ll get in touch shortly to talk about your project and discuss your campaign needs.'
  },

  caseStudies: {
    id: 'caseStudies',
    title: 'Grab My Free Growth Playbook',
    subtitle: 'Proven strategies to scale your business',
    step1Title: 'Get Your Free Growth Playbook',
    step1Subtitle: 'Download my comprehensive playbook with proven strategies, frameworks, and tactics I\'ve used to help 380+ businesses scale their revenue.',
    step2Fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'John'
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        placeholder: 'Smith'
      },
      {
        name: 'company',
        label: 'Company Name',
        type: 'text',
        required: false,
        placeholder: 'Acme Corp (optional)'
      },
      {
        name: 'industry',
        label: 'Industry',
        type: 'select',
        required: true,
        placeholder: 'Select your industry',
        options: [
          'E-commerce',
          'SaaS/Technology',
          'Professional Services',
          'Healthcare',
          'Real Estate',
          'Education',
          'Manufacturing',
          'Finance/Insurance',
          'Other'
        ]
      },
      {
        name: 'role',
        label: 'Your Role',
        type: 'select',
        required: true,
        placeholder: 'Select your role',
        options: [
          'Business Owner/CEO',
          'Marketing Director/Manager',
          'Marketing Coordinator',
          'Digital Marketing Specialist',
          'Consultant/Agency',
          'Other'
        ]
      }
    ],
    submitText: 'Get My Growth Playbook',
    successMessage: 'Thank you! Check your email - I\'ve sent you my comprehensive growth playbook with proven strategies and frameworks. Start implementing today!'
  },

  newsletter: {
    id: 'newsletter',
    title: 'Join 5,000+ Marketers',
    subtitle: 'Get weekly marketing insights delivered to your inbox',
    step1Title: 'Get Weekly Marketing Insights',
    step1Subtitle: 'Join 5,000+ marketers getting weekly strategies, case studies, and tactics delivered to their inbox. No spam, unsubscribe anytime.',
    step2Fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'John'
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: false,
        placeholder: 'Smith (optional)'
      }
    ],
    submitText: 'Subscribe',
    successMessage: 'Welcome to the community! Check your email for a confirmation and your first marketing insights.'
  }
};