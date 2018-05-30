import {
  sourceData
} from './js/ife31data.js'
import './css/index.css'
import {
  generateCheckbox
} from './js/checkbox.js'

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
