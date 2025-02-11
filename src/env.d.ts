/// <reference types="vite/client" />
/// <reference types="element-plus/global" />
/// <reference types="@vue/runtime-core" />
/// <reference types="@vue/runtime-dom" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'element-plus/dist/locale/zh-cn.mjs'

declare module '@vue/runtime-core' {
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