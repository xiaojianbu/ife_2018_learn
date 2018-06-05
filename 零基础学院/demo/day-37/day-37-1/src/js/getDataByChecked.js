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

  return sourceData.filter(item => {
    if (regionChecked.length && productChecked.length) {
      return (
        regionChecked.includes(item.region) &&
        productChecked.includes(item.product)
      )
    } else if (regionChecked.length && !productChecked.length) {
      return regionChecked.includes(item.region)
    } else if (!regionChecked.length && productChecked.length) {
      return productChecked.includes(item.product)
    }
    return false
  })
}
