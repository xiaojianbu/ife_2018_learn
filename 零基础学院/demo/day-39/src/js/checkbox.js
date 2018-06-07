/**
 * 生成一组checkbox
 * @param {String } id checkbox 容器的 Id
 * @param {Array of Object} data checkbox选项的参数对象或数组
 */
export function generateCheckbox(id, data) {
  let container = document.querySelector('#' + id)
  let containerHTml = ''

  containerHTml += `<input type="checkbox" id="${id + '-all'}" checkbox-type="all"><label for="${id + '-all'}">全选</label>`

  data.forEach(item => {
    containerHTml += `<input type="checkbox" id="${id + '-' + item.text}" name="${id + '-select'}" checkbox-type="child" value="${item.value}"><label for="${id + '-' + item.text}">${item.text}</label>`
  })

  container.innerHTML = containerHTml

  container.addEventListener('click', function (event) {
    if (event.target.type === 'checkbox') {
      let checkboxType = event.target.getAttribute('checkbox-type')
      if (checkboxType === 'all') {
        selectAll(id)
      } else {
        selectChildOption(id, event.target)
      }
    }
  })
}

/**
 * 全选checkbox勾选事件
 * @param {String} id
 */
function selectAll(id) {
  let AllCheckbox = document.querySelectorAll(`input[name="${id}-select"]`)
  let checkedCheckbox = document.querySelectorAll(`input[name="${id}-select"]:checked`)

  if (AllCheckbox.length === checkedCheckbox.length) {
    document.querySelector(`#${id}-all`).checked = true
  } else {
    AllCheckbox.forEach(item => {
      item.checked = true
    })
  }
}

/**
 * checkbox子项勾选事件
 * @param {String} id
 * @param {DOM Object} target 当前触发事件对象的引用
 */
function selectChildOption(id, target) {
  let AllCheckbox = document.querySelectorAll(`input[name="${id}-select"]`)
  let checkedCheckbox = document.querySelectorAll(`input[name="${id}-select"]:checked`)

  if (checkedCheckbox.length === 0) {
    target.checked = true
  } else {
    if (AllCheckbox.length === document.querySelectorAll(`input[name="${id}-select"]:checked`).length) {
      document.querySelector(`#${id}-all`).checked = true
    } else {
      document.querySelector(`#${id}-all`).checked = false
    }
  }
}

/**
 * 设置checkbox勾中
 * @param {String} id
 * @param {DOM Object} target 当前触发事件对象的引用
 */
export function setCheck(id, target) {
  let allCheckbox = document.querySelectorAll(`input[name="${id}-select"]`)

  target.checked = true
  if (allCheckbox.length === document.querySelectorAll(`input[name="${id}-select"]:checked`).length) {
    document.querySelector(`#${id}-all`).checked = true
  } else {
    document.querySelector(`#${id}-all`).checked = false
  }
}

export function clearAllCheckbox() {
  let allCheckbox = document.querySelectorAll(`input[type="checkbox"]`)
  allCheckbox.forEach(item => {
    item.checked = false
  })
}

/**
 * 返回勾中的checkbox Id
 */
export function getIdByChecked() {
  let regionElements = document.querySelectorAll(
    'input[name="region-radio-wrapper-select"]:checked'
  )
  let productElements = document.querySelectorAll(
    'input[name="product-radio-wrapper-select"]:checked'
  )

  let regionIds = [...regionElements].map(item => item.id)
  let productIds = [...productElements].map(item => item.id)

  return {
    regionIds,
    productIds
  }
}
