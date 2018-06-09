function uuid(len, radix) {
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

// ES5

// function Restaurant(opt) {
//   this.cash = opt.cash
//   this.seats = opt.seats
//   this.staff = opt.staff
// }

// Restaurant.prototype.hire = function (employee) {
//   this.staff.push(employee)
// }

// Restaurant.prototype.fire = function (employee) {
//   this.staff = this.staff.filter(item => item.id !== employee.id)
// }

// function Employee(name, wage) {
//   this.id = uuid(8, 10) // 随机ID
//   this.name = name
//   this.wage = wage
// }

// Employee.prototype.completeOneWork = function () {

// }

// function Waiter(name, wage) {
//   Employee.call(this, name, wage)
// }

// Waiter.prototype = Object.create(Employee.prototype)
// Waiter.prototype.constructor = Waiter
// Waiter.prototype.completeOneWork = function (arg) {
//   if (Object.prototype.toString.call(arg) === '[object Array]') {
//     console.log('记录客人点菜')
//   } else {
//     console.log('上菜行为')
//   }
// }

// function Cook(name, wage) {
//   Employee.call(this, name, wage)
// }

// Cook.prototype = Object.create(Employee.prototype)
// Cook.prototype.constructor = Cook
// Cook.prototype.completeOneWork = function (arg) {
//   console.log('烹饪出菜品')
// }

// function Customer() {
//   this.orderDishes = function () {
//     console.log('点菜')
//   }
//   this.eat = function () {
//     console.log('eat')
//   }
// }

// function Dish(name, cost, price) {
//   this.name = name
//   this.cost = cost
//   this.price = price
// }

// let ifeRestaurant = new Restaurant({
//   cash: 1000000,
//   seats: 20,
//   staff: []
// })

// let newCook = new Cook('Tony', 10000)
// ifeRestaurant.hire(newCook)

// console.log(ifeRestaurant.staff)

// ifeRestaurant.fire(newCook)
// console.log(ifeRestaurant.staff)


// ES6

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

class Employee {
  constructor(name, wage) {
    this.id = uuid(8, 10) // 随机ID
    this.name = name
    this.wage = wage
  }

  completeOneWork() {}
}

class Waiter extends Employee {
  completeOneWork(arg) {
    if (Object.prototype.toString.call(arg) === '[object Array]') {
      console.log('记录客人点菜')
    } else {
      console.log('上菜行为')
    }
  }
}

class Cook extends Employee {
  completeOneWork() {
    console.log('烹饪出菜品')
  }
}

class Customer {
  orderDishes() {
    console.log('点菜')
  }
  eat() {
    console.log('eat')
  }
}

class Dish {
  constructor(opt) {
    this.name = opt.name
    this.cost = opt.cost
    this.price = opt.price
  }
}

let ifeRestaurant = new Restaurant({
  cash: 1000000,
  seats: 20,
  staff: []
})

let newCook = new Cook('Tony', 10000)
ifeRestaurant.hire(newCook)

console.log(ifeRestaurant.staff)

ifeRestaurant.fire(newCook)
console.log(ifeRestaurant.staff)
