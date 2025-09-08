// Legal Document Templates Service
export interface TemplateVariable {
  name: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'select';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface LegalTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  jurisdiction: string;
  isPremium: boolean;
  variables: TemplateVariable[];
  template: string;
  instructions: string[];
}

// Template Categories
export const TEMPLATE_CATEGORIES = {
  LANDLORD_TENANT: 'Landlord & Tenant',
  EMPLOYMENT: 'Employment',
  CONSUMER_RIGHTS: 'Consumer Rights',
  DEBT_COLLECTION: 'Debt Collection',
  SMALL_CLAIMS: 'Small Claims',
  CONTRACTS: 'Contracts',
  FAMILY_LAW: 'Family Law',
  BUSINESS: 'Business',
} as const;

// Pre-defined Legal Templates
export const LEGAL_TEMPLATES: LegalTemplate[] = [
  {
    id: 'security-deposit-demand',
    title: 'Security Deposit Demand Letter',
    description: 'Formal letter to landlord requesting return of security deposit',
    category: TEMPLATE_CATEGORIES.LANDLORD_TENANT,
    jurisdiction: 'us',
    isPremium: true,
    variables: [
      {
        name: 'tenantName',
        label: 'Your Full Name',
        type: 'text',
        required: true,
        placeholder: 'John Doe'
      },
      {
        name: 'tenantAddress',
        label: 'Your Current Address',
        type: 'text',
        required: true,
        placeholder: '123 Main St, City, State, ZIP'
      },
      {
        name: 'landlordName',
        label: 'Landlord Name',
        type: 'text',
        required: true,
        placeholder: 'Jane Smith'
      },
      {
        name: 'landlordAddress',
        label: 'Landlord Address',
        type: 'text',
        required: true,
        placeholder: '456 Oak Ave, City, State, ZIP'
      },
      {
        name: 'propertyAddress',
        label: 'Rental Property Address',
        type: 'text',
        required: true,
        placeholder: '789 Elm St, City, State, ZIP'
      },
      {
        name: 'depositAmount',
        label: 'Security Deposit Amount',
        type: 'text',
        required: true,
        placeholder: '$1,500'
      },
      {
        name: 'moveOutDate',
        label: 'Move-Out Date',
        type: 'date',
        required: true
      },
      {
        name: 'daysElapsed',
        label: 'Days Since Move-Out',
        type: 'number',
        required: true,
        placeholder: '45'
      }
    ],
    template: `[Date]

{{landlordName}}
{{landlordAddress}}

Re: Demand for Return of Security Deposit
Property Address: {{propertyAddress}}

Dear {{landlordName}},

I am writing to formally request the immediate return of my security deposit in the amount of {{depositAmount}} for the above-referenced rental property.

As you are aware, I vacated the premises on {{moveOutDate}}, which was {{daysElapsed}} days ago. Under state law, landlords are typically required to return security deposits within 30 days of tenant move-out, along with an itemized statement of any deductions.

To date, I have not received:
1. My security deposit refund
2. An itemized statement of deductions
3. Any communication regarding the status of my deposit

I left the property in good condition, with normal wear and tear. I fulfilled all lease obligations and provided proper notice of my intent to vacate.

Please be advised that failure to return my security deposit within the statutory time period may result in my pursuing legal remedies, including but not limited to:
- Recovery of the full deposit amount
- Additional damages as provided by law
- Attorney fees and court costs

I request that you return my security deposit of {{depositAmount}} within 10 days of receipt of this letter. Please send the refund to my current address listed above.

I look forward to your prompt response and resolution of this matter.

Sincerely,

{{tenantName}}
{{tenantAddress}}

Date: _______________`,
    instructions: [
      'Print this letter on letterhead if available',
      'Send via certified mail with return receipt requested',
      'Keep copies of all correspondence',
      'Document the condition of the property with photos',
      'Check your state\'s specific laws regarding security deposit return timeframes'
    ]
  },
  {
    id: 'cease-desist-harassment',
    title: 'Cease and Desist Letter - Harassment',
    description: 'Letter to stop harassment or unwanted contact',
    category: TEMPLATE_CATEGORIES.CONSUMER_RIGHTS,
    jurisdiction: 'us',
    isPremium: true,
    variables: [
      {
        name: 'senderName',
        label: 'Your Full Name',
        type: 'text',
        required: true
      },
      {
        name: 'senderAddress',
        label: 'Your Address',
        type: 'text',
        required: true
      },
      {
        name: 'recipientName',
        label: 'Recipient Name/Company',
        type: 'text',
        required: true
      },
      {
        name: 'recipientAddress',
        label: 'Recipient Address',
        type: 'text',
        required: true
      },
      {
        name: 'harassmentDescription',
        label: 'Description of Harassment',
        type: 'text',
        required: true,
        placeholder: 'Describe the unwanted behavior'
      }
    ],
    template: `[Date]

{{recipientName}}
{{recipientAddress}}

CEASE AND DESIST DEMAND

Dear {{recipientName}},

This letter serves as formal notice to CEASE AND DESIST from all harassment, intimidation, and unwanted contact directed toward me.

Your conduct, specifically {{harassmentDescription}}, constitutes harassment and is causing me significant distress. This behavior is unacceptable and potentially illegal.

DEMAND FOR CESSATION:
You are hereby directed to IMMEDIATELY CEASE AND DESIST from:
1. All forms of harassment, intimidation, or threatening behavior
2. Unwanted contact via phone, email, text, or in person
3. Any conduct that could be construed as stalking or harassment

LEGAL CONSEQUENCES:
Please be advised that if you fail to comply with this demand:
1. I will pursue all available legal remedies
2. I will file complaints with appropriate authorities
3. I will seek restraining orders if necessary
4. I will pursue damages for emotional distress

This letter serves as evidence of your notice of my demand. Any further harassment will be documented and may be used as evidence in legal proceedings.

I expect your immediate compliance with this demand.

Sincerely,

{{senderName}}
{{senderAddress}}

Date: _______________`,
    instructions: [
      'Send via certified mail with return receipt requested',
      'Keep detailed records of all harassment incidents',
      'Document dates, times, and witnesses',
      'Consider filing a police report for serious harassment',
      'Consult with an attorney if harassment continues'
    ]
  },
  {
    id: 'debt-validation-request',
    title: 'Debt Validation Request Letter',
    description: 'Request debt collector to validate claimed debt',
    category: TEMPLATE_CATEGORIES.DEBT_COLLECTION,
    jurisdiction: 'us',
    isPremium: false,
    variables: [
      {
        name: 'consumerName',
        label: 'Your Full Name',
        type: 'text',
        required: true
      },
      {
        name: 'consumerAddress',
        label: 'Your Address',
        type: 'text',
        required: true
      },
      {
        name: 'collectorName',
        label: 'Debt Collector Name',
        type: 'text',
        required: true
      },
      {
        name: 'collectorAddress',
        label: 'Debt Collector Address',
        type: 'text',
        required: true
      },
      {
        name: 'accountNumber',
        label: 'Account Number (if known)',
        type: 'text',
        required: false
      },
      {
        name: 'debtAmount',
        label: 'Claimed Debt Amount',
        type: 'text',
        required: false
      }
    ],
    template: `[Date]

{{collectorName}}
{{collectorAddress}}

Re: Request for Debt Validation
Account Number: {{accountNumber}}
Claimed Amount: {{debtAmount}}

To Whom It May Concern:

This letter is sent in response to a notice I received from your company regarding a debt you claim I owe. This is not a refusal to pay, but a notice sent pursuant to the Fair Debt Collection Practices Act, 15 USC 1692g Sec. 809 (b).

I am requesting that you provide verification of this alleged debt. Please provide the following information:

1. The amount of the debt
2. The name of the creditor to whom the debt is owed
3. Verification that you are licensed to collect debts in my state
4. Proof that the statute of limitations has not expired on this account
5. Complete payment history, beginning with the original creditor
6. Copy of the original signed agreement or contract
7. Proof of your authority to collect this debt

Please be advised that I am disputing this debt in its entirety. Under the FDCPA, you must cease all collection activities until you have provided the requested validation.

Additionally, please note:
- I do not wish to be contacted by telephone
- All future communications must be in writing
- This debt has not been acknowledged by me in any way

Please provide the requested validation within 30 days as required by law.

Sincerely,

{{consumerName}}
{{consumerAddress}}

Date: _______________`,
    instructions: [
      'Send within 30 days of first contact from debt collector',
      'Send via certified mail with return receipt requested',
      'Keep copies of all correspondence',
      'Do not acknowledge the debt as yours',
      'Consult with a consumer rights attorney if needed'
    ]
  },
  {
    id: 'employment-complaint',
    title: 'Workplace Complaint Letter',
    description: 'Formal complaint to HR about workplace issues',
    category: TEMPLATE_CATEGORIES.EMPLOYMENT,
    jurisdiction: 'us',
    isPremium: true,
    variables: [
      {
        name: 'employeeName',
        label: 'Your Full Name',
        type: 'text',
        required: true
      },
      {
        name: 'employeeId',
        label: 'Employee ID',
        type: 'text',
        required: false
      },
      {
        name: 'department',
        label: 'Department',
        type: 'text',
        required: true
      },
      {
        name: 'hrName',
        label: 'HR Representative Name',
        type: 'text',
        required: false,
        placeholder: 'Human Resources Department'
      },
      {
        name: 'issueDescription',
        label: 'Description of Issue',
        type: 'text',
        required: true
      },
      {
        name: 'incidentDate',
        label: 'Date of Incident',
        type: 'date',
        required: true
      }
    ],
    template: `[Date]

{{hrName}}
Human Resources Department

Re: Formal Workplace Complaint

Dear Human Resources,

I am writing to file a formal complaint regarding a workplace issue that requires immediate attention and resolution.

Employee Information:
- Name: {{employeeName}}
- Employee ID: {{employeeId}}
- Department: {{department}}

Incident Details:
Date of Incident: {{incidentDate}}
Description: {{issueDescription}}

This situation has created a hostile work environment and is affecting my ability to perform my job duties effectively. I believe this matter violates company policy and potentially applicable employment laws.

I am requesting:
1. A thorough investigation of this matter
2. Appropriate corrective action
3. Protection from retaliation
4. A written response regarding the resolution

I have documented this incident and am prepared to provide additional information as needed. I trust that this matter will be handled promptly and confidentially.

Please contact me to schedule a meeting to discuss this complaint in detail. I can be reached at [phone number] or [email address].

I look forward to your prompt response and resolution of this matter.

Sincerely,

{{employeeName}}
Employee ID: {{employeeId}}
Department: {{department}}

Date: _______________`,
    instructions: [
      'Keep detailed records of all incidents',
      'Follow your company\'s complaint procedures',
      'Consider filing with EEOC if discrimination is involved',
      'Document any retaliation that occurs',
      'Consult with an employment attorney if needed'
    ]
  }
];

