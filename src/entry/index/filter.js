import moment from 'moment'
import { 
  WEEKDAYS,
  ORDER_STATUS_INIT,
  ORDER_STATUS_BOOKING,
  ORDER_STATUS_DONE,
  ORDER_STATUS_CANCEL,
} from '@/constants/status'

const install = (Vue) => {
  Vue.filter('weekday', (value) => {
    const values = `${value}`.split('/')
    const weekdays = values.map(item => WEEKDAYS[item] || '未知')
    return weekdays.join('/')
  })

  Vue.filter('exchange', (value, rate) => {
    return (value/rate).toFixed(2)
  })

  Vue.filter('formatDate', (value) => {
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  })

  Vue.filter('formatOrderStatus', (value) => {
    if (value == ORDER_STATUS_INIT) {
      return '待填写委托书'
    }

    if (value == ORDER_STATUS_BOOKING) {
      return '待工作人员处理'
    }

    if (value == ORDER_STATUS_CANCEL) {
      return '已取消'
    }

    if (value == ORDER_STATUS_DONE) {
      return '已完成'
    }
    return '未知状态'
  })
}

export default { install }
