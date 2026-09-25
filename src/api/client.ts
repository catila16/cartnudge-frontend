import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD ? '' : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000');

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AnalyticsSummary {
  recoveredRevenue: number;
  activeSessions: number;
  recoveryRate: number;
  estimatedCommission: number;
}

export interface LiveCart {
  id: string;
  phone: string;
  value: string;
  items: string[];
  status: string;
  timeElapsed: string;
}

export interface AISettings {
  tone: string;
  maxDiscount: number;
  quietHours: boolean;
}

export const getAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const response = await apiClient.get('/api/v1/analytics/summary');
  return response.data;
};

export const getActiveConversations = async (): Promise<LiveCart[]> => {
  const response = await apiClient.get('/api/v1/conversations/active');
  return response.data;
};

export const triggerTakeover = async (conversationId: string): Promise<any> => {
  const response = await apiClient.post(`/api/v1/conversations/${conversationId}/takeover`);
  return response.data;
};

export const getAISettings = async (): Promise<any> => {
  const response = await apiClient.get('/api/v1/settings');
  return response.data;
};

export const updateAISettings = async (settings: any): Promise<any> => {
  const response = await apiClient.put('/api/v1/settings', settings);
  return response.data;
};

export const simulateRecovery = async (): Promise<any> => {
  const response = await apiClient.post('/api/dashboard/simulate');
  return response.data;
};
