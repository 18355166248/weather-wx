let message = () => {
  let hour = new Date().getHours()
  switch(hour) {
    case 6:
    case 7:
    case 8:
    case 9:
      return '早上好, 该上班了'
    case 10:
    case 11:
    case 12:
    case 13:
      return '中午好, 休息一会吧!该吃饭了'
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
      return '下午要认真工作'
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
      return '好好把握你的夜生活'
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return '该睡觉了'
  }
}

module.exports = {
  message
}