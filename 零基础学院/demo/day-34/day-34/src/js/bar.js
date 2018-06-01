export class Bar {
  constructor(config) {
    this.data = config.data || [] // 将要绘制柱状图的数据
    this.label = config.label || []
    this.container = config.container || document.querySelector('body') // 柱状图的包含容器
    this.xCoordinate = config.xCoordinate || 0 // 柱状图绘制区域起点X坐标
    this.yCoordinate = config.yCoordinate || 0 // 柱状图绘制区域起点Y坐标
    this.areaHeight = config.areaHeight || 400 // 柱状图绘制区域的高度
    this.areaWidth = config.areaWidth || 400 // 柱状图绘制区域的宽度
    this.xAxisWidth = config.xAxisWidth || 400 // X轴的宽度
    this.yAxisHeight = config.yAxisHeight || 300 // Y轴的高度
    this.barWidth = (this.data && this.data.length && this.xAxisWidth / this.data.length * 0.8) || 30
    this.barInterval = this.data.length && this.xAxisWidth / this.data.length * 0.1 || 10
    this.axisColor = config.axisColor || 'black'
    this.barColor = config.barColor || 'black'

    this.init()
  }

  init() {
    this.render()
  }

  render() {
    this.container.innerHTML = ''
    let svgns = 'http://www.w3.org/2000/svg'
    let bar = document.createElementNS(svgns, 'svg:svg')

    bar.setAttribute('width', this.areaWidth)
    bar.setAttribute('height', this.areaHeight)
    bar.setAttribute('viewBox', '0 0 ' + this.areaWidth + ' ' + this.areaHeight)

    let xAxis = {
      x1: this.xCoordinate + 20,
      y1: this.yCoordinate + this.yAxisHeight + 20,
      x: this.xAxisWidth + this.xCoordinate + 20,
      y: this.yCoordinate + this.yAxisHeight + 20
    }

    let yAxis = {
      x1: this.xCoordinate + 20,
      y1: this.yCoordinate + 20,
      x: this.xCoordinate + 20,
      y: this.yAxisHeight + this.yCoordinate + 20
    }

    bar.appendChild(this.drawLine(xAxis))
    bar.appendChild(this.drawLine(yAxis))

    // 计算y轴坐标，换算成整十整百 参考：https://github.com/Gesangs/IFE/blob/master/js/34-36/bar.js
    function getInt(num) {
      if (num > 10 && num < 100) {
        return Math.ceil(num / 10) * 10
      } else if (num > 100) {
        return Math.ceil(num / 100) * 100
      }
    }

    let maxHeight = getInt(Math.max(...this.data))
    let rate = maxHeight / this.yAxisHeight

    let interval = maxHeight / 5
    for (let i = 1; i <= 5; i++) {
      let data = {
        x1: this.xCoordinate + 20,
        y1: this.yCoordinate + this.yAxisHeight + 20 - i * interval / rate,
        x: this.xAxisWidth + this.xCoordinate + 20,
        y: this.yCoordinate + this.yAxisHeight + 20 - i * interval / rate,
        color: '#ddd'
      }
      bar.appendChild(this.drawLine(data))

      data = {
        x: this.xCoordinate,
        y: this.yCoordinate + this.yAxisHeight + 20 - i * interval / rate,
        value: i * interval
      }
      bar.appendChild(this.drawXLabel(data))
    }

    bar.appendChild(this.drawXLabel({
      x: this.xCoordinate,
      y: this.yCoordinate + this.yAxisHeight + 20,
      value: 0
    }))

    for (let i = 0; i < this.data.length; i++) {

      let data = {
        x1: this.xCoordinate + 20 + this.barInterval * (i + 1) + this.barWidth * i,
        y1: this.yCoordinate + this.yAxisHeight + 20,
        x2: this.xCoordinate + 20 + this.barInterval * (i + 1) + this.barWidth * i,
        y2: this.yCoordinate + this.yAxisHeight + 20 - this.data[i] / rate,
        x3: this.xCoordinate + 20 + this.barInterval * (i + 1) + this.barWidth * (i + 1),
        y3: this.yCoordinate + this.yAxisHeight + 20 - this.data[i] / rate,
        x4: this.xCoordinate + 20 + this.barInterval * (i + 1) + this.barWidth * (i + 1),
        y4: this.yCoordinate + this.yAxisHeight + 20,
      }
      bar.appendChild(this.drawBar(data))

      data = {
        x: this.xCoordinate + 20 + this.barInterval * (i + 1) + this.barWidth * i,
        y: this.yCoordinate + this.yAxisHeight + 30,
        value: this.label[i]
      }

      bar.appendChild(this.drawXLabel(data))
    }

    this.container.appendChild(bar)
  }

  drawLine(theArgs) {
    let svgns = 'http://www.w3.org/2000/svg'
    let path = document.createElementNS(svgns, 'path')

    let d = `M${theArgs.x1} ${theArgs.y1} L ${theArgs.x} ${theArgs.y}`

    path.setAttribute('d', d)
    path.setAttribute('fill', 'transparent')
    path.setAttribute('stroke', theArgs.color ? theArgs.color : this.axisColor)

    return path
  }

  drawBar(theArgs) {
    let svgns = 'http://www.w3.org/2000/svg'
    let path = document.createElementNS(svgns, 'path')

    let d = `M${theArgs.x1} ${theArgs.y1} L ${theArgs.x2} ${theArgs.y2} L ${theArgs.x3} ${theArgs.y3} L ${theArgs.x4} ${theArgs.y4}`

    path.setAttribute('d', d)
    path.setAttribute('fill', this.barColor)
    path.setAttribute('stroke', this.barColor)

    return path
  }

  drawXLabel(config) {
    let svgns = 'http://www.w3.org/2000/svg'
    let text = document.createElementNS(svgns, 'text')
    text.innerHTML = config.value
    text.setAttribute('x', config.x)
    text.setAttribute('y', config.y)
    text.style.fontSize = '10px'

    return text
  }

  setData(data) {
    this.data = data
    this.render()
  }
}
