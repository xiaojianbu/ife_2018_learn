/**
 * 生成UUID
 * @param {Number} len
 * @param {Number} radix
 * @return {String}
 */
export function uuid(len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let newRadix = radix || chars.length

  if (len) {
    // Compact form
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * newRadix]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

/**
 * 随机点菜
 * @param {Array} dishmenu
 */
export function getRandomDish(dishmenu) {
  let dishes = []
  // 随机点每个菜的个数
  for (let i = 0; i < dishmenu.length; i++) {
    dishes.push(dishmenu[i].name + `-${Math.floor(Math.random() * 3)}个`)
  }
  // 去掉个数为零的菜
  dishes = dishes.filter(item => {
    return !item.includes('0')
  })
  return dishes.join(';')
}

/**
 * 得到菜的种类及个数
 * @param {String} dish
 */
export function getSpeciesOfDish(dish) {
  let opj = {}
  let arr = []
  let species = dish.split(';')
  for (let i = 0; i < species.length; i++) {
    let name = species[i].split('-')[0]
    let number = Number(species[i].split('-')[1].replace('个', ''))
    opj[name] = number
    for (let j = 0; j < number; j++) {
      arr.push(name)
    }
  }

  return {
    opj,
    arr
  }
}
