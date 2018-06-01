import {
  getRandomColor
} from './getRandomColor'

export class Line {
  constructor(config) {
    this.data = config.data || [] // 将要绘制折线图的数据
    this.label = config.label || [] // X轴坐标点说明
    this.container = config.container || document.querySelector('body') // 折线图的包含容器

    this.areaHeight = config.areaHeight || 400 // 折线图绘制区域的高度
    this.areaWidth = config.areaWidth || 400 // 折线图绘制区域的宽度
    this.xAxisWidth = config.xAxisWidth || 400 // X轴的宽度
    this.yAxisHeight = config.yAxisHeight || 300 // Y轴的高度
    this.pointDiameter = config.pointDiameter || 5 // 数据点的直径
    this.pointColor = config.pointColor || 'black' // 数据点的颜色
    this.lineColor = config.lineColor || 'black' // 线的颜色
    this.lineWidth = config.lineWidth || '2' // 线的宽度

    this.pointInterval = this.data.length && this.xAxisWidth / this.data.length * 0.8 || 20

    this.init()
  }

  init() {
    this.container.innerHTML = ''
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.canvas.setAttribute('width', this.areaWidth)
    this.canvas.setAttribute('height', this.areaHeight)

    let xAxis = {
      ctx: this.ctx,
      x1: 20,
      y1: 20 + this.yAxisHeight,
      x: 20 + this.xAxisWidth,
      y: 20 + this.yAxisHeight
    }
    let yAxis = {
      ctx: this.ctx,
      x1: 20,
      y1: 20,
      x: 20,
      y: 20 + this.yAxisHeight
    }

    // 画横轴
    this.drawLine(xAxis)
    // 画纵轴
    this.drawLine(yAxis)
    // 画横轴坐标值
    for (let i = 0; i < this.label.length; i++) {
      this.ctx.fillText(this.label[i], 10 + this.pointInterval * (i + 1), this.yAxisHeight + 40, 20)

      this.drawLine({
        ctx: this.ctx,
        x1: 20 + this.pointInterval * (i + 1),
        y1: this.yAxisHeight + 20,
        x: 20 + this.pointInterval * (i + 1),
        y: this.yAxisHeight + 20 + 5,
        color: '#000'
      })
    }
  }

  renderSingle(data) {
    if (data) {
      this.data = data
    }
    this.init()

    // 画点和连线
    let maxHeight = this.getInt(Math.max(...this.data))
    let rate = maxHeight / this.yAxisHeight
    let interval = maxHeight / 5

    this.drawYLabel(interval, rate)

    let x1 = 0
    let y1 = 0

    for (let i = 0; i < this.data.length; i++) {
      let x = 20 + this.pointInterval * (i + 1)
      let y = this.yAxisHeight + 20 - this.data[i] / rate

      this.drawPoint({
        x,
        y,
        ctx: this.ctx,
        color: this.lineColor
      })

      if (i !== 0) {
        this.drawLine({
          x1,
          y1,
          x,
          y,
          ctx: this.ctx
        })
      }

      x1 = 20 + this.pointInterval * (i + 1)
      y1 = this.yAxisHeight + 20 - this.data[i] / rate
    }

    this.container.appendChild(this.canvas)
  }

  renderManyLines(data) {
    this.data = data
    this.init()

    let maxHeight = 0

    this.data.forEach(item => {
      maxHeight = maxHeight < Math.max(...item.sale) ? Math.max(...item.sale) : maxHeight
    })
    maxHeight = this.getInt(maxHeight)
    let rate = maxHeight / this.yAxisHeight
    let interval = maxHeight / 5

    this.drawYLabel(interval, rate)

    let x1 = 0
    let y1 = 0

    this.data.forEach(item => {
      let color = getRandomColor()
      for (let i = 0; i < item.sale.length; i++) {
        let x = 20 + this.pointInterval * (i + 1)
        let y = this.yAxisHeight + 20 - item.sale[i] / rate

        this.drawPoint({
          x,
          y,
          ctx: this.ctx,
          color: color
        })

        if (i !== 0) {
          this.drawLine({
            x1,
            y1,
            x,
            y,
            ctx: this.ctx,
            color
          })
        }

        x1 = 20 + this.pointInterval * (i + 1)
        y1 = this.yAxisHeight + 20 - item.sale[i] / rate
      }
    })
    this.container.appendChild(this.canvas)
  }

  drawLine(option) {
    option.ctx.beginPath()
    option.ctx.strokeStyle = option.color ? option.color : this.lineColor
    option.ctx.moveTo(option.x1, option.y1)
    option.ctx.lineTo(option.x, option.y)
    option.ctx.stroke()
  }

  drawPoint(option) {
    option.ctx.beginPath()
    option.ctx.fillStyle = option.color ? option.color : this.pointColor
    option.ctx.arc(option.x, option.y, this.pointDiameter / 2, 0, Math.PI * 2, true)
    option.ctx.fill()
  }

  drawYLabel(interval, rate) {
    for (let i = 1; i <= 5; i++) {
      let data = {
        ctx: this.ctx,
        x1: 20,
        y1: this.yAxisHeight + 20 - i * interval / rate,
        x: 20 + this.xAxisWidth,
        y: this.yAxisHeight + 20 - i * interval / rate,
        color: '#ddd'
      }

      this.drawLine(data)
      this.ctx.fillText(i * interval, 0, this.yAxisHeight + 20 - i * interval / rate, 20)
    }
  }

  // 计算y轴坐标，换算成整十整百 参考：https://github.com/Gesangs/IFE/blob/master/js/34-36/bar.js
  getInt(num) {
    if (num > 10 && num < 100) {
      return Math.ceil(num / 10) * 10
    } else if (num > 100) {
      return Math.ceil(num / 100) * 100
    }
  }
}
