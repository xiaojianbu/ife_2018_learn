import {
  sourceData
} from './js/ife31data.js'
import './css/index.css'
import {
  generateCheckbox,
  setCheck,
  clearAllCheckbox,
  getIdByChecked
} from './js/checkbox.js'
import {
  renderTable
} from './js/table.js'
import {
  Bar
} from './js/bar.js'
import {
  Line
} from './js/line.js'
import {
  getDataByChecked
} from './js/getDataByChecked'

let checkboxData = getCheckboxData()

/**
 * 根据数据得到商品和地区的种类
 * @returns {Object} obj.product:商品种类  obj.region: 商品地区
 */
function getCheckboxData() {
  let obj = {
    product: [],
    region: []
  }

  sourceData.forEach(item => {
    if (obj.product.indexOf(item.product) === -1) {
      obj.product.push(item.product)
    }
    if (obj.region.indexOf(item.region) === -1) {
      obj.region.push(item.region)
    }
  })

  obj.product = obj.product.map(item => {
    return {
      value: item,
      text: item
    }
  })
  obj.region = obj.region.map(item => {
    return {
      value: item,
      text: item
    }
  })

  return obj
}

generateCheckbox('region-radio-wrapper', checkboxData.region)
generateCheckbox('product-radio-wrapper', checkboxData.product)

// 华东地区手机12个月的数据
let eastChinaPhone = [].concat(sourceData[0])

let bar = new Bar({
  container: document.querySelector('#bar-wrapper'),
  data: eastChinaPhone,
  barColor: '#D53A35',
  label: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
})

let line = new Line({
  container: document.querySelector('#line-wrapper'),
  data: eastChinaPhone,
  lineColor: '#cd5e5b',
  label: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
})

let tableWrapper = document.querySelector('#table-wrapper')

tableWrapper.addEventListener('mouseover', function (event) {
  event.stopPropagation()
  if (event.target.dataset.chartData) {
    let arr = event.target.dataset.chartData.split('-')
    let data = sourceData.filter(item => {
      if ((item.product === arr[0] || item.region === arr[0]) && (item.region === arr[1] || item.product === arr[1])) {
        return true
      }

      return false
    })
    let newData
    if (localStorage.getItem(`${data[0].product}-${data[0].region}`)) {
      newData = JSON.parse(localStorage.getItem(`${data[0].product}-${data[0].region}`))
    } else {
      newData = data[0]
    }
    line.setData([].concat(newData))
    bar.setData([].concat(newData))
  }
})

tableWrapper.addEventListener('mouseout', function () {
  let data = getDataByChecked()
  line.setData(data)
  bar.setData(data)
})

// 响应复选框的改变，重绘图表
document.querySelector('#checkbox-wrapper').addEventListener('click', (e) => {
  let target = e.target || e.srcElement

  if (target.tagName === 'INPUT') {
    let query = ''
    let checked = getIdByChecked()

    query += checked.productIds.join(',') ? `product=${checked.productIds.join(',')}` : ''

    if (checked.regionIds.length) {
      query += query ? `&region=${checked.regionIds.join(',')}` : `region=${checked.regionIds.join(',')}`
    }

    history.pushState({
      title: document.title
    }, document.title, location.href.split('?')[0] + '?' + query)

    render()
  }
})

document.querySelector('#save-data').addEventListener('click', () => {
  if (tableWrapper.querySelector('table')) {
    let first = tableWrapper.querySelectorAll('th')[0].innerHTML === '地区' ? 'region' : 'product'
    let second = tableWrapper.querySelectorAll('th')[1].innerHTML === '地区' ? 'region' : 'product'

    let rows = tableWrapper.querySelectorAll('tr')

    rows.forEach((item, index) => {
      if (index !== 0) {
        let tdArr = item.querySelectorAll('td')
        let obj = {
          sale: []
        }
        tdArr.forEach(element => {
          if (element.dataset.chartData) {
            let arr = element.dataset.chartData.split('-')

            obj[first] = arr[0]
            obj[second] = arr[1]
            obj.sale.push(element.innerHTML)
          }
        })
        let str = first === 'product' ? `${obj[first]}-${obj[second]}` : `${obj[second]}-${obj[first]}`
        window.localStorage[str] = JSON.stringify(obj)
      }
    })

    render()
  }
})

let value = null
let target = null

document.addEventListener('click', (event) => {
  let input = document.querySelector('table td input')
  if (input && target !== event.target && ![...target.childNodes].includes(event.target)) {
    target.innerHTML = value
  }
})

function render() {
  let data = getDataByChecked()

  if (data.length) {
    renderTable()
    tdAddEdit()
    line.setData(data)
    bar.setData(data)
  } else {
    tableWrapper.innerHTML = ''
    line.setData(eastChinaPhone)
    bar.setData(eastChinaPhone)
  }
}

function tdAddEdit() {
  document.querySelectorAll('td').forEach(element => {
    element.addEventListener('mouseover', (event) => {
      if (event.target.nodeName === 'TD' && !event.target.innerHTML.includes('input') && event.target.dataset.chartData) {
        event.target.className = 'span'
      }
    })
    element.addEventListener('mouseout', (event) => {
      if (event.target.nodeName === 'TD') {
        event.target.className = ''
      }
    })
    element.addEventListener('click', (event) => {
      if (event.target.nodeName === 'TD' && event.target.dataset.chartData) {
        if (target === event.target && document.querySelector('table td input')) {
          return
        }
        if (target !== event.target && document.querySelector('table td input')) {
          target.innerHTML = value
        }

        target = event.target
        value = event.target.innerHTML
        event.target.className = ''
        event.target.innerHTML =
          `<input type="text" value=${event.target.innerHTML}><button id="cancel">取消</button><button id="certain">确定</button>`

        event.target.querySelector('input').addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
            target.innerHTML = value
          }
          if (event.key === 'Enter') {
            if (!isNumeric(target.querySelector('input').value)) {
              alert('请输入数字')
            } else {
              target.innerHTML = target.querySelector('input').value
            }
          }
        })

        event.target.querySelector('#cancel').addEventListener('click', () => {
          target.innerHTML = value
        })

        event.target.querySelector('#certain').addEventListener('click', () => {
          if (!isNumeric(target.querySelector('input').value)) {
            alert('请输入数字')
          } else {
            target.innerHTML = target.querySelector('input').value
          }
        })
      }
    })
  })
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

window.addEventListener('popstate', function () {
  clearAllCheckbox()
  renderData()
})

function renderData() {
  let query = decodeURI(location.href.split('?')[1])
  let hasProduct = query ? query.includes('product') : false
  let hasRegion = query ? query.includes('region') : false

  let productArr = []
  let regionArr = []

  if (hasProduct) {
    let product = query.substring(query.indexOf('product') + 8, query.includes('&') ? query.indexOf('&') : query.length)
    productArr = product.split(',')
  }
  query = decodeURI(location.href.split('?')[1])
  if (hasRegion) {
    let region = query.substring(query.indexOf('region') + 7)
    regionArr = region.split(',')
  }

  // 根据 ID 选中 checkbox
  for (let i = 0; i < productArr.length; i++) {
    setCheck('product-radio-wrapper', document.querySelector(`#${productArr[i]}`))
  }
  for (let i = 0; i < regionArr.length; i++) {
    setCheck('region-radio-wrapper', document.querySelector(`#${regionArr[i]}`))
  }

  history.replaceState(null, document.title, location.href.split('?')[0] + (query && query !== 'undefined' ? '?' + query : ''))
  render()
}

renderData()
