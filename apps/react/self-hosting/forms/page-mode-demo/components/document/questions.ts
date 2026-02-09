// Question data structure
export interface Question {
  id: string
  number: string
  title: string
  description: string
  defaultValue: string
  options: string[]
}

export const questions: Question[] = [
  {
    id: 'q1',
    number: '3.1',
    title: 'Which application or product line does this repository belong to?',
    description: 'This grouping will create reports at an application/product level.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', 'Finance-api', 'User-service', 'Analytics-engine'],
  },
  {
    id: 'q2',
    number: '3.2',
    title: 'What type of personal data does this processing involve?',
    description: 'Select the categories of personal data being processed.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', 'Contact-info', 'Financial-data', 'Location-data'],
  },
  {
    id: 'q3',
    number: '3.3',
    title: 'What is the legal basis for processing this data?',
    description: 'Select the applicable legal basis under GDPR Article 6.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', 'Consent', 'Contract', 'Legal-obligation'],
  },
  {
    id: 'q4',
    number: '3.4',
    title: 'How long will the data be retained?',
    description: 'Specify the retention period for this data processing activity.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', '1-year', '3-years', '7-years'],
  },
  {
    id: 'q5',
    number: '3.5',
    title: 'Are there any data transfers outside the EEA?',
    description: 'Indicate if data is transferred to third countries.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', 'Yes-with-SCCs', 'Yes-with-adequacy', 'No-transfers'],
  },
  {
    id: 'q6',
    number: '3.6',
    title: 'What security measures are in place?',
    description: 'Describe the technical and organizational security measures.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', 'Encryption', 'Access-controls', 'Audit-logging'],
  },
  {
    id: 'q7',
    number: '3.7',
    title: 'Is a Data Protection Impact Assessment required?',
    description: 'Determine if a DPIA is needed based on risk assessment.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', 'Yes-required', 'No-not-required', 'Under-review'],
  },
]
