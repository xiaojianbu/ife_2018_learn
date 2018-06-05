import {
  sourceData
} from './ife31data.js'

/**
 * 根据checkbox获取数据
 * @returns {Array of Object}
 */
export function getDataByChecked() {
  let regionChecked = []
  let productChecked = []

  let regionElements = document.querySelectorAll(
    'input[name="region-radio-wrapper-select"]:checked'
  )
  let productElements = document.querySelectorAll(
    'input[name="product-radio-wrapper-select"]:checked'
  )
  for (let i = 0; i < regionElements.length; i++) {
    regionChecked.push(regionElements[i].value)
  }
  for (let i = 0; i < productElements.length; i++) {
    productChecked.push(productElements[i].value)
  }

  let data = []

  sourceData.forEach(item => {
    // 从localStorage中获取数据
    if (localStorage.getItem(`${item.product}-${item.region}`)) {
      data.push(JSON.parse(localStorage.getItem(`${item.product}-${item.region}`)))
    } else {
      if (regionChecked.length && productChecked.length) {
        if (regionChecked.includes(item.region) &&
          productChecked.includes(item.product)) {
          data.push(item)
        }
      } else if (regionChecked.length && !productChecked.length) {
        if (regionChecked.includes(item.region)) {
          data.push(item)
        }
      } else if (!regionChecked.length && productChecked.length) {
        if (productChecked.includes(item.product)) {
          data.push(item)
        }
      }
    }
  })

  return data
}
