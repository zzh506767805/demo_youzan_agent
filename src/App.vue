<template>
  <el-container class="app-container">
    <el-header class="header glass-effect">
      <div class="header-content">
        <h1>
          <span class="shop-name">结绳记事</span>
          <span class="shop-status">有赞智能体全托管中</span>
        </h1>
        <p class="subtitle">智能店铺托管 · 数据分析 · 增长引擎</p>
      </div>
    </el-header>
    
    <el-container class="main-container">
      <el-main>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="chat-container glass-effect">
              <div class="chat-messages" ref="chatContainer">
                <div v-for="(msg, index) in messages" :key="index" 
                     :class="['message', msg.role]">
                  <template v-if="msg.type === 'thinking'">
                    <div class="thinking-message">
                      <el-icon class="thinking-icon"><Loading /></el-icon>
                      {{ msg.content }}
                    </div>
                  </template>
                  <template v-else-if="msg.type === 'completed'">
                    <div class="thinking-message">
                      <el-icon class="success-icon"><Check /></el-icon>
                      {{ msg.content }}
                    </div>
                  </template>
                  <template v-else>
                    {{ msg.content }}
                  </template>
                </div>
              </div>
              <div class="chat-input">
                <el-input
                  v-model="userInput"
                  placeholder="请输入您的需求..."
                  :rows="3"
                  type="textarea"
                  @keyup.enter="sendMessage"
                />
                <el-button type="primary" :loading="isProcessing" @click="sendMessage">
                  {{ isProcessing ? '处理中...' : '发送' }}
                </el-button>
              </div>
            </div>
          </el-col>
          
          <el-col :span="12">
            <div class="tasks-container glass-effect">
              <h2>任务列表</h2>
              <div class="task-list">
                <div v-for="group in taskGroups" :key="group.id" class="task-group">
                  <h3 class="task-group-title">{{ group.title }}</h3>
                  <p class="task-group-desc">{{ group.description }}</p>
                  <el-table 
                    :data="group.tasks" 
                    style="width: 100%"
                    @row-click="handleTaskClick"
                  >
                    <el-table-column prop="title" label="任务名称" />
                    <el-table-column prop="status" label="状态" width="100">
                      <template #default="scope">
                        <el-tag :type="getStatusType(scope.row.status)">
                          {{ scope.row.status }}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="160">
                      <template #default="scope">
                        <el-button-group>
                          <el-button
                            size="small"
                            @click.stop="confirmTask(scope.row)"
                            :disabled="scope.row.status !== '待确认'"
                          >
                            确认
                          </el-button>
                          <el-button
                            size="small"
                            type="danger"
                            @click.stop="deleteTask(scope.row)"
                            :disabled="scope.row.status === '进行中'"
                          >
                            删除
                          </el-button>
                        </el-button-group>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>

  <TaskDetail 
    v-model="showTaskDetail" 
    :task="selectedTask" 
    @add-to-chat="addTaskDetailToChat"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import type { Ref } from 'vue'
import { Loading, Check } from '@element-plus/icons-vue'
import TaskDetail from './components/TaskDetail.vue'
import type { Task, TaskGroup } from './types'

