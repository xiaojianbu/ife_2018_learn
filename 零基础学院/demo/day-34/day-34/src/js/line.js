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
  }

  renderSingle(data) {
    if (data) {
      this.data = data
    }
    this.container.innerHTML = ''
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')

    canvas.setAttribute('width', this.areaWidth)
    canvas.setAttribute('height', this.areaHeight)

    let xAxis = {
      ctx: ctx,
      x1: 20,
      y1: 20 + this.yAxisHeight,
      x: 20 + this.xAxisWidth,
      y: 20 + this.yAxisHeight
    }
    let yAxis = {
      ctx: ctx,
      x1: 20,
      y1: 20,
      x: 20,
      y: 20 + this.yAxisHeight
    }

    // 画横轴
    this.drawLine(xAxis)
    // 画纵轴
    this.drawLine(yAxis)

    for (let i = 0; i < this.label.length; i++) {
      ctx.fillText(this.label[i], 10 + this.pointInterval * (i + 1), this.yAxisHeight + 40, 20)
    }

    // 画点和连线

    let maxHeight = Math.max(...this.data)
    let rate = maxHeight / this.yAxisHeight

    let x1 = 0
    let y1 = 0

    for (let i = 0; i < this.data.length; i++) {
      let x = 20 + this.pointInterval * (i + 1)
      let y = this.yAxisHeight + 20 - this.data[i] / rate

      this.drawPoint({
        x,
        y,
        ctx
      })

      if (i !== 0) {
        this.drawLine({
          x1,
          y1,
          x,
          y,
          ctx
        })
      }

      x1 = 20 + this.pointInterval * (i + 1)
      y1 = this.yAxisHeight + 20 - this.data[i] / rate
    }

    this.container.appendChild(canvas)
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
    option.ctx.fillStyle = this.pointColor
    option.ctx.arc(option.x, option.y, this.pointDiameter / 2, 0, Math.PI * 2, true)
    option.ctx.fill()
  }

  renderManyLines(data) {
    this.data = data
    this.container.innerHTML = ''
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')

    canvas.setAttribute('width', this.areaWidth)
    canvas.setAttribute('height', this.areaHeight)

    let xAxis = {
      ctx: ctx,
      x1: 20,
      y1: 20 + this.yAxisHeight,
      x: 20 + this.xAxisWidth,
      y: 20 + this.yAxisHeight
    }
    let yAxis = {
      ctx: ctx,
      x1: 20,
      y1: 20,
      x: 20,
      y: 20 + this.yAxisHeight
    }

    // 画横轴
    this.drawLine(xAxis)
    // 画纵轴
    this.drawLine(yAxis)

    for (let i = 0; i < this.label.length; i++) {
      ctx.fillText(this.label[i], 10 + this.pointInterval * (i + 1), this.yAxisHeight + 40, 20)
    }

    let maxHeight = 0

    this.data.forEach(item => {
      maxHeight = maxHeight < Math.max(...item.sale) ? Math.max(...item.sale) : maxHeight
    })

    let rate = maxHeight / this.yAxisHeight
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
          ctx
        })

        if (i !== 0) {
          this.drawLine({
            x1,
            y1,
            x,
            y,
            ctx,
            color
          })
        }

        x1 = 20 + this.pointInterval * (i + 1)
        y1 = this.yAxisHeight + 20 - item.sale[i] / rate
      }
    })
    this.container.appendChild(canvas)
  }
}
