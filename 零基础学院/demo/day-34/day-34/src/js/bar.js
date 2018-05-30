export class Bar {
  constructor(config) {
    this.data = config.data || [] // 将要绘制柱状图的数据
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

    let maxHeight = Math.max(...this.data)
    let rate = maxHeight / this.yAxisHeight

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
    }

    this.container.appendChild(bar)
  }

  drawLine(theArgs) {
    let svgns = 'http://www.w3.org/2000/svg'
    let path = document.createElementNS(svgns, 'path')

    let d = `M${theArgs.x1} ${theArgs.y1} L ${theArgs.x} ${theArgs.y}`

    path.setAttribute('d', d)
    path.setAttribute('fill', 'transparent')
    path.setAttribute('stroke', this.axisColor)

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

  setData(data) {
    this.data = data
    this.render()
  }
}
