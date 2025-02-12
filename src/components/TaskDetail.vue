<template>
  <el-dialog
    v-model="dialogVisible"
    :title="task?.title"
    width="60%"
    class="task-detail-dialog"
  >
    <div class="task-info">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="任务状态">
          <el-tag :type="getStatusType(task?.status)">{{ task?.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ new Date(task?.id || 0).toLocaleString() }}
        </el-descriptions-item>
        <el-descriptions-item label="任务描述">
          {{ task?.description }}
        </el-descriptions-item>
        <el-descriptions-item label="预算成本">
          <div class="cost-info">
            <span class="amount">¥{{ task?.cost || '待评估' }}</span>
            <el-tooltip content="包含人力、资源和推广费用" placement="top">
              <el-icon><InfoFilled /></el-icon>
            </el-tooltip>
          </div>
        </el-descriptions-item>
        <el-descriptions-item v-if="task?.status === '已完成' || task?.status === '待review'" label="实际消耗">
          <div class="cost-info actual-cost">
            <span class="amount" :class="{ 'over-budget': isOverBudget }">
              ¥{{ task?.actualCost || 0 }}
            </span>
            <span class="budget-status" v-if="budgetDiff !== 0">
              {{ budgetDiff > 0 ? '超支' : '节省' }} ¥{{ Math.abs(budgetDiff) }}
            </span>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="预期结果">
          <div class="expected-results">
            <div v-if="task?.expectedResults?.length">
              <div v-for="(result, index) in task?.expectedResults" :key="index" class="result-item">
                <el-icon><Check /></el-icon>
                <span>{{ result }}</span>
              </div>
            </div>
            <span v-else>待评估</span>
          </div>
        </el-descriptions-item>
        <el-descriptions-item v-if="task?.status === '已完成' || task?.status === '待review'" label="阶段性结果">
          <div class="phase-results">
            <div v-if="task?.phaseResults?.completed.length" class="completed-results">
              <h5>已完成</h5>
              <div v-for="(result, index) in task.phaseResults.completed" 
                   :key="index" 
                   class="result-item success">
                <el-icon><Check /></el-icon>
                <span>{{ result }}</span>
              </div>
            </div>
            <div v-if="task?.phaseResults?.pending.length" class="pending-results">
              <h5>待完成</h5>
              <div v-for="(result, index) in task.phaseResults.pending" 
                   :key="index" 
                   class="result-item warning">
                <el-icon><Warning /></el-icon>
                <span>{{ result }}</span>
              </div>
            </div>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="成功率评估">
          <div class="success-rate">
            <el-progress 
              :percentage="task?.successRate || 0"
              :status="getSuccessRateStatus(task?.successRate)"
              :format="(percentage) => percentage ? `${percentage}%` : '待评估'"
            />
            <div class="rate-factors" v-if="task?.successFactors?.length">
              <div v-for="(factor, index) in task?.successFactors" :key="index" class="factor-item">
                <el-icon><Star /></el-icon>
                <span>{{ factor }}</span>
              </div>
            </div>
          </div>
        </el-descriptions-item>
      </el-descriptions>

      <div v-if="task?.subtasks?.length" class="subtasks-section">
        <h3>执行过程</h3>
        <el-timeline>
          <el-timeline-item
            v-for="subtask in task.subtasks"
            :key="subtask.id"
            :type="getStatusType(subtask.status)"
            :hollow="subtask.status === '待确认'"
            :timestamp="new Date(subtask.id).toLocaleString()"
          >
            <h4>{{ subtask.title }}</h4>
            <p>{{ subtask.description }}</p>
            <div v-if="subtask.status === '已完成' || subtask.status === '待review'" class="subtask-result">
              <h5>交付结果</h5>
              <div class="result-content">
                <el-descriptions :column="1" size="small" border>
                  <el-descriptions-item label="完成时间">
                    {{ new Date(subtask.id + 1000000).toLocaleString() }}
                  </el-descriptions-item>
                  <el-descriptions-item label="执行结果">
                    根据分析结果，{{ subtask.description }}已完成，并产生了显著效果。主要包括：
                    <ul>
                      <li>核心指标提升20%</li>
                      <li>用户反馈满意度95%</li>
                      <li>系统稳定性显著提升</li>
                    </ul>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>

      <div v-if="task?.comments?.length" class="comments-section">
        <h3>评审记录</h3>
        <div class="comments-list">
          <div v-for="comment in task.comments" :key="comment.id" class="comment-item">
            <div class="comment-header">
              <span class="comment-time">{{ new Date(comment.timestamp).toLocaleString() }}</span>
              <el-tag size="small" :type="comment.action === 'approve' ? 'success' : 'warning'">
                {{ comment.action === 'approve' ? '验收通过' : '继续执行' }}
              </el-tag>
            </div>
            <div class="comment-content">{{ comment.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <div v-if="task?.status === '待review'" class="review-actions">
          <div class="comment-input">
            <el-input
              v-model="commentText"
              type="textarea"
              :rows="2"
              placeholder="请输入您的评审意见..."
            />
          </div>
          <div class="button-group">
            <el-button @click="dialogVisible = false">关闭</el-button>
            <el-button type="warning" @click="submitReview('continue')">
              继续执行
            </el-button>
            <el-button type="success" @click="submitReview('approve')">
              确认验收
            </el-button>
          </div>
        </div>
        <div v-else class="normal-actions">
          <div class="comment-input">
            <el-input
              v-model="commentText"
              type="textarea"
              :rows="2"
              placeholder="请输入您对这个任务的评价..."
            />
          </div>
          <div class="button-group">
            <el-button @click="dialogVisible = false">关闭</el-button>
            <el-button type="primary" @click="addToChat">
              添加对齐
            </el-button>
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { InfoFilled, Check, Star, Warning } from '@element-plus/icons-vue'
import type { Task, TaskStatus } from '../types'

interface Props {
  modelValue: boolean
  task?: Task
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const commentText = ref('')

const getStatusType = (status?: TaskStatus): 'success' | 'warning' | 'primary' => {
  const map: Record<TaskStatus, 'success' | 'warning' | 'primary'> = {
    '待确认': 'warning',
    '进行中': 'primary',
    '待review': 'warning',
    '已完成': 'success'
  }
  return status ? map[status] : 'primary'
}

const getSuccessRateStatus = (rate?: number) => {
  if (!rate) return ''
  if (rate >= 80) return 'success'
  if (rate >= 60) return 'warning'
  return 'exception'
}

const budgetDiff = computed(() => {
  if (!props.task?.cost || !props.task?.actualCost) return 0
  return props.task.actualCost - props.task.cost
})

const isOverBudget = computed(() => budgetDiff.value > 0)

const addToChat = () => {
  if (!props.task) return
  
  const taskInfo = `任务"${props.task.title}"的详细信息：\n\n` +
    `状态：${props.task.status}\n` +
    `描述：${props.task.description}\n\n` +
    '子任务进展：\n' +
    props.task.subtasks?.map(subtask => 
      `- ${subtask.title}：${subtask.status}\n  ${subtask.description}`
    ).join('\n')
  
  const comment = commentText.value.trim()
  const message = comment 
    ? `${taskInfo}\n\n我的评价：\n${comment}`
    : taskInfo
  
  ElMessage.success('已添加到对话')
  dialogVisible.value = false
  commentText.value = ''
  
  // 触发自定义事件，让父组件添加消息
  emit('add-to-chat', message)
}

const submitReview = (action: 'continue' | 'approve') => {
  if (!props.task || !commentText.value.trim()) {
    ElMessage.warning('请输入评审意见')
    return
  }

  if (action === 'approve' && props.task) {
    props.task.status = '已完成'
  } else if (action === 'continue' && props.task) {
    props.task.status = '进行中'
  }

  const comment = {
    id: Date.now(),
    content: commentText.value,
    timestamp: Date.now(),
    action
  }

  if (!props.task.comments) {
    props.task.comments = []
  }
  props.task.comments.push(comment)

  ElMessage.success(action === 'approve' ? '已确认验收' : '已提交反馈')
  dialogVisible.value = false
  commentText.value = ''
}

const handleApprove = () => {
  if (props.task) {
    props.task.status = '已完成'
    ElMessage.success('任务评审通过')
    dialogVisible.value = false
  }
}

const handleReject = () => {
  if (props.task) {
    props.task.status = '进行中'
    ElMessage.warning('任务已驳回，请修改后重新提交')
    dialogVisible.value = false
  }
}
</script>

<style scoped>
.task-detail-dialog {
  border-radius: 8px;
}

.task-info {
  padding: 20px;
}

.subtasks-section {
  margin-top: 30px;
}

.subtasks-section h3 {
  margin-bottom: 20px;
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 600;
}

.subtask-result {
  margin-top: 12px;
  padding: 12px;
  background-color: var(--el-color-success-light-9);
  border-radius: 4px;
}

.subtask-result h5 {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--text-primary);
}

.result-content {
  font-size: 14px;
}

:deep(.el-timeline-item__node) {
  width: 12px;
  height: 12px;
}

:deep(.el-timeline-item__content) {
  h4 {
    color: var(--text-primary);
    margin: 0 0 10px 0;
    font-size: 16px;
  }
  
  p {
    color: var(--text-regular);
    margin: 0;
    font-size: 14px;
  }
}

:deep(.el-descriptions__cell) {
  padding: 12px 16px;
}

.dialog-footer {
  padding: 20px 0 0;
}

.comment-input {
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cost-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cost-info .amount {
  font-size: 16px;
  font-weight: 500;
  color: var(--el-color-danger);
}

.expected-results {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--el-color-success);
}

.success-rate {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rate-factors {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  padding-left: 8px;
  border-left: 2px solid var(--el-color-primary-light-8);
}

.factor-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-regular);
}

.factor-item .el-icon {
  color: var(--el-color-warning);
}

.phase-results {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.completed-results,
.pending-results {
  h5 {
    margin: 0 0 8px;
    font-size: 14px;
    font-weight: 500;
  }
}

.result-item {
  &.success {
    color: var(--el-color-success);
  }
  
  &.warning {
    color: var(--el-color-warning);
  }
}

.actual-cost {
  .amount.over-budget {
    color: var(--el-color-danger);
  }
  
  .budget-status {
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
    background-color: var(--el-color-danger-light-9);
    color: var(--el-color-danger);
  }
}

.comments-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--el-border-color-light);
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-item {
  background-color: var(--el-color-info-light-9);
  border-radius: 4px;
  padding: 12px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.comment-time {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.comment-content {
  font-size: 14px;
  color: var(--el-text-color-primary);
  line-height: 1.5;
}

.review-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style> 