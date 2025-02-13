/// <reference types="vite/client" />
/// <reference types="element-plus/global" />
/// <reference types="@vue/runtime-core" />
/// <reference types="@vue/runtime-dom" />

// 声明.vue文件模块的类型
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明Element Plus中文语言包模块
declare module 'element-plus/dist/locale/zh-cn.mjs'

// 为Vue运行时核心模块声明全局组件类型
declare module '@vue/runtime-core' {
  // 扩展全局组件接口，定义Element Plus组件的类型
  export interface GlobalComponents {
    ElContainer: typeof import('element-plus')['ElContainer']
    ElHeader: typeof import('element-plus')['ElHeader']
    ElMain: typeof import('element-plus')['ElMain']
    ElRow: typeof import('element-plus')['ElRow']
    ElCol: typeof import('element-plus')['ElCol']
    ElInput: typeof import('element-plus')['ElInput']
    ElButton: typeof import('element-plus')['ElButton']
    ElTable: typeof import('element-plus')['ElTable']
    ElTableColumn: typeof import('element-plus')['ElTableColumn']
    ElTag: typeof import('element-plus')['ElTag']
    ElDialog: typeof import('element-plus')['ElDialog']
    ElDescriptions: typeof import('element-plus')['ElDescriptions']
    ElDescriptionsItem: typeof import('element-plus')['ElDescriptionsItem']
    ElTimeline: typeof import('element-plus')['ElTimeline']
    ElTimelineItem: typeof import('element-plus')['ElTimelineItem']
  }
}