// 待处理的任务数据
const pendingTaskGroups: TaskGroup[] = [
  {
    id: 2,
    title: '双十一战略规划',
    description: '双十一活动整体规划与执行',
    tasks: [
      {
        id: Date.now() - 1000,
        title: '双十一预热活动策划',
        status: '已完成',
        description: '制定双十一预热期间的活动方案和预算规划',
        subtasks: [
          {
            id: Date.now() - 999,
            title: '直播预告策划',
            status: '已完成',
            description: '规划双十一期间的直播场次和主题'
          },
          {
            id: Date.now() - 998,
            title: '预售商品选品',
            status: '已完成',
            description: '筛选双十一预售的主推商品和价格策略'
          }
        ]
      },
      {
        id: Date.now(),
        title: '双十一主会场筹备',
        status: '待确认',
        description: '策划双十一当天的主会场活动和玩法设计',
        subtasks: [
          {
            id: Date.now() + 1,
            title: '会场活动规划',
            status: '待确认',
            description: '设计主会场的活动机制和奖励方案'
          },
          {
            id: Date.now() + 2,
            title: '流量分配方案',
            status: '待确认',
            description: '制定各时段的流量投放策略和预算分配'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: '问题诊断与优化',
    description: '店铺问题分析与解决方案',
    tasks: [
      {
        id: Date.now() + 300,
        title: '跌幅原因定位',
        status: '待确认',
        description: '分析近期销售下滑原因并制定改善方案',
        subtasks: [
          {
            id: Date.now() + 301,
            title: '数据异常分析',
            status: '待确认',
            description: '定位销售下滑的具体环节和原因'
          },
          {
            id: Date.now() + 302,
            title: '竞品对比分析',
            status: '待确认',
            description: '分析竞品表现及市场变化'
          }
        ]
      },
      {
        id: Date.now() + 400,
        title: '用户体验优化',
        status: '待确认',
        description: '优化店铺用户体验，提升购物体验',
        subtasks: [
          {
            id: Date.now() + 401,
            title: '用户反馈分析',
            status: '待确认',
            description: '收集和分析用户反馈意见'
          },
          {
            id: Date.now() + 402,
            title: '体验优化方案',
            status: '待确认',
            description: '制定用户体验优化方案'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: '智能营销方案',
    description: '基于AI的精准营销策略',
    tasks: [
      {
        id: Date.now() + 500,
        title: '用户画像分析',
        status: '待确认',
        description: '构建精准用户画像，制定个性化营销策略',
        subtasks: [
          {
            id: Date.now() + 501,
            title: '用户行为分析',
            status: '待确认',
            description: '分析用户浏览、购买等行为特征'
          },
          {
            id: Date.now() + 502,
            title: '标签体系构建',
            status: '待确认',
            description: '建立多维度用户标签体系'
          }
        ]
      },
      {
        id: Date.now() + 600,
        title: '智能投放优化',
        status: '待确认',
        description: '优化广告投放策略和预算分配',
        subtasks: [
          {
            id: Date.now() + 601,
            title: 'ROI分析',
            status: '待确认',
            description: '分析各渠道投放效果和投资回报'
          },
          {
            id: Date.now() + 602,
            title: '智能出价策略',
            status: '待确认',
            description: '制定基于AI的智能竞价方案'
          }
        ]
      }
    ]
  }
]

// 已完成的任务数据
const completedTaskGroups: TaskGroup[] = [
  {
    id: 1,
    title: '日常数据分析',
    description: '店铺核心指标监控与分析',
    tasks: [
      {
        id: Date.now() - 2000,
        title: '流量转化分析',
        status: '已完成',
        description: '分析店铺流量来源及转化路径',
        subtasks: [
          {
            id: Date.now() - 1999,
            title: '流量来源分析',
            status: '已完成',
            description: '分析各渠道流量占比及质量'
          },
          {
            id: Date.now() - 1998,
            title: '转化路径优化',
            status: '已完成',
            description: '优化用户购买路径，提升转化率'
          }
        ]
      },
      {
        id: Date.now() - 1500,
        title: '商品销售分析',
        status: '已完成',
        description: '分析商品销售情况及趋势',
        subtasks: [
          {
            id: Date.now() - 1499,
            title: '销售趋势分析',
            status: '已完成',
            description: '分析商品销售走势及影响因素'
          },
          {
            id: Date.now() - 1498,
            title: '商品结构优化',
            status: '已完成',
            description: '优化商品结构，提升整体坪效'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: '店铺基础建设',
    description: '店铺基础能力提升与优化',
    tasks: [
      {
        id: Date.now() - 3000,
        title: '商品标准化',
        status: '已完成',
        description: '优化商品信息展示和规格体系',
        subtasks: [
          {
            id: Date.now() - 2999,
            title: '商品资料规范',
            status: '已完成',
            description: '统一商品描述、规格等信息标准'
          },
          {
            id: Date.now() - 2998,
            title: '商品图片优化',
            status: '已完成',
            description: '提升商品主图和详情页质量'
          }
        ]
      },
      {
        id: Date.now() - 2500,
        title: '物流体系优化',
        status: '已完成',
        description: '提升物流配送效率和客户体验',
        subtasks: [
          {
            id: Date.now() - 2499,
            title: '仓储布局优化',
            status: '已完成',
            description: '优化仓储分布，提升配送效率'
          },
          {
            id: Date.now() - 2498,
            title: '配送时效提升',
            status: '已完成',
            description: '缩短订单处理和配送时间'
          }
        ]
      }
    ]
  }
]

// 响应式状态
const messages = ref<Array<{type: string, content: string, role?: string}>>([])
const userInput = ref('')
const taskGroups = ref<TaskGroup[]>([])
const chatContainer = ref<HTMLElement | null>(null)
const isProcessing = ref(false)
const showTaskDetail = ref(false)
const selectedTask = ref<Task | null>(null)

// 常量定义
const thinkingSteps = [
  '正在分析店铺属性...',
  '正在调研历史方案...',
  '正在定制个性化策略...',
  '正在生成执行计划...'
] as const

// 方法定义
const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const addThinkingMessage = async (step: string) => {
  messages.value.push({
    type: 'thinking',
    content: step
  })
  await scrollToBottom()
  await new Promise(resolve => setTimeout(resolve, 1000))
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isProcessing.value) return
  
  isProcessing.value = true
  
  // 添加用户消息
  messages.value.push({
    type: 'normal',
    content: userInput.value
  })
  
  await scrollToBottom()
  
  // 清空输入
  userInput.value = ''
  
  // 模拟AI思考过程
  for (const step of thinkingSteps) {
    await addThinkingMessage(step)
  }
  
  // 将所有 thinking 消息转换为完成状态
  messages.value = messages.value.map((msg: {type: string, content: string}) => 
    msg.type === 'thinking' ? { ...msg, type: 'completed' } : msg
  )
  
  await scrollToBottom()
  
  // 模拟AI响应
  messages.value.push({
    type: 'normal',
    content: '根据您的需求，我已为您制定了一套完整的双十一活动方案。主要包含以下几个方向：\n\n1. 主会场筹备：设计主会场活动机制，包括限时秒杀、满减优惠、积分翻倍等玩法，并制定各时段的流量投放策略。\n\n2. 直播运营：安排全天24场直播，包括0点、早10点、晚8点等黄金时段的头部主播场次，以及商品上架节奏和价格策略。\n\n3. 售后保障：扩充客服团队运力，优化物流配送方案，确保双十一期间的服务质量。\n\n您可以在右侧任务列表中查看各个环节的具体执行计划。需要我重点说明某个环节吗？'
  })
  
  await scrollToBottom()
  
  // 清空并重新设置任务列表，先添加待处理任务，再添加已完成任务
  taskGroups.value = []
  await nextTick()
  taskGroups.value = [...pendingTaskGroups, ...completedTaskGroups]
  
  isProcessing.value = false
}

const confirmTask = (task: Task) => {
  task.status = '进行中'
  ElMessage.success('任务已确认，开始执行')
  
  // 模拟任务完成
  setTimeout(() => {
    task.status = '已完成'
    ElMessage.success('任务已完成')
  }, 3000)
}

const deleteTask = (task: Task) => {
  taskGroups.value = taskGroups.value.map((group: TaskGroup) => ({
    ...group,
    tasks: group.tasks.filter((t: Task) => t.id !== task.id)
  }))
  ElMessage.success('任务已删除')
}

const handleTaskClick = (task: Task) => {
  selectedTask.value = task
  showTaskDetail.value = true
}

const getStatusType = (status: string): 'success' | 'warning' | 'primary' => {
  const map: Record<string, 'success' | 'warning' | 'primary'> = {
    '待确认': 'warning',
    '进行中': 'primary',
    '已完成': 'success'
  }
  return map[status]
}

const addTaskDetailToChat = (message: string) => {
  messages.value.push({
    type: 'normal',
    content: message
  })
  scrollToBottom()
}

// 生命周期钩子
onMounted(() => {
  // 添加全局错误处理
  window.onerror = function(message, source, lineno, colno, error) {
    console.error('Global error:', { message, source, lineno, colno, error });
    ElMessage.error(`加载出错：${message}`);
  };

  // 添加未处理的 Promise 错误处理
  window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    ElMessage.error(`Promise 错误：${event.reason}`);
  });

  // 初始化时只显示已完成的任务
  taskGroups.value = [...completedTaskGroups]
  
  messages.value.push({
    type: 'normal',
    content: '您好！我是您的AI电商助手。距离双十一大促还有不到一个月的时间，我可以帮您制定活动方案、优化运营策略、协调资源调配等。请告诉我您需要什么帮助？'
  })

  // 添加版本信息
  console.log('App version:', import.meta.env.VITE_APP_VERSION);
  console.log('Environment:', import.meta.env.MODE);
})

// 暴露属性和方法
defineExpose({
  messages,
  userInput,
  taskGroups,
  isProcessing,
  showTaskDetail,
  selectedTask,
  sendMessage,
  confirmTask,
  deleteTask,
  handleTaskClick,
  getStatusType
})
</script>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  padding: 0 40px;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 80px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.header h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.shop-name {
  background: linear-gradient(135deg, #1677ff 0%, #0f56b3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.shop-status {
  font-size: 14px;
  color: var(--el-color-success);
  font-weight: normal;
  letter-spacing: 0;
  background: var(--el-color-success-light-9);
  padding: 4px 12px;
  border-radius: 4px;
  -webkit-text-fill-color: var(--el-color-success);
}

.subtitle {
  font-size: 14px;
  color: var(--text-regular);
  margin: 4px 0 0;
  opacity: 0.8;
  letter-spacing: 0.5px;
}

.main-container {
  flex: 1;
  overflow: hidden;
  padding: 20px;
}

.chat-container {
  height: 70vh;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
}

.message {
  margin-bottom: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  max-width: 80%;
  line-height: 1.5;
}

.message.user {
  background-color: var(--primary-color);
  color: white;
  margin-left: auto;
}

.message.assistant {
  background-color: white;
  margin-right: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.thinking-message {
  display: flex;
  align-items: center;
  gap: 8px;
}

.thinking-icon {
  animation: rotating 2s linear infinite;
}

.success-icon {
  color: var(--el-color-success);
}

.chat-input {
  padding: 20px;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 10px;
  background-color: white;
}

.tasks-container {
  height: 70vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tasks-container h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-primary);
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.task-group {
  margin-bottom: 30px;
}

.task-group-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--text-primary);
}

.task-group-desc {
  font-size: 14px;
  color: var(--text-regular);
  margin: 0 0 16px;
}

:deep(.el-table) {
  background-color: transparent;
  margin-bottom: 20px;
  
  th {
    background-color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
  }
  
  tr {
    background-color: transparent;
    cursor: pointer;
  }

  .el-table__row {
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}

.task-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
}
</style> 