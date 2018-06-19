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
      console.log(`${arg.join('')},请稍等`)
      return `${arg.join('')}`
    } else {
      console.log(`您好, 您点的${arg}`)
      this.customer.cookedDish(arg)
    }
  }

  serve(dishmenu, customer) {
    this.customer = customer
    let dishes = dishmenu.map(item => {
      return `${item.name}-${item.price}元`
    })
    console.log(`客人您好！，您需要点什么？我们这里有${dishes.join(' ')}`)
  }

  setDish(cook, dish) {
    console.log(`${cook.name}, ${dish}`)
    cook.getDish(dish, this)
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
      setTimeout(() => {
        console.log(`烹饪出${dish}`)
        resolve(dish)
      }, time)
    })
  }

  getDish(dish, waiter) {
    let dishes = getSpeciesOfDish(dish).arr
    while (dishes.length) {
      this.completeOneWork(dishes.shift()).then((dish) => {
        waiter.completeOneWork(dish)
      })
    }
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
      setTimeout(() => {
        let dish = getRandomDish(dishmenu)
        // 菜的种类及个数
        this.dishObj = getSpeciesOfDish(dish).opj
        let msg = `我想要${dish}`
        console.log(msg)
        resolve(dish)
      }, baseTime * 3)
    })
  }

  cookedDish(arg) {
    if (this.eating) {
      this.waitToEatDish.push(arg)
    } else {
      this.eat(arg)
    }
  }

  eat(arg) {
    this.eating = true
    console.log(`开吃${arg}`)
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`${arg}吃完了`)
        this.eating = false
        this.dishObj[arg] -= 1
        if (this.dishObj[arg] === 0) {
          delete this.dishObj[arg]
        }
        let hasDish = Object.keys(this.dishObj).length === 0
        resolve(hasDish)
      }, baseTime * 3)
    })

    promise.then((result) => {
      if (!result && this.waitToEatDish.length) {
        this.eat(this.waitToEatDish.shift())
      }
      // 菜全部吃完
      if (result) {
        console.log('吃完，结账！')
        this.restaurant.cash += this.restaurant.customer.cost
        console.log(this.restaurant.cash)
        this.restaurant.seats = 1
        if (this.restaurant.customerArr.length) {
          this.restaurant.newCustomer = this.restaurant.customerArr.shift()
        }
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

let dishmenu = []
let KrabbyPatty = new Dish({
  name: '蟹黄堡',
  cost: 5,
  price: 7.5,
  cookTime: (Math.floor(Math.random() * 10) + 1) * baseTime
})
let hotDog = new Dish({
  name: '热狗',
  cost: 1,
  price: 2,
  cookTime: (Math.floor(Math.random() * 10) + 1) * baseTime
})
let soda = new Dish({
  name: '可乐',
  cost: 2,
  price: 3,
  cookTime: (Math.floor(Math.random() * 10) + 1) * baseTime
})
dishmenu.push(KrabbyPatty, hotDog, soda)

KrustyKrab.dishmenu = dishmenu
KrustyKrab.customer = null
KrustyKrab.customerArr = []

Object.defineProperty(KrustyKrab, 'newCustomer', {
  get: function () {
    return this.customer
  },
  set: function (value) {
    if (this.seats === 0) {
      // 无座位，客人进队列
      this.customerArr.push(value)
    } else {
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
        Squidward.setDish(SpongeBob, Squidward.completeOneWork([].concat(result)))
      })
    }
  }
})

let PatrickStar = new Customer('Patrick Star')
PatrickStar.seated(KrustyKrab)

let SandyCheeks = new Customer('Sandy Cheeks')
SandyCheeks.seated(KrustyKrab)
