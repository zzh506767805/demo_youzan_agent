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
                    <div class="thinking-message" @click="toggleThinkingDetail(index)">
                      <el-icon class="thinking-icon"><Loading /></el-icon>
                      {{ msg.content }}
                      <el-icon class="expand-icon" :class="{ 'is-expanded': msg.isExpanded }">
                        <ArrowDown />
                      </el-icon>
                      <div v-if="msg.isExpanded" class="thinking-detail">
                        <div class="thinking-step">
                          <div class="step-title">数据分析</div>
                          <div class="step-content">
                            <template v-if="msg.type === 'thinking'">
                              我正在分析您店铺近3个月的数据...发现上个双十一期间爆款商品的转化率达到15%，远高于平常的5%。所以今年我们要重点关注这些商品的库存和价格策略...
                            </template>
                            <template v-else>
                              ✓ 通过分析发现，您店铺的优势品类是美妆和服饰，其中口红和连衣裙的复购率最高。建议在这两个品类重点发力，可以带动整体销售增长。
                            </template>
                          </div>
                        </div>
                        <div class="thinking-step">
                          <div class="step-title">竞品对标</div>
                          <div class="step-content">
                            <template v-if="msg.type === 'thinking'">
                              看到竞争对手已经开始预热了，他们主打"买贵必赔"策略...这个力度不小，我们需要想办法差异化...正在思考更有竞争力的方案...
                            </template>
                            <template v-else>
                              ✓ 分析了TOP3竞品的活动策略，他们都主打价格战。我们可以突出"品质+服务"差异，推出"品质联盟"和"极速达"服务，这样能避免陷入价格战。
                            </template>
                          </div>
                        </div>
                        <div class="thinking-step">
                          <div class="step-title">方案优化</div>
                          <div class="step-content">
                            <template v-if="msg.type === 'thinking'">
                              结合数据和竞品分析，我在思考如何平衡利润和增长...正在测算各种促销方案的ROI...看起来"满减+积分翻倍"的组合效果最好...
                            </template>
                            <template v-else>
                              ✓ 最终敲定了"满减+积分翻倍+品质联盟"的组合策略。这样既能确保15%以上的毛利，又能提供有竞争力的价格，预计可以带来50%的GMV增长。
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else-if="msg.type === 'completed'">
                    <div class="thinking-message" @click="toggleThinkingDetail(index)">
                      <el-icon class="success-icon"><Check /></el-icon>
                      {{ msg.content }}
                      <el-icon class="expand-icon" :class="{ 'is-expanded': msg.isExpanded }">
                        <ArrowDown />
                      </el-icon>
                      <div v-if="msg.isExpanded" class="thinking-detail">
                        <div class="thinking-step">
                          <div class="step-title">数据分析</div>
                          <div class="step-content">
                            <template v-if="msg.type === 'thinking'">
                              我正在分析您店铺近3个月的数据...发现上个双十一期间爆款商品的转化率达到15%，远高于平常的5%。所以今年我们要重点关注这些商品的库存和价格策略...
                            </template>
                            <template v-else>
                              ✓ 通过分析发现，您店铺的优势品类是美妆和服饰，其中口红和连衣裙的复购率最高。建议在这两个品类重点发力，可以带动整体销售增长。
                            </template>
                          </div>
                        </div>
                        <div class="thinking-step">
                          <div class="step-title">竞品对标</div>
                          <div class="step-content">
                            <template v-if="msg.type === 'thinking'">
                              看到竞争对手已经开始预热了，他们主打"买贵必赔"策略...这个力度不小，我们需要想办法差异化...正在思考更有竞争力的方案...
                            </template>
                            <template v-else>
                              ✓ 分析了TOP3竞品的活动策略，他们都主打价格战。我们可以突出"品质+服务"差异，推出"品质联盟"和"极速达"服务，这样能避免陷入价格战。
                            </template>
                          </div>
                        </div>
                        <div class="thinking-step">
                          <div class="step-title">方案优化</div>
                          <div class="step-content">
                            <template v-if="msg.type === 'thinking'">
                              结合数据和竞品分析，我在思考如何平衡利润和增长...正在测算各种促销方案的ROI...看起来"满减+积分翻倍"的组合效果最好...
                            </template>
                            <template v-else>
                              ✓ 最终敲定了"满减+积分翻倍+品质联盟"的组合策略。这样既能确保15%以上的毛利，又能提供有竞争力的价格，预计可以带来50%的GMV增长。
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="message-content">
                      <template v-if="msg.role === 'assistant' && msg.content.includes('【主会场活动】')">
                        <div class="task-cards">
                          <div class="task-intro">关于双十一主会场的活动规划，我们重点打造了三重权益叠加的活动机制。通过限时特惠、满减和积分激励，全方位提升用户的购物体验：</div>
                          <div class="task-card" @click="handleTaskCardClick('主会场活动机制')">
                            <h4>主会场活动</h4>
                            <div class="task-card-items">
                              <div class="task-card-item">
                                <div class="item-title">限时秒杀</div>
                                <div class="item-desc">整点准时开抢，手快有，手慢无，限量100件哦</div>
                              </div>
                              <div class="task-card-item">
                                <div class="item-title">满减优惠</div>
                                <div class="item-desc">买得多省得多，最高可省500元呢</div>
                              </div>
                              <div class="task-card-item">
                                <div class="item-title">积分翻倍</div>
                                <div class="item-desc">下单就送双倍积分，囤货好时机</div>
                              </div>
                            </div>
                          </div>

                          <div class="task-intro">在直播运营方面，我们将全天候为用户带来优质内容。根据用户的购物习惯，我们特别策划了以下重点场次：</div>
                          <div class="task-card" @click="handleTaskCardClick('直播运营计划')">
                            <h4>直播运营</h4>
                            <div class="task-card-items">
                              <div class="task-card-item">
                                <div class="item-title">重点场次</div>
                                <div class="item-desc">0点开抢、早10点上班族专场、晚8点压轴好戏</div>
                              </div>
                              <div class="task-card-item">
                                <div class="item-title">主播资源</div>
                                <div class="item-desc">王牌主播轮番上阵，带货实力杠杠的</div>
                              </div>
                              <div class="task-card-item">
                                <div class="item-title">商品上架</div>
                                <div class="item-desc">爆品好货不断，一波接一波</div>
                              </div>
                            </div>
                          </div>

                          <div class="task-intro">为确保活动效果最大化，我们制定了完整的预热方案。从预售到正式开启，每个环节都经过精心安排：</div>
                          <div class="task-card" @click="handleTaskCardClick('预热活动安排')">
                            <h4>预热活动</h4>
                            <div class="task-card-items">
                              <div class="task-card-item">
                                <div class="item-title">预售开启</div>
                                <div class="item-desc">10月25日开抢，提前加购更优惠</div>
                              </div>
                              <div class="task-card-item">
                                <div class="item-title">直播预告</div>
                                <div class="item-desc">10月31日剧透好物，先睹为快</div>
                              </div>
                              <div class="task-card-item">
                                <div class="item-title">店铺改版</div>
                                <div class="item-desc">11月1日焕新亮相，惊喜满满</div>
                              </div>
                            </div>
                          </div>

                          <div class="task-intro">针对大促期间的服务保障，我们从人力配置到物流支持都做了全面升级，具体包含以下几个方面：</div>
                          <div class="task-card" @click="handleTaskCardClick('售后保障计划')">
                            <h4>售后保障</h4>
                            <div class="task-card-items">
                              <div class="task-card-item">
                                <div class="item-title">客服扩充</div>
                                <div class="item-desc">客服小姐姐增援50%，响应更快啦</div>
                              </div>
                              <div class="task-card-item">
                                <div class="item-title">物流优化</div>
                                <div class="item-desc">三大快递强强联手，送货更给力</div>
                              </div>
                              <div class="task-card-item">
                                <div class="item-title">退换无忧</div>
                                <div class="item-desc">7天无理由退换，购物更放心</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        {{ msg.content }}
                      </template>
                    </div>
                    <div v-if="showAlignButton && index === messages.length - 1" 
                         class="align-button">
                      <el-button type="primary" @click="startAlign">
                        开始对齐
                      </el-button>
                    </div>
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
import { Loading, Check, ArrowDown } from '@element-plus/icons-vue'
import TaskDetail from './components/TaskDetail.vue'
import type { Task, TaskGroup } from './types'

