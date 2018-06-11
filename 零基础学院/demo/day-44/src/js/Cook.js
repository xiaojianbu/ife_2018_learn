import {
  Employee
} from './Employee'

export class Cook extends Employee {
  completeOneWork(dish) {
    console.log(`烹饪出${dish}`)
    return dish
  }

  getDish(dish) {
    return this.completeOneWork(dish)
  }

  static getInstance(name, wage) {
    if (!this.instance) {
      this.instance = new Cook(name, wage)
    }

    return this.instance
  }
}
