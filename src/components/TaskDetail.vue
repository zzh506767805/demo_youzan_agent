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
            <div v-if="subtask.status === '已完成'" class="subtask-result">
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
    </div>

    <template #footer>
      <div class="dialog-footer">
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
            评论并添加到会话
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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
    '已完成': 'success'
  }
  return status ? map[status] : 'primary'
}

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
</style> 