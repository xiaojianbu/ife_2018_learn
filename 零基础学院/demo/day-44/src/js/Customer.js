import {
  getRandomDish
} from './util'

export class Customer {
  constructor(name) {
    this.name = name
  }
  /**
   * 入座
   * @param {Object} restaurant 餐馆
   */
  seated(restaurant) {
    restaurant.seats = 0
    restaurant.newCustomer = this.name
  }
  orderDishes(dishmenu) {
    let dish = getRandomDish(dishmenu).name
    let msg = `我想要${dish}`
    console.log(msg)
    return dish
  }
  eat() {
    console.log('吃完，结账！')
  }
}
