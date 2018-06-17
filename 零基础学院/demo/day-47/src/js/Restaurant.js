export class Restaurant {
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