export class TemplateService {
  static getTemplatesByJurisdiction(jurisdiction: string): LegalTemplate[] {
    return LEGAL_TEMPLATES.filter(template => 
      template.jurisdiction === jurisdiction || template.jurisdiction === 'all'
    );
  }

  static getTemplatesByCategory(category: string, jurisdiction?: string): LegalTemplate[] {
    let templates = LEGAL_TEMPLATES.filter(template => template.category === category);
    
    if (jurisdiction) {
      templates = templates.filter(template => 
        template.jurisdiction === jurisdiction || template.jurisdiction === 'all'
      );
    }
    
    return templates;
  }

  static getTemplate(id: string): LegalTemplate | undefined {
    return LEGAL_TEMPLATES.find(template => template.id === id);
  }

  static getFreeTemplates(jurisdiction?: string): LegalTemplate[] {
    let templates = LEGAL_TEMPLATES.filter(template => !template.isPremium);
    
    if (jurisdiction) {
      templates = templates.filter(template => 
        template.jurisdiction === jurisdiction || template.jurisdiction === 'all'
      );
    }
    
    return templates;
  }

  static getPremiumTemplates(jurisdiction?: string): LegalTemplate[] {
    let templates = LEGAL_TEMPLATES.filter(template => template.isPremium);
    
    if (jurisdiction) {
      templates = templates.filter(template => 
        template.jurisdiction === jurisdiction || template.jurisdiction === 'all'
      );
    }
    
    return templates;
  }

  static generateDocument(templateId: string, variables: Record<string, string>): string {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template with ID ${templateId} not found`);
    }

    let document = template.template;
    
    // Replace template variables
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      document = document.replace(regex, value);
    });

    // Replace [Date] with current date
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    document = document.replace(/\[Date\]/g, currentDate);

    return document;
  }

  static validateVariables(templateId: string, variables: Record<string, string>): string[] {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template with ID ${templateId} not found`);
    }

    const errors: string[] = [];
    
    template.variables.forEach(variable => {
      if (variable.required && (!variables[variable.name] || variables[variable.name].trim() === '')) {
        errors.push(`${variable.label} is required`);
      }
    });

    return errors;
  }
}
