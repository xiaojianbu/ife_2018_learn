import faker from 'faker'
import './css/index.css'
import {
  uuid,
  getRandomDish,
  getSpeciesOfDish
} from './js/util'

// 餐厅类
class Restaurant {
  constructor(opt) {
    this.cash = opt.cash
    this.seats = opt.seats
    this.staff = opt.staff
  }

  hire(employee) {
    this.staff.push(employee)
  }

  fire(employee) {
    this.staff = this.staff.filter(item => item.id !== employee.id)
  }
}

// 员工类
class Employee {
  constructor(name, wage) {
    this.id = uuid(8, 10) // 随机ID
    this.name = name
    this.wage = wage
  }
}

// 服务员类
class Waiter extends Employee {
  completeOneWork(arg) {
    if (Object.prototype.toString.call(arg) === '[object Array]') {
      console.log(`${this.name}: ${arg.join('')},请稍等`)
      return `${arg.join('')}`
    } else {
      let promise = new Promise((resolve, reject) => {
        let time = 0.5 * baseTime
        let interval = setInterval(() => {
          time -= 50
          if (time < 0) {
            clearInterval(interval)
            console.log(`${this.name}: 您好, 您点的${arg}`)
            document.querySelectorAll('.waiter-info')[0].innerHTML = `${this.name}: 客人您好！，您点的${arg}，请慢用！`
            this.dishesNum -= 1
            this.customer.cookedDish(arg)
            resolve()
          } else {
            waiterMoveToCustomer()
          }
        }, 50)
      })

      promise.then(() => {
        document.querySelectorAll('.waiter-info')[0].innerHTML = ''
        let time = 0.5 * baseTime
        let interval = setInterval(() => {
          time -= 50
          if (time < 0) {
            clearInterval(interval)
          } else if (this.dishesNum) {
            waiterMoveToCooker()
          }
        }, 50)
      })
    }
  }

  serve(dishmenu, customer) {
    this.customer = customer
    let dishes = dishmenu.map(item => {
      return `${item.name}-${item.price}元`
    })
    let time = 0.5 * baseTime
    let interval = setInterval(() => {
      time -= 50
      if (time < 0) {
        clearInterval(interval)
      } else {
        waiterMoveToCustomer()
      }
    }, 50)
    document.querySelectorAll('.waiter-info')[0].innerHTML = `${this.name}: 客人您好！，您需要点什么？我们这里有${dishes.join(' ')}`
    console.log(`${this.name}: 客人您好！，您需要点什么？我们这里有${dishes.join(' ')}`)
  }

  setDish(cook, dish) {
    console.log(`${this.name}: ${cook.name}, ${dish}`)
    let dishes = getSpeciesOfDish(dish).arr
    this.dishesNum = dishes.length
    cook.getDish(dishes, this)
  }

  static getInstance(name, wage) {
    if (!this.instance) {
      this.instance = new Waiter(name, wage)
    }
    return this.instance
  }
}

// 厨师类
class Cook extends Employee {
  completeOneWork(dish) {
    let time = dishmenu.find(item => {
      return item.name === dish
    }).cookTime

    return new Promise((resolve, reject) => {
      document.querySelector('#cooker-status').innerHTML = `在做${dish} 还差${time}毫秒完成`
      let interval = setInterval(() => {
        time -= 500
        if (time === 0) {
          clearInterval(interval)
          console.log(`${this.name}:${dish}做好了`)
          resolve(dish)
        } else {
          document.querySelector('#cooker-status').innerHTML = `在做${dish},还差${time}毫秒完成`
        }
      }, 500)
    })
  }

  getDish(dishes, waiter) {
    let html = ''
    let dish = dishes.shift()

    for (let i = 0; i < dishes.length; i++) {
      html += `<li>${dishes[i]}</li>`
    }
    document.querySelector('#dish-to-be-done').innerHTML = html
    this.completeOneWork(dish).then((dish) => {
      if (dishes.length) {
        this.getDish(dishes, waiter)
      } else {
        document.querySelector('#cooker-status').innerHTML = `空闲`
      }
      waiter.completeOneWork(dish)
    })
  }

