// Legal Resources and Citations Service
export interface LegalResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'statute' | 'regulation' | 'case_law' | 'government_agency' | 'legal_aid' | 'court' | 'form';
  jurisdiction: string;
  category: string;
  isOfficial: boolean;
  lastUpdated: Date;
}

export interface LegalCitation {
  id: string;
  title: string;
  citation: string;
  url?: string;
  summary: string;
  jurisdiction: string;
  type: 'federal_law' | 'state_law' | 'local_law' | 'regulation' | 'case_law';
  relevantTopics: string[];
}

// Legal Resource Categories
export const RESOURCE_CATEGORIES = {
  HOUSING: 'Housing & Tenant Rights',
  EMPLOYMENT: 'Employment Law',
  CONSUMER: 'Consumer Protection',
  FAMILY: 'Family Law',
  CRIMINAL: 'Criminal Law',
  CIVIL_RIGHTS: 'Civil Rights',
  IMMIGRATION: 'Immigration',
  DISABILITY: 'Disability Rights',
  BANKRUPTCY: 'Bankruptcy',
  SMALL_BUSINESS: 'Small Business',
} as const;

// Comprehensive Legal Resources Database
export const LEGAL_RESOURCES: LegalResource[] = [
  // Federal Resources
  {
    id: 'ftc-consumer-protection',
    title: 'Federal Trade Commission - Consumer Protection',
    description: 'Official FTC resources for consumer rights and protection against fraud',
    url: 'https://www.ftc.gov/consumer',
    type: 'government_agency',
    jurisdiction: 'us',
    category: RESOURCE_CATEGORIES.CONSUMER,
    isOfficial: true,
    lastUpdated: new Date('2024-01-01')
  },
  {
    id: 'eeoc-employment-discrimination',
    title: 'EEOC - Employment Discrimination',
    description: 'Equal Employment Opportunity Commission resources for workplace discrimination',
    url: 'https://www.eeoc.gov/',
    type: 'government_agency',
    jurisdiction: 'us',
    category: RESOURCE_CATEGORIES.EMPLOYMENT,
    isOfficial: true,
    lastUpdated: new Date('2024-01-01')
  },
  {
    id: 'hud-housing-discrimination',
    title: 'HUD - Fair Housing and Equal Opportunity',
    description: 'Department of Housing and Urban Development fair housing resources',
    url: 'https://www.hud.gov/program_offices/fair_housing_equal_opp',
    type: 'government_agency',
    jurisdiction: 'us',
    category: RESOURCE_CATEGORIES.HOUSING,
    isOfficial: true,
    lastUpdated: new Date('2024-01-01')
  },
  {
    id: 'dol-wage-hour',
    title: 'Department of Labor - Wage and Hour Division',
    description: 'Official DOL resources for wage and hour laws, overtime, and minimum wage',
    url: 'https://www.dol.gov/agencies/whd',
    type: 'government_agency',
    jurisdiction: 'us',
    category: RESOURCE_CATEGORIES.EMPLOYMENT,
    isOfficial: true,
    lastUpdated: new Date('2024-01-01')
  },
  {
    id: 'uscis-immigration',
    title: 'USCIS - Immigration Services',
    description: 'Official U.S. Citizenship and Immigration Services resources',
    url: 'https://www.uscis.gov/',
    type: 'government_agency',
    jurisdiction: 'us',
    category: RESOURCE_CATEGORIES.IMMIGRATION,
    isOfficial: true,
    lastUpdated: new Date('2024-01-01')
  },

  // Legal Aid Organizations
  {
    id: 'legal-aid-society',
    title: 'Legal Aid Society',
    description: 'Free legal services for low-income individuals and families',
    url: 'https://www.legalaid.org/',
    type: 'legal_aid',
    jurisdiction: 'us',
    category: RESOURCE_CATEGORIES.CIVIL_RIGHTS,
    isOfficial: false,
    lastUpdated: new Date('2024-01-01')
  },
  {
    id: 'nolo-legal-encyclopedia',
    title: 'Nolo Legal Encyclopedia',
    description: 'Comprehensive legal information and self-help resources',
    url: 'https://www.nolo.com/legal-encyclopedia',
    type: 'legal_aid',
    jurisdiction: 'us',
    category: RESOURCE_CATEGORIES.CONSUMER,
    isOfficial: false,
    lastUpdated: new Date('2024-01-01')
  },
  {
    id: 'aclu-know-your-rights',
    title: 'ACLU - Know Your Rights',
    description: 'American Civil Liberties Union civil rights resources',
    url: 'https://www.aclu.org/know-your-rights',
    type: 'legal_aid',
    jurisdiction: 'us',
    category: RESOURCE_CATEGORIES.CIVIL_RIGHTS,
    isOfficial: false,
    lastUpdated: new Date('2024-01-01')
  },

  // State-Specific Resources (California Example)
  {
    id: 'ca-tenant-rights',
    title: 'California Department of Consumer Affairs - Tenant Rights',
    description: 'Official California tenant rights and landlord-tenant law information',
    url: 'https://www.dca.ca.gov/publications/landlordbook/',
    type: 'government_agency',
    jurisdiction: 'ca',
    category: RESOURCE_CATEGORIES.HOUSING,
    isOfficial: true,
    lastUpdated: new Date('2024-01-01')
  },
  {
    id: 'ca-labor-commissioner',
    title: 'California Labor Commissioner',
    description: 'California Division of Labor Standards Enforcement resources',
    url: 'https://www.dir.ca.gov/dlse/',
    type: 'government_agency',
    jurisdiction: 'ca',
    category: RESOURCE_CATEGORIES.EMPLOYMENT,
    isOfficial: true,
    lastUpdated: new Date('2024-01-01')
  },

  // Court Resources
  {
    id: 'uscourts-self-help',
    title: 'U.S. Courts - Self-Help Resources',
    description: 'Federal court self-help resources and forms',
    url: 'https://www.uscourts.gov/forms',
    type: 'court',
    jurisdiction: 'us',
    category: RESOURCE_CATEGORIES.CIVIL_RIGHTS,
    isOfficial: true,
    lastUpdated: new Date('2024-01-01')
  },
  {
    id: 'small-claims-court-guide',
    title: 'Small Claims Court Guide',
    description: 'Comprehensive guide to filing small claims court cases',
    url: 'https://www.nolo.com/legal-encyclopedia/small-claims-court',
    type: 'court',
    jurisdiction: 'us',
    category: RESOURCE_CATEGORIES.CONSUMER,
    isOfficial: false,
    lastUpdated: new Date('2024-01-01')
  }
];

