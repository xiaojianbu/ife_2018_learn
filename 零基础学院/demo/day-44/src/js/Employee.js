import {
  uuid
} from './util'

export class Employee {
  constructor(name, wage) {
    this.id = uuid(8, 10) // 随机ID
    this.name = name
    this.wage = wage
  }

  completeOneWork() {}
}
