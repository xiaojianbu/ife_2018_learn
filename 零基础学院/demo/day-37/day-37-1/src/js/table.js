import {
  getDataByChecked
} from './getDataByChecked'

// 渲染表头
function renderHeader(col1, col2) {
  let headerHtml = ''
  let monthHtml = ''

  headerHtml = `<th>${col1}</th><th>${col2}</th>`
  for (let i = 1; i < 13; i++) {
    monthHtml += `<th>${i}月</th>`
  }
  headerHtml = `<tr>${headerHtml}${monthHtml}</tr>`

  return headerHtml
}

// 渲染表体
function renderBody(data, rowspan, value, attr) {
  let bodyHtml = ''

  bodyHtml += `<tr><td rowspan="${rowspan}">${value}</td>`
  for (let i = 0; i < data.length; i++) {
    let shopHtml = ''
    shopHtml += `<td>${data[i][attr]}</td>`
    for (let j = 0; j < data[i].sale.length; j++) {
      shopHtml += `<td data-chart-data="${value}-${data[i][attr]}">${
        data[i].sale[j]
      }</td>`
    }
    if (i === 0) {
      bodyHtml += `${shopHtml}</tr>`
    } else {
      bodyHtml += `<tr>${shopHtml}</tr>`
    }
  }

  return bodyHtml
}

export function renderTable() {
  let data = getDataByChecked()
  let tableHtml = '' // 表格HTML
  let tableWrapper = document.querySelector('#table-wrapper')
  let regionElements = document.querySelectorAll(
    'input[name="region-radio-wrapper-select"]:checked'
  )
  let productElements = document.querySelectorAll(
    'input[name="product-radio-wrapper-select"]:checked'
  )

  // 当商品选择了一个，地区选择了多个的时候，商品作为第一列，地区作为第二列，并且把商品这一列的单元格做一个合并，只保留一个商品名称
  if (productElements.length === 1 && regionElements.length > 1) {
    let rowspan = regionElements.length
    let value = productElements[0].value
    let attr = 'region'

    tableHtml =
      renderHeader('商品', '地区') + renderBody(data, rowspan, value, attr)
  } else if (productElements.length > 1 && regionElements.length === 1) {
    // 当地区选择了一个，商品选择了多个的时候，地区作为第一列，商品作为第二列，并且把地区这一列的单元格做一个合并，只保留一个地区名称
    let rowspan = productElements.length
    let value = regionElements[0].value
    let attr = 'product'

    tableHtml =
      renderHeader('地区', '商品') + renderBody(data, rowspan, value, attr)
  } else if (productElements.length === 1 && regionElements.length === 1) {
    // 当商品和地区都只选择一个的情况下，以商品为第一列，地区为第二列
    let rowspan = productElements.length
    let value = productElements[0].value
    let attr = 'region'

    tableHtml =
      renderHeader('商品', '地区') + renderBody(data, rowspan, value, attr)
  } else if (productElements.length > 1 && regionElements.length > 1) {
    // 当商品和地区都选择了多于一个的情况下，以商品为第一列，地区为第二列，商品列对同样的商品单元格进行合并
    let headerHtml = renderHeader('商品', '地区')
    let productArr = null

    tableHtml += headerHtml

    while (data.length !== 0) {
      productArr = data.splice(0, regionElements.length)
      let rowspan = regionElements.length
      let value = productArr[0].product
      let attr = 'region'

      tableHtml += renderBody(productArr, rowspan, value, attr)
    }
  } else if (productElements.length === 0) {
    // 只选择地区
    if (regionElements.length === 1) {
      let headerHtml = renderHeader('地区', '商品')
      let regionArr = null

      tableHtml += headerHtml

      while (data.length !== 0) {
        regionArr = data.splice(0, 3)
        let rowspan = 3
        let value = regionArr[0].region
        let attr = 'product'

        tableHtml += renderBody(regionArr, rowspan, value, attr)
      }
    } else {
      let headerHtml = renderHeader('商品', '地区')
      let productArr = null

      tableHtml += headerHtml

      while (data.length !== 0) {
        productArr = data.splice(0, regionElements.length)
        let rowspan = regionElements.length
        let value = productArr[0].product
        let attr = 'region'

        tableHtml += renderBody(productArr, rowspan, value, attr)
      }
    }
  } else if (regionElements.length === 0) {
    // 只选择商品
    let headerHtml = renderHeader('商品', '地区')
    let productArr = null

    tableHtml += headerHtml

    while (data.length !== 0) {
      productArr = data.splice(0, 3)
      let rowspan = 3
      let value = productArr[0].product
      let attr = 'region'

      tableHtml += renderBody(productArr, rowspan, value, attr)
    }
  }

  tableWrapper.innerHTML = '<table>' + tableHtml + '</table>'
}
