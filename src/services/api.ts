import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.legalease.frame';
const NEYNAR_API_KEY = import.meta.env.VITE_NEYNAR_API_KEY;
const AIRSTACK_API_KEY = import.meta.env.VITE_AIRSTACK_API_KEY;
const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

// API Clients
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const neynarClient = axios.create({
  baseURL: 'https://api.neynar.com/v2',
  headers: {
    'Content-Type': 'application/json',
    'api_key': NEYNAR_API_KEY,
  },
});

export const airstackClient = axios.create({
  baseURL: 'https://api.airstack.xyz/gql',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AIRSTACK_API_KEY}`,
  },
});

// Data Models
export interface User {
  farcasterId: string;
  walletAddress: string;
  jurisdiction: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Query {
  id: string;
  userId: string;
  queryString: string;
  jurisdiction: string;
  timestamp: Date;
  responseType: 'summary' | 'template' | 'steps';
  cost: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface LegalInformation {
  id: string;
  title: string;
  summary: string;
  detailedInfo: string;
  actionSteps: string[];
  jurisdiction: string;
  sourceLink: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  title: string;
  content: string;
  usageContext: string;
  jurisdiction: string;
  category: string;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API Services
export class UserService {
  static async createUser(userData: Partial<User>): Promise<User> {
    const response = await apiClient.post('/users', userData);
    return response.data;
  }

  static async getUser(farcasterId: string): Promise<User | null> {
    try {
      const response = await apiClient.get(`/users/${farcasterId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  static async updateUser(farcasterId: string, userData: Partial<User>): Promise<User> {
    const response = await apiClient.put(`/users/${farcasterId}`, userData);
    return response.data;
  }
}

export class QueryService {
  static async createQuery(queryData: Omit<Query, 'id' | 'timestamp' | 'status'>): Promise<Query> {
    const response = await apiClient.post('/queries', {
      ...queryData,
      timestamp: new Date(),
      status: 'pending',
    });
    return response.data;
  }

  static async getQuery(queryId: string): Promise<Query> {
    const response = await apiClient.get(`/queries/${queryId}`);
    return response.data;
  }

  static async getUserQueries(userId: string): Promise<Query[]> {
    const response = await apiClient.get(`/users/${userId}/queries`);
    return response.data;
  }

  static async updateQueryStatus(queryId: string, status: Query['status']): Promise<Query> {
    const response = await apiClient.patch(`/queries/${queryId}`, { status });
    return response.data;
  }
}

export class LegalInformationService {
  static async searchLegalInfo(query: string, jurisdiction: string): Promise<LegalInformation[]> {
    const response = await apiClient.get('/legal-info/search', {
      params: { query, jurisdiction },
    });
    return response.data;
  }

  static async getLegalInfo(id: string): Promise<LegalInformation> {
    const response = await apiClient.get(`/legal-info/${id}`);
    return response.data;
  }

  static async createLegalInfo(data: Omit<LegalInformation, 'id' | 'createdAt' | 'updatedAt'>): Promise<LegalInformation> {
    const response = await apiClient.post('/legal-info', data);
    return response.data;
  }
}

export class TemplateService {
  static async getTemplates(jurisdiction: string, category?: string): Promise<Template[]> {
    const response = await apiClient.get('/templates', {
      params: { jurisdiction, category },
    });
    return response.data;
  }

  static async getTemplate(id: string): Promise<Template> {
    const response = await apiClient.get(`/templates/${id}`);
    return response.data;
  }

  static async generateTemplate(templateId: string, variables: Record<string, string>): Promise<string> {
    const response = await apiClient.post(`/templates/${templateId}/generate`, { variables });
    return response.data.content;
  }
}

// Farcaster Integration
export class FarcasterService {
  static async getUserByFid(fid: number): Promise<any> {
    if (!NEYNAR_API_KEY) {
      throw new Error('Neynar API key not configured');
    }
    
    const response = await neynarClient.get(`/farcaster/user?fid=${fid}`);
    return response.data;
  }

  static async getCastsByUser(fid: number, limit = 25): Promise<any[]> {
    if (!NEYNAR_API_KEY) {
      throw new Error('Neynar API key not configured');
    }
    
    const response = await neynarClient.get(`/farcaster/casts?fid=${fid}&limit=${limit}`);
    return response.data.casts;
  }

  static async publishCast(text: string, parentHash?: string): Promise<any> {
    if (!NEYNAR_API_KEY) {
      throw new Error('Neynar API key not configured');
    }
    
    const response = await neynarClient.post('/farcaster/cast', {
      text,
      parent: parentHash,
    });
    return response.data;
  }
}

// Airstack Integration for additional data
export class AirstackService {
  static async getUserSocialData(address: string): Promise<any> {
    if (!AIRSTACK_API_KEY) {
      throw new Error('Airstack API key not configured');
    }
    
    const query = `
      query GetUserSocialData($address: Address!) {
        Socials(input: {filter: {userAssociatedAddresses: {_eq: $address}}, blockchain: ethereum}) {
          Social {
            dappName
            profileName
            profileDisplayName
            profileImage
            userAssociatedAddresses
          }
        }
      }
    `;
    
    const response = await airstackClient.post('', {
      query,
      variables: { address },
    });
    
    return response.data.data.Socials;
  }
}

// Payment Integration
export class PaymentService {
  static async createPaymentSession(amount: string, description: string): Promise<any> {
    const response = await apiClient.post('/payments/session', {
      amount,
      description,
    });
    return response.data;
  }

  static async verifyPayment(sessionId: string): Promise<boolean> {
    const response = await apiClient.get(`/payments/verify/${sessionId}`);
    return response.data.verified;
  }
}

// Error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      // Handle authentication errors
      console.error('Authentication failed');
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);
