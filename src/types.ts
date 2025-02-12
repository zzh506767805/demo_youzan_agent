export type TaskStatus = '待确认' | '进行中' | '待review' | '已完成'

export interface Task {
  id: number
  title: string
  status: TaskStatus
  description: string
  subtasks?: Task[]
  cost?: number
  expectedResults?: string[]
  successRate?: number
  successFactors?: string[]
  actualCost?: number
  phaseResults?: {
    completed: string[]
    pending: string[]
  }
  comments?: {
    id: number
    content: string
    timestamp: number
    action?: 'continue' | 'approve'
  }[]
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
  type?: 'thinking' | 'completed' | 'normal'
} 