// Legal Citations Database
export const LEGAL_CITATIONS: LegalCitation[] = [
  {
    id: 'fair-debt-collection-practices-act',
    title: 'Fair Debt Collection Practices Act',
    citation: '15 U.S.C. § 1692',
    url: 'https://www.law.cornell.edu/uscode/text/15/chapter-41/subchapter-V',
    summary: 'Federal law regulating debt collection practices and protecting consumers from abusive debt collectors',
    jurisdiction: 'us',
    type: 'federal_law',
    relevantTopics: ['debt collection', 'consumer rights', 'harassment']
  },
  {
    id: 'fair-housing-act',
    title: 'Fair Housing Act',
    citation: '42 U.S.C. § 3601',
    url: 'https://www.law.cornell.edu/uscode/text/42/chapter-45',
    summary: 'Federal law prohibiting discrimination in housing based on protected characteristics',
    jurisdiction: 'us',
    type: 'federal_law',
    relevantTopics: ['housing discrimination', 'civil rights', 'landlord tenant']
  },
  {
    id: 'title-vii-civil-rights',
    title: 'Title VII of the Civil Rights Act',
    citation: '42 U.S.C. § 2000e',
    url: 'https://www.law.cornell.edu/uscode/text/42/chapter-21/subchapter-VI',
    summary: 'Federal law prohibiting employment discrimination based on protected characteristics',
    jurisdiction: 'us',
    type: 'federal_law',
    relevantTopics: ['employment discrimination', 'civil rights', 'workplace harassment']
  },
  {
    id: 'flsa-minimum-wage',
    title: 'Fair Labor Standards Act',
    citation: '29 U.S.C. § 201',
    url: 'https://www.law.cornell.edu/uscode/text/29/chapter-8',
    summary: 'Federal law establishing minimum wage, overtime pay, and child labor standards',
    jurisdiction: 'us',
    type: 'federal_law',
    relevantTopics: ['minimum wage', 'overtime', 'employment law', 'wage theft']
  },
  {
    id: 'ada-disability-rights',
    title: 'Americans with Disabilities Act',
    citation: '42 U.S.C. § 12101',
    url: 'https://www.law.cornell.edu/uscode/text/42/chapter-126',
    summary: 'Federal law prohibiting discrimination against individuals with disabilities',
    jurisdiction: 'us',
    type: 'federal_law',
    relevantTopics: ['disability rights', 'accommodation', 'civil rights', 'employment']
  }
];

export class LegalResourceService {
  static getResourcesByJurisdiction(jurisdiction: string): LegalResource[] {
    return LEGAL_RESOURCES.filter(resource => 
      resource.jurisdiction === jurisdiction || resource.jurisdiction === 'us'
    );
  }

  static getResourcesByCategory(category: string, jurisdiction?: string): LegalResource[] {
    let resources = LEGAL_RESOURCES.filter(resource => resource.category === category);
    
    if (jurisdiction) {
      resources = resources.filter(resource => 
        resource.jurisdiction === jurisdiction || resource.jurisdiction === 'us'
      );
    }
    
    return resources;
  }

