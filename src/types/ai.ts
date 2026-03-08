export type AIModuleId = 'news' | 'moderation' | 'seo' | 'content' | 'analytics' | 'security';

export type AITaskStatus = 'new' | 'in_progress' | 'needs_approval' | 'approved' | 'rejected' | 'completed';

export type AITaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface AIModule {
  id: AIModuleId;
  name: string;
  description: string;
  enabled: boolean;
  autonomyLevel: 'manual' | 'semi' | 'auto';
  requireApproval: boolean;
  dailyTaskLimit: number;
  logging: boolean;
}

export interface AITask {
  id: string;
  moduleId: AIModuleId;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: AITaskStatus;
  priority: AITaskPriority;
  needsApproval: boolean;
  result?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectedReason?: string;
}

export interface AILogEntry {
  id: string;
  moduleId: AIModuleId;
  action: string;
  details: string;
  timestamp: string;
  result: 'success' | 'error' | 'pending';
  approvedBy?: string;
}

export interface AISettings {
  globalAutoPublishDisabled: boolean;
  globalApprovalRequired: boolean;
  loggingEnabled: boolean;
  notificationsEnabled: boolean;
}

export const AI_MODULE_LABELS: Record<AIModuleId, string> = {
  news: 'AI News Editor',
  moderation: 'AI Moderation',
  seo: 'AI SEO Engine',
  content: 'AI Content Generator',
  analytics: 'AI Analytics',
  security: 'AI Security',
};

export const AI_STATUS_LABELS: Record<AITaskStatus, string> = {
  new: 'Новая',
  in_progress: 'В работе',
  needs_approval: 'Требует подтверждения',
  approved: 'Подтверждена',
  rejected: 'Отклонена',
  completed: 'Завершена',
};

export const AI_PRIORITY_LABELS: Record<AITaskPriority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  critical: 'Критический',
};
