import {
  Employee
} from './Employee'

export class Waiter extends Employee {
  completeOneWork(arg) {
    if (Object.prototype.toString.call(arg) === '[object Array]') {
      console.log(`${arg.join('')},请稍等`)
      return `${arg.join('')}`
    } else {
      console.log(`${this.customer.name},您点的${arg}`)
    }
  }

  serve(customer, dishmenu) {
    this.customer = customer
    let dishes = dishmenu.map(item => {
      return `${item.name}-${item.price}元`
    })
    console.log(`${this.customer.name}，您需要点什么？我们这里有${dishes.join(' ')}`)
    return this.completeOneWork([].concat(customer.orderDishes(dishmenu)))
  }

  setDish(cook, dish) {
    console.log(`${cook.name},一份${dish}`)
    return cook.getDish(dish)
  }

  static getInstance(name, wage) {
    if (!this.instance) {
      this.instance = new Waiter(name, wage)
    }

    return this.instance
  }
}