  static getOfficialResources(jurisdiction?: string): LegalResource[] {
    let resources = LEGAL_RESOURCES.filter(resource => resource.isOfficial);
    
    if (jurisdiction) {
      resources = resources.filter(resource => 
        resource.jurisdiction === jurisdiction || resource.jurisdiction === 'us'
      );
    }
    
    return resources;
  }

  static searchResources(query: string, jurisdiction?: string): LegalResource[] {
    const searchTerms = query.toLowerCase().split(' ');
    
    let resources = LEGAL_RESOURCES.filter(resource => {
      const searchText = `${resource.title} ${resource.description} ${resource.category}`.toLowerCase();
      return searchTerms.some(term => searchText.includes(term));
    });

    if (jurisdiction) {
      resources = resources.filter(resource => 
        resource.jurisdiction === jurisdiction || resource.jurisdiction === 'us'
      );
    }

    return resources;
  }

  static getRelevantResources(topics: string[], jurisdiction?: string): LegalResource[] {
    const topicsLower = topics.map(topic => topic.toLowerCase());
    
    let resources = LEGAL_RESOURCES.filter(resource => {
      const resourceText = `${resource.title} ${resource.description} ${resource.category}`.toLowerCase();
      return topicsLower.some(topic => resourceText.includes(topic));
    });

    if (jurisdiction) {
      resources = resources.filter(resource => 
        resource.jurisdiction === jurisdiction || resource.jurisdiction === 'us'
      );
    }

    return resources;
  }
}

export class LegalCitationService {
  static getCitationsByJurisdiction(jurisdiction: string): LegalCitation[] {
    return LEGAL_CITATIONS.filter(citation => 
      citation.jurisdiction === jurisdiction || citation.jurisdiction === 'us'
    );
  }

  static searchCitations(query: string, jurisdiction?: string): LegalCitation[] {
    const searchTerms = query.toLowerCase().split(' ');
    
    let citations = LEGAL_CITATIONS.filter(citation => {
      const searchText = `${citation.title} ${citation.summary} ${citation.relevantTopics.join(' ')}`.toLowerCase();
      return searchTerms.some(term => searchText.includes(term));
    });

    if (jurisdiction) {
      citations = citations.filter(citation => 
        citation.jurisdiction === jurisdiction || citation.jurisdiction === 'us'
      );
    }

    return citations;
  }

  static getCitationsByTopic(topics: string[], jurisdiction?: string): LegalCitation[] {
    const topicsLower = topics.map(topic => topic.toLowerCase());
    
    let citations = LEGAL_CITATIONS.filter(citation => {
      return citation.relevantTopics.some(topic => 
        topicsLower.some(searchTopic => topic.toLowerCase().includes(searchTopic))
      );
    });

    if (jurisdiction) {
      citations = citations.filter(citation => 
        citation.jurisdiction === jurisdiction || citation.jurisdiction === 'us'
      );
    }

    return citations;
  }

  static formatCitation(citation: LegalCitation): string {
    return `${citation.title}, ${citation.citation}`;
  }
}

// Utility functions for legal topic extraction
export class LegalTopicExtractor {
  private static readonly TOPIC_KEYWORDS = {
    'landlord tenant': ['landlord', 'tenant', 'rent', 'lease', 'eviction', 'security deposit', 'housing'],
    'employment': ['employment', 'job', 'workplace', 'employer', 'employee', 'wage', 'salary', 'overtime', 'discrimination'],
    'consumer rights': ['consumer', 'purchase', 'warranty', 'refund', 'fraud', 'scam', 'debt collection'],
    'family law': ['divorce', 'custody', 'child support', 'marriage', 'adoption', 'domestic violence'],
    'criminal law': ['criminal', 'arrest', 'charges', 'court', 'police', 'rights'],
    'civil rights': ['discrimination', 'harassment', 'civil rights', 'equal protection', 'disability'],
    'immigration': ['immigration', 'visa', 'citizenship', 'deportation', 'asylum'],
    'bankruptcy': ['bankruptcy', 'debt', 'creditor', 'financial hardship'],
    'small business': ['business', 'contract', 'partnership', 'LLC', 'corporation', 'tax']
  };

  static extractTopics(text: string): string[] {
    const textLower = text.toLowerCase();
    const extractedTopics: string[] = [];

    Object.entries(this.TOPIC_KEYWORDS).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => textLower.includes(keyword))) {
        extractedTopics.push(topic);
      }
    });

    return extractedTopics;
  }

  static getRelevantResourcesForQuery(query: string, jurisdiction?: string): {
    resources: LegalResource[];
    citations: LegalCitation[];
  } {
    const topics = this.extractTopics(query);
    
    return {
      resources: LegalResourceService.getRelevantResources(topics, jurisdiction),
      citations: LegalCitationService.getCitationsByTopic(topics, jurisdiction)
    };
  }
}
