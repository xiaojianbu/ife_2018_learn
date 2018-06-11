import {
  Restaurant
} from './js/Restaurant'
import {
  Waiter
} from './js/Waiter'
import {
  Cook
} from './js/Cook'
import {
  Customer
} from './js/Customer'
import {
  Dish
} from './js/Dish'

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
  price: 7.5
})
let hotDog = new Dish({
  name: '热狗',
  cost: 1,
  price: 2
})
let soda = new Dish({
  name: '可乐',
  cost: 2,
  price: 3
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
      // 有客人，客人进队列
      this.customerArr.push(value)
    } else {
      this.seats = 0
      this.customer = value
      // 客人入座，服务员招待
      let dish = Squidward.serve(this.customer, dishmenu)

      Squidward.completeOneWork(Squidward.setDish(SpongeBob, dish))

      this.customer.eat()
      this.seats = 1
      if (this.customerArr.length) {
        this.customer = this.customerArr.shift()
      }
    }
  }
})

let PatrickStar = new Customer('Patrick Star')

KrustyKrab.newCustomer = PatrickStar

let SandyCheeks = new Customer('Sandy Cheeks')

KrustyKrab.newCustomer = SandyCheeks
