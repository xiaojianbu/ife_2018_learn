import {
  sourceData
} from './ife31data.js'

/**
 * 根据checkbox获取数据
 * @returns {Array of Object}
 */
function getDataByChecked() {
  let regionChecked = []
  let productChecked = []

  let regionElements = document.querySelectorAll('input[name="region-radio-wrapper-select"]:checked')
  let productElements = document.querySelectorAll('input[name="product-radio-wrapper-select"]:checked')
  for (let i = 0; i < regionElements.length; i++) {
    regionChecked.push(regionElements[i].value)
  }
  for (let i = 0; i < productElements.length; i++) {
    productChecked.push(productElements[i].value)
  }

  return sourceData.filter(item => {
    return regionChecked.includes(item.region) || productChecked.includes(item.product)
  })
}

export function renderTable() {
  let data = getDataByChecked()
  let tableHtml = '' // 表格HTML
  let monthHtml = ''
  let tableWrapper = document.querySelector('#table-wrapper')

  // 表头：商品、地区、1月、2月、…… 12月
  tableHtml = '<th>商品</th><th>地区</th>'
  for (let i = 1; i < 13; i++) {
    monthHtml += `<th>${i}月</th>`
  }
  tableHtml = `<tr>${tableHtml}${monthHtml}</tr>`

  for (let i = 0; i < data.length; i++) {
    let shopHtml = ''
    shopHtml += `<td>${data[i].product}</td><td>${data[i].region}</td>`
    for (let j = 0; j < data[i].sale.length; j++) {
      shopHtml += `<td>${data[i].sale[j]}</td>`
    }
    tableHtml += `<tr>${shopHtml}</tr>`
  }
  tableWrapper.innerHTML = '<table>' + tableHtml + '</table>'
}
