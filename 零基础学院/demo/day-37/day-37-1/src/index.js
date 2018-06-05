import {
  sourceData
} from './js/ife31data.js'
import './css/index.css'
import {
  generateCheckbox
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
    line.setData([].concat(data[0]))
    bar.setData([].concat(data[0]))
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
    let data = getDataByChecked()

    renderTable()
    line.setData(data)
    bar.setData(data)
    tableWrapper.querySelectorAll('input').forEach(element => {
      element.addEventListener('blur', () => {
        if (!isNumeric(event.target.value)) {
          alert('请输入数字')
        }
      })
    })
  }
})

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

document.querySelector('#save-data').addEventListener('click', () => {
  if (tableWrapper.querySelector('table')) {
    let first = tableWrapper.querySelectorAll('th')[0].innerHTML === '地区' ? 'region' : 'product'
    let second = tableWrapper.querySelectorAll('th')[1].innerHTML === '地区' ? 'region' : 'product'

    let rows = tableWrapper.querySelectorAll('tr')

    rows.forEach((item, index) => {
      if (index !== 0) {
        let input = item.querySelectorAll('input')
        let obj = {
          sale: []
        }
        input.forEach(element => {
          let arr = element.dataset.chartData.split('-')

          obj[first] = arr[0]
          obj[second] = arr[1]
          obj.sale.push(element.value)
        })
        let str = first === 'product' ? `${obj[first]}-${obj[second]}` : `${obj[second]}-${obj[first]}`
        window.localStorage[str] = JSON.stringify(obj)
      }
    })
  }
})
