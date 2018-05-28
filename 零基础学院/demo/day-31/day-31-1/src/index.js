import {
  sourceData
} from './ife31data.js'
import './index.css'

let regionSelect = document.querySelector('#region-select')
let productSelect = document.querySelector('#product-select');

// 初始化页面下拉框选项

(function initHTml() {
  let obj = {
    product: [],
    region: []
  }
  let regionSelectHTml = '<option value="" selected>请选择</option>'
  let productSelectHTml = '<option value="" selected>请选择</option>'

  sourceData.forEach(item => {
    if (obj.product.indexOf(item.product) === -1) {
      obj.product.push(item.product)
    }
    if (obj.region.indexOf(item.region) === -1) {
      obj.region.push(item.region)
    }
  })
  obj.product.forEach(item => {
    productSelectHTml += `<option value="${item}">${item}</option>`
  })
  obj.region.forEach(item => {
    regionSelectHTml += `<option value="${item}">${item}</option>`
  })

  regionSelect.innerHTML = regionSelectHTml
  productSelect.innerHTML = productSelectHTml
})()

// region-select 的 change 事件
regionSelect.addEventListener('change', function (event) {
  renderTable()
})

// product-select 的 change 事件
productSelect.addEventListener('change', function (event) {
  renderTable()
})

/**
 * 根据select选项获取数据
 * @param {string} value
 */
function getDataBySelect() {
  let regionSelected = regionSelect.options[regionSelect.selectedIndex].value
  let productSelected = productSelect.options[productSelect.selectedIndex].value


  return sourceData.filter(item => {
    if (regionSelected && productSelected) {
      return item.product === productSelected && item.region === regionSelected
    } else if (regionSelected && !productSelected) {
      return item.region === regionSelected
    } else if (!regionSelected && productSelected) {
      return item.product === productSelected
    }
    return false
  })
}

/**
 * 渲染新的表格
 * @param {Array of Object} data
 */
function renderTable() {
  let data = getDataBySelect()
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
