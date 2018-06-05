/**
 * 生成一组checkbox
 * @param {String } id checkbox容器的Id
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
