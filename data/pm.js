var PmText = (pm) => {
  pm = Number(pm)
  if (pm >=0 && pm <=35) return '优 '+pm
  else if (pm > 35 && pm <= 75) return '良 ' + pm
  else if (pm > 75 && pm <= 115) return '轻度污染 ' + pm
  else if (pm > 115 && pm <= 150) return '中度污染 ' + pm
  else if (pm > 150 && pm <= 250) return '重度污染 ' + pm
  else if (pm > 250) return '严重污染 ' + pm
  else return '数值错误'
}

module.exports = { PmText }