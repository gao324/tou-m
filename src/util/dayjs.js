import dayjs from 'dayjs'

import Vue from 'vue'
// 全局更改语言
import 'dayjs/locale/zh-cn'

// 引入相对时间插件

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// 配置中文语言包
dayjs.locale('zh-cn')

Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
