import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')
// console.log(dayjs().format('YYYY-MM-DD'))
// console.log(dayjs().to(dayjs('1990-01-01')))

Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