  static getInstance(name, wage) {
    if (!this.instance) {
      this.instance = new Cook(name, wage)
    }
    return this.instance
  }
}

// 菜品类
class Dish {
  constructor(opt) {
    this.name = opt.name
    this.cost = opt.cost
    this.price = opt.price
    this.cookTime = opt.cookTime
  }
}

// 顾客类
class Customer {
  constructor(name) {
    this.name = name
    this.eating = false
    this.waitToEatDish = []
  }
  /**
   * 入座
   * @param {Object} restaurant 餐馆
   */
  seated(restaurant) {
    this.restaurant = restaurant
    restaurant.newCustomer = this
  }
  orderDishes(dishmenu, baseTime) {
    return new Promise((resolve, reject) => {
      let time = baseTime * 3
      document.querySelector('#customer-status').innerHTML = '开始点菜'
      let interval = setInterval(() => {
        document.querySelector('#customer-status').innerHTML = `点菜中，还差${time}毫秒点好`
        time -= 500
        if (time < 0) {
          clearInterval(interval)
          let dish = getRandomDish(dishmenu)
          console.log(dish)
          // 菜的种类及个数
          this.dishObj = getSpeciesOfDish(dish).opj
          this.dishArr = getSpeciesOfDish(dish).arr
          this.index = 0
          this.eatIndex = 0
          let html = '<span>点的菜</span><ul>'
          for (let i = 0; i < this.dishArr.length; i++) {
            html += `<li>${this.dishArr[i]}  <span class="dish-status">还未上</span></li>`
          }
          document.querySelector('#customer-status').innerHTML = ''
          document.querySelector('#order-dish-menu').innerHTML = html + '</ul>'
          console.log(`${this.name}: 我想要${dish}`)
          resolve(dish)
        }
      }, 500)
    })
  }

  cookedDish(arg) {
    document.querySelectorAll('.dish-status')[this.index++].innerHTML = `上菜了`
    if (this.eating) {
      this.waitToEatDish.push(arg)
    } else {
      this.eat(arg)
    }
  }

  eat(arg) {
    this.eating = true
    console.log(`${this.name}: 开吃${arg}`)
    let promise = new Promise((resolve, reject) => {
      let time = baseTime * 3
      let interval = setInterval(() => {
        document.querySelectorAll('.dish-status')[this.eatIndex].innerHTML = `正在吃（还差${time}吃完）`
        time -= 500
        if (time < 0) {
          clearInterval(interval)
          document.querySelectorAll('.dish-status')[this.eatIndex].innerHTML = `已吃完`
          this.eatIndex += 1
          console.log(`${this.name}: ${arg}吃完了`)
          this.eating = false
          this.dishObj[arg] -= 1
          if (this.dishObj[arg] === 0) {
            delete this.dishObj[arg]
          }
          let hasDish = Object.keys(this.dishObj).length === 0
          resolve(hasDish)
        }
      }, 500)
    })

    promise.then((result) => {
      if (!result && this.waitToEatDish.length) {
        this.eat(this.waitToEatDish.shift())
      }
      // 菜全部吃完
      if (result) {
        console.log(`${this.name}: 吃完，结账！`)
        this.restaurant.cashRegister()
      }
    })
  }
}

const baseTime = 1000
const KrustyKrab = new Restaurant({
  cash: 1000000,
  seats: 1,
  staff: []
})
const SpongeBob = Cook.getInstance('SpongeBob', 10000)
const Squidward = Waiter.getInstance('Squidward', 10000)
KrustyKrab.hire(SpongeBob)
KrustyKrab.hire(Squidward)
document.querySelector('#cash').innerHTML = KrustyKrab.cash