// 待处理的任务数据
const pendingTaskGroups: TaskGroup[] = [
  {
    id: 2,
    title: '双十一战略规划',
    description: '双十一活动整体规划与执行',
    cost: 100000,
    expectedResults: [
      'GMV提升50%',
      '新客转化率提升30%',
      '老客复购率提升20%'
    ],
    successRate: 85,
    successFactors: [
      '历史数据支持',
      '竞品策略分析',
      '用户调研反馈'
    ],
    tasks: [
      {
        id: Date.now(),
        title: '主会场活动机制',
        status: '待确认',
        description: '设计主会场的活动机制和优惠方案',
        cost: 50000,
        expectedResults: [
          'GMV提升50%',
          '新客转化率提升30%',
          '老客复购率提升20%'
        ],
        successRate: 85,
        successFactors: [
          '历史数据支持',
          '竞品策略分析',
          '用户调研反馈'
        ],
        subtasks: [
          {
            id: Date.now() + 1,
            title: '限时秒杀设置',
            status: '待确认',
            description: '每整点开启秒杀活动，限量100件',
            cost: 15000,
            expectedResults: ['秒杀转化率达到30%']
          },
          {
            id: Date.now() + 2,
            title: '满减优惠方案',
            status: '待确认',
            description: '设置满1000减100，最高减500的优惠',
            cost: 20000,
            expectedResults: ['客单价提升20%']
          }
        ]
      },
      {
        id: Date.now() + 100,
        title: '直播运营计划',
        status: '待确认',
        description: '策划全天24场直播的排期和资源配置',
        cost: 80000,
        expectedResults: [
          '直播间总流量提升100%',
          '直播转化率达到8%',
          '粉丝增长10万+'
        ],
        successRate: 75,
        successFactors: [
          '优质主播资源',
          '爆品组货策略',
          '直播间氛围营造'
        ],
        subtasks: [
          {
            id: Date.now() + 101,
            title: '主播排期安排',
            status: '待确认',
            description: '安排全天24场直播的主播档期',
            cost: 30000,
            expectedResults: ['主播档期排满率达到95%']
          },
          {
            id: Date.now() + 102,
            title: '商品场次规划',
            status: '待确认',
            description: '规划各场直播的商品上架节奏',
            cost: 25000,
            expectedResults: ['场均销售转化率达到5%']
          },
          {
            id: Date.now() + 103,
            title: '直播间氛围布置',
            status: '待确认',
            description: '设计直播间视觉和互动玩法',
            cost: 25000,
            expectedResults: ['直播间互动率提升50%']
          }
        ]
      },
      {
        id: Date.now() + 200,
        title: '预热活动安排',
        status: '待确认',
        description: '制定双十一预热期间的活动节奏',
        cost: 30000,
        expectedResults: [
          '预售转化率达到30%',
          '加购商品数增长40%',
          '品牌声量提升50%'
        ],
        successRate: 90,
        successFactors: [
          '精准投放策略',
          '预售优惠力度',
          '社媒矩阵传播'
        ],
        subtasks: [
          {
            id: Date.now() + 201,
            title: '预售商品筛选',
            status: '待确认',
            description: '筛选和设置预售商品清单',
            cost: 10000,
            expectedResults: ['预售商品转化率达到25%']
          },
          {
            id: Date.now() + 202,
            title: '社媒预热传播',
            status: '待确认',
            description: '制定社交媒体预热传播方案',
            cost: 12000,
            expectedResults: ['预热期间品牌声量提升30%']
          },
          {
            id: Date.now() + 203,
            title: '店铺视觉改版',
            status: '待确认',
            description: '设计和实施店铺双十一主题改版',
            cost: 8000,
            expectedResults: ['店铺浏览转化率提升20%']
          }
        ]
      },
      {
        id: Date.now() + 300,
        title: '售后保障计划',
        status: '待确认',
        description: '制定完善的售后服务保障方案',
        cost: 40000,
        expectedResults: [
          '客诉率控制在1%以内',
          '售后响应时间缩短50%',
          '物流时效提升30%'
        ],
        successRate: 95,
        successFactors: [
          '客服团队扩充',
          '物流资源储备',
          '系统自动化升级'
        ],
        subtasks: [
          {
            id: Date.now() + 301,
            title: '客服团队扩充',
            status: '待确认',
            description: '招募和培训临时客服团队',
            cost: 15000,
            expectedResults: ['客服响应时间缩短至30秒内']
          },
          {
            id: Date.now() + 302,
            title: '物流仓储优化',
            status: '待确认',
            description: '优化仓储布局和发货流程',
            cost: 15000,
            expectedResults: ['发货时效提升40%']
          },
          {
            id: Date.now() + 303,
            title: '售后系统升级',
            status: '待确认',
            description: '升级售后工单和退换货系统',
            cost: 10000,
            expectedResults: ['工单处理效率提升50%']
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
        cost: 20000,
        expectedResults: [
          '定位核心问题点3-5个',
          '制定改善方案并实施',
          '恢复至正常销售水平'
        ],
        successRate: 85,
        successFactors: [
          '多维度数据分析',
          '竞品表现对比',
          '用户反馈收集'
        ],
        subtasks: [
          {
            id: Date.now() + 301,
            title: '数据异常分析',
            status: '待确认',
            description: '定位销售下滑的具体环节和原因',
            cost: 8000,
            expectedResults: ['识别异常指标并定位根因'],
            successRate: 90,
            phaseResults: {
              completed: ['数据收集', '指标分析'],
              pending: ['问题定位', '方案制定']
            }
          },
          {
            id: Date.now() + 302,
            title: '竞品对比分析',
            status: '待确认',
            description: '分析竞品表现及市场变化',
            cost: 12000,
            expectedResults: ['完成TOP5竞品分析报告'],
            successRate: 85,
            phaseResults: {
              completed: ['竞品清单确定', '数据采集'],
              pending: ['对比分析', '报告撰写']
            }
          }
        ]
      },
      {
        id: Date.now() + 400,
        title: '用户体验优化',
        status: '待确认',
        description: '优化店铺用户体验，提升购物体验',
        cost: 35000,
        expectedResults: [
          '用户满意度提升20%',
          '购物转化率提升15%',
          '客单价提升10%',
          '复购率提升25%'
        ],
        successRate: 80,
        successFactors: [
          '专业的体验设计',
          '充分的用户调研',
          'AB测试验证'
        ],
        subtasks: [
          {
            id: Date.now() + 401,
            title: '用户反馈分析',
            status: '待确认',
            description: '收集和分析用户反馈意见',
            cost: 15000,
            expectedResults: ['完成1000份用户调研'],
            successRate: 85,
            phaseResults: {
              completed: ['调研问卷设计', '样本筛选'],
              pending: ['数据收集', '分析报告']
            }
          },
          {
            id: Date.now() + 402,
            title: '体验优化方案',
            status: '待确认',
            description: '制定用户体验优化方案',
            cost: 20000,
            expectedResults: ['输出体验优化方案并执行'],
            successRate: 75,
            phaseResults: {
              completed: ['现状评估', '问题识别'],
              pending: ['方案设计', '效果验证']
            }
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
const messages = ref<Array<{
  type: string, 
  content: string, 
  role?: string,
  isExpanded?: boolean
}>>([])
const userInput = ref('')
const taskGroups = ref<TaskGroup[]>([])
const chatContainer = ref<HTMLElement | null>(null)
const isProcessing = ref(false)
const showTaskDetail = ref(false)
const selectedTask = ref<Task | null>(null)
const showAlignButton = ref(false)
const pendingResponse = ref('')

// 常量定义
const thinkingSteps = [
  '正在分析店铺历史数据...',
  '正在评估竞品活动方案...',
  '正在制定个性化策略...',
  '正在优化资源配置...',
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
    content: step,
    isExpanded: false
  })
  await scrollToBottom()
  await new Promise(resolve => setTimeout(resolve, 1000))
}

const sendNotification = () => {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('双十一策划任务已完成', {
          body: '您的双十一活动策划方案已经准备就绪，请查看详情。',
          icon: '/vite.svg'
        })
      }
    })
  }
}

const startAlign = () => {
  messages.value.push({
    type: 'normal',
    content: pendingResponse.value,
    role: 'assistant'
  })
  scrollToBottom()
  showAlignButton.value = false
  
  // 只添加双十一相关任务
  const doubleElevenTasks = pendingTaskGroups.filter(group => 
    group.title.includes('双十一') || group.description.includes('双十一')
  )
  taskGroups.value = [...doubleElevenTasks, ...taskGroups.value]
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isProcessing.value) return
  
  isProcessing.value = true
  
  // 添加用户消息
  messages.value.push({
    type: 'normal',
    content: userInput.value,
    role: 'user'
  })
  
  await scrollToBottom()
  
  // 清空输入
  userInput.value = ''
  
  // 发送处理开始的提示消息
  messages.value.push({
    type: 'normal',
    content: '好的，开始处理双十一策划任务，预计5分钟后完成。我已经在您的日历中添加了以下日程：\n\n📅 双十一活动策划会议\n⏰ 时间：今天 14:00-15:00\n📍 线上会议\n👥 参与人：店铺负责人、运营主管\n\n完成后我会通过浏览器发送通知，请留意。',
    role: 'assistant'
  })
  
  await scrollToBottom()
  
  // 模拟AI思考过程
  for (const step of thinkingSteps) {
    await addThinkingMessage(step)
  }
  
  // 将所有 thinking 消息转换为完成状态
  messages.value = messages.value.map(msg => 
    msg.type === 'thinking' ? { 
      ...msg, 
      type: 'completed',
      content: `✓ ${msg.content.replace('正在', '已完成')}`
    } : msg
  )
  
  await scrollToBottom()
  
  // 准备AI响应内容
  pendingResponse.value = `根据分析，为您制定了完整的双十一活动方案：

【主会场活动】
1. 活动机制
   - 限时秒杀：每整点开启，限量100件
   - 满减优惠：满1000减100，最高减500
   - 积分翻倍：下单可得2倍积分

2. 直播运营
   - 全天24场直播，重点场次：
     * 0点开门红
     * 早10点上班族专场
     * 晚8点黄金档
   - 主播资源配置
   - 商品上架节奏

3. 预热活动
   - 10月25日：预售开启
   - 10月31日：直播预告
   - 11月1日：店铺改版上线

4. 售后保障
   - 客服扩充：临时增加50%人力
   - 物流优化：与三家快递公司达成协议
   - 退换无忧：7天无理由退换

您可以在右侧任务列表中查看各个环节的具体执行计划。需要我重点说明某个环节吗？`

  // 发送完成提示并显示对齐按钮
  messages.value.push({
    type: 'normal',
    content: '已完成双十一策划任务策划，是否开始对齐？',
    role: 'assistant'
  })
  
  showAlignButton.value = true
  await scrollToBottom()
  
  // 发送浏览器通知
  sendNotification()
  
  isProcessing.value = false
}

const confirmTask = (task: Task) => {
  task.status = '进行中'
  ElMessage.success('任务已确认，开始执行')
  
  // 模拟任务执行完成,进入review阶段
  setTimeout(() => {
    task.status = '待review'
    // 添加实际成本(在预算成本的90%-110%范围内浮动)
    if (task.cost) {
      const variance = task.cost * (Math.random() * 0.2 - 0.1) // -10% 到 +10%
      task.actualCost = Math.round(task.cost + variance)
    }
    // 添加阶段性结果
    task.phaseResults = {
      completed: ['需求分析', '方案设计', '资源调配'],
      pending: ['效果评估', '数据分析']
    }
    ElMessage.success('任务执行完成，请进行评审')
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

const getStatusType = (status?: TaskStatus): 'success' | 'warning' | 'primary' => {
  const map: Record<TaskStatus, 'success' | 'warning' | 'primary'> = {
    '待确认': 'warning',
    '进行中': 'primary',
    '待review': 'warning',
    '已完成': 'success'
  }
  return status ? map[status] : 'primary'
}

const addTaskDetailToChat = (message: string) => {
  messages.value.push({
    type: 'normal',
    content: message
  })
  scrollToBottom()
}

const handleTaskCardClick = (taskTitle: string) => {
  const task = pendingTaskGroups
    .find(group => group.title.includes('双十一'))
    ?.tasks.find(task => task.title === taskTitle)
  
  if (task) {
    selectedTask.value = task
    showTaskDetail.value = true
  }
}

const toggleThinkingDetail = (index: number) => {
  messages.value[index].isExpanded = !messages.value[index].isExpanded
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

  // 初始化时显示除双十一策划外的所有任务
  const nonDoubleElevenTasks = [...pendingTaskGroups, ...completedTaskGroups].filter(group => 
    !group.title.includes('双十一') && !group.description.includes('双十一')
  )
  taskGroups.value = nonDoubleElevenTasks

  messages.value.push({
    type: 'normal',
    content: '您好！我是您的AI电商助手。距离双十一大促还有不到一个月的时间，我可以帮您制定活动方案、优化运营策略、协调资源调配等。请告诉我您需要什么帮助？',
    role: 'assistant'
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
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background: rgba(64, 158, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  
  &.completed {
    background: rgba(103, 194, 58, 0.1);
    
    &:hover {
      background: rgba(103, 194, 58, 0.15);
    }
    
    .thinking-detail {
      border-left: 2px solid var(--el-color-success);
    }
    
    .step-title {
      color: var(--el-color-success);
    }
  }
}

.thinking-message:hover {
  background: rgba(64, 158, 255, 0.15);
}

.expand-icon {
  margin-left: auto;
  transition: transform 0.3s ease;
}

.expand-icon.is-expanded {
  transform: rotate(180deg);
}

.thinking-detail {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.thinking-step {
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.step-title {
  font-weight: 500;
  color: var(--el-color-primary);
  margin-bottom: 4px;
}

.step-content {
  color: var(--text-regular);
  font-size: 14px;
  line-height: 1.6;
}

.success-icon {
  color: var(--el-color-success);
  margin-top: 2px;
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

.message-content {
  white-space: pre-wrap;
}

.align-button {
  margin-top: 12px;
  text-align: center;
}

.task-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-intro {
  color: var(--text-regular);
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.6;
  padding: 0 4px;
}

.task-card {
  background-color: var(--el-color-primary-light-9);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h4 {
    margin: 0 0 12px;
    color: var(--el-color-primary);
    font-size: 16px;
    font-weight: 600;
  }
}

.task-card-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-card-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  
  .item-title {
    color: var(--el-color-primary-dark-2);
    font-weight: 500;
    min-width: 80px;
  }
  
  .item-desc {
    color: var(--text-regular);
    flex: 1;
  }
}
</style> 