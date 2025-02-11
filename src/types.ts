export type TaskStatus = '待确认' | '进行中' | '已完成'

export interface Task {
  id: number
  title: string
  status: TaskStatus
  description: string
  subtasks?: Task[]
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
  type?: 'thinking' | 'completed' | 'normal'
} 