let dishmenu = []
let KrabbyPattyCookTime = (Math.floor(Math.random() * 10) + 1) * baseTime
let KrabbyPatty = new Dish({
  name: '蟹黄堡',
  cost: 5,
  price: 7.5,
  cookTime: KrabbyPattyCookTime
})
let hotDogCookTime = (Math.floor(Math.random() * 10) + 1) * baseTime
let hotDog = new Dish({
  name: '热狗',
  cost: 1,
  price: 2,
  cookTime: hotDogCookTime
})
let sodaCookTime = (Math.floor(Math.random() * 10) + 1) * baseTime
let soda = new Dish({
  name: '可乐',
  cost: 2,
  price: 3,
  cookTime: sodaCookTime
})
dishmenu.push(KrabbyPatty, hotDog, soda)

KrustyKrab.dishmenu = dishmenu
KrustyKrab.customer = null
KrustyKrab.customerArr = []
KrustyKrab.cashRegister = function () {
  document.querySelector('#order-dish-menu').innerHTML = ''
  document.querySelectorAll('.customer')[0].classList.remove('customer-img')
  this.cash += this.customer.cost
  document.querySelector('#cash').innerHTML = this.cash
  this.seats = 1
  setTimeout(() => {
    if (this.customerArr.length) {
      this.newCustomer = this.customerArr.shift()
    }
  }, baseTime)
}

document.querySelector('#cooker-status').innerHTML = `空闲`

Object.defineProperty(KrustyKrab, 'newCustomer', {
  get: function () {
    return this.customer
  },
  set: function (value) {
    if (this.seats === 0) {
      // 无座位，客人进队列
      this.customerArr.push(value)
      renderCustomerList(this.customerArr)
    } else {
      renderCustomerList(this.customerArr)
      document.querySelectorAll('.customer')[0].classList.add('customer-img')
      this.seats = 0
      this.customer = value
      // 客人入座，服务员招待
      Squidward.serve(dishmenu, this.customer)

      let promise = this.customer.orderDishes(dishmenu, baseTime)

      promise.then((result) => {
        this.customer.cost = 0
        let dishes = getSpeciesOfDish(result).arr
        for (let i = 0; i < dishes.length; i++) {
          this.customer.cost += dishmenu.find(item => {
            return item.name === dishes[i]
          }).price
        }
        let time = 0.5 * baseTime
        let interval = setInterval(() => {
          time -= 50
          if (time < 0) {
            clearInterval(interval)
          } else {
            waiterMoveToCooker()
          }
        }, 50)
        document.querySelectorAll('.waiter-info')[0].innerHTML = ''
        Squidward.setDish(SpongeBob, Squidward.completeOneWork([].concat(result)))
      })
    }
  }
})

let PatrickStar = new Customer('Patrick Star')
PatrickStar.seated(KrustyKrab)

let SandyCheeks = new Customer('Sandy Cheeks')
SandyCheeks.seated(KrustyKrab)

function renderCustomerList(list) {
  let html = '<ul>'

  for (let i = 0; i < list.length; i++) {
    html += `<li>${list[i].name}</li>`
  }

  html += '</ul>'

  document.querySelectorAll('.customer-list')[0].innerHTML = html
}

document.querySelector('#add-customer').addEventListener('click', function () {
  // 生成随机人名的顾客
  let customer = new Customer(faker.name.findName())
  customer.seated(KrustyKrab)
})

function waiterMoveToCustomer() {
  let waiter = document.querySelectorAll('.waiter')[0]
  let left = Number(window.getComputedStyle(waiter, null).getPropertyValue('left').replace('px', ''))
  if (left !== 150) {
    document.querySelectorAll('.waiter')[0].style.left = `${left + 150 / 500 * 50}px`
  }
}

function waiterMoveToCooker() {
  let waiter = document.querySelectorAll('.waiter')[0]
  let left = Number(window.getComputedStyle(waiter, null).getPropertyValue('left').replace('px', ''))
  document.querySelectorAll('.waiter')[0].style.left = `${left - 150 / 500 * 50}px`
}
