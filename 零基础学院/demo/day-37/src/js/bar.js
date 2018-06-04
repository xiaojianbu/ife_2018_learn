import { getRandomColor } from './getRandomColor'

export class Bar {
  constructor(config) {
    this.data = config.data || [] // 将要绘制柱状图的数据
    this.label = config.label || []
    this.container = config.container || document.querySelector('body') // 柱状图的包含容器
    this.xCoordinate = config.xCoordinate || 0 // 柱状图绘制区域起点X坐标
    this.yCoordinate = config.yCoordinate || 0 // 柱状图绘制区域起点Y坐标
    this.areaHeight = config.areaHeight || 400 // 柱状图绘制区域的高度
    this.areaWidth = config.areaWidth || 700 // 柱状图绘制区域的宽度
    this.xAxisWidth = config.xAxisWidth || 680 // X轴的宽度
    this.yAxisHeight = config.yAxisHeight || 300 // Y轴的高度
    this.monthWidth =
      (this.label.length && this.xAxisWidth / this.label.length * 0.8) || 20 // 月份宽度
    this.monthInterval =
      (this.label.length && this.xAxisWidth / this.label.length * 0.1) || 10 // 月份间隔
    this.axisColor = config.axisColor || 'black'
    this.barColor = config.barColor || 'black'

    this.init()
  }

  init() {
    this.render()
    this.addEvent()
  }

  render() {
    this.container.innerHTML = ''
    this.creatTooltip()
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

    let maxHeight = 0

    this.data.forEach(item => {
      maxHeight =
        maxHeight < Math.max(...item.sale) ? Math.max(...item.sale) : maxHeight
    })
    maxHeight = getInt(maxHeight)
    let rate = maxHeight / this.yAxisHeight
    let interval = maxHeight / 5
    // 画纵轴坐标值
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
      bar.appendChild(this.drawLabel(data))
    }
    // 画横轴坐标值
    for (let i = 0; i < this.label.length; i++) {
      let data = {
        x:
          this.xCoordinate +
          20 +
          this.monthInterval * (i + 1) +
          this.monthWidth * i,
        y: this.yCoordinate + this.yAxisHeight + 30,
        value: this.label[i]
      }

      bar.appendChild(this.drawLabel(data))

      data = {
        x1:
          this.xCoordinate +
          20 +
          this.monthInterval * (i + 1) +
          this.monthWidth * (i + 1),
        y1: this.yCoordinate + this.yAxisHeight + 20,
        x:
          this.xCoordinate +
          20 +
          this.monthInterval * (i + 1) +
          this.monthWidth * (i + 1),
        y: this.yCoordinate + this.yAxisHeight + 25,
        color: '#000'
      }
      bar.appendChild(this.drawLine(data))
    }

    bar.appendChild(
      this.drawLabel({
        x: this.xCoordinate,
        y: this.yCoordinate + this.yAxisHeight + 20,
        value: 0
      })
    )

    let barWidth = this.monthWidth / this.data.length
    // let barInterval = this.monthWidth / this.data.length * 0.1
    this.data.forEach((item, index) => {
      let color = getRandomColor()
      for (let i = 0; i < item.sale.length; i++) {
        let data = {
          x:
            this.xCoordinate +
            20 +
            this.monthWidth * i +
            this.monthInterval * i +
            barWidth * index,
          y: this.yCoordinate + this.yAxisHeight + 20 - item.sale[i] / rate,
          width: barWidth,
          height: item.sale[i] / rate,
          color

          // x1: this.xCoordinate + 20 + barInterval * (i + 1) + barWidth * i,
          // y1: this.yCoordinate + this.yAxisHeight + 20,
          // x2: this.xCoordinate + 20 + barInterval * (i + 1) + barWidth * i,
          // y2: this.yCoordinate + this.yAxisHeight + 20 - item.sale[i] / rate,
          // x3: this.xCoordinate + 20 + barInterval * (i + 1) + barWidth * (i + 1),
          // y3: this.yCoordinate + this.yAxisHeight + 20 - item.sale[i] / rate,
          // x4: this.xCoordinate + 20 + barInterval * (i + 1) + barWidth * (i + 1),
          // y4: this.yCoordinate + this.yAxisHeight + 20,
        }
        bar.appendChild(this.drawBar(data))
      }
    })

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
    let rect = document.createElementNS(svgns, 'rect')

    rect.setAttribute('x', theArgs.x)
    rect.setAttribute('y', theArgs.y)
    rect.setAttribute('width', theArgs.width)
    rect.setAttribute('height', theArgs.height)

    rect.style.fill = theArgs.color ? theArgs.color : this.barColor

    return rect
  }

  drawLabel(config) {
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

  creatTooltip() {
    let tooltip = document.createElement('div')
    tooltip.className = 'tooltip'
    tooltip.innerHTML = ''

    let maskLayer = document.createElement('div')
    maskLayer.className = 'mask-layer'
    maskLayer.innerHTML = ''

    this.container.appendChild(tooltip)
    this.container.appendChild(maskLayer)
  }

  addEvent() {
    this.container.addEventListener('mousemove', event => {
      let index = 0
      for (let i = 0; i <= this.label.length; i++) {
        if (
          this.xAxisWidth / this.label.length * 0.9 * i + 27 > event.pageX &&
          event.pageX < 640
        ) {
          index = i
          break
        }
      }

      if (event.pageY > 100 && event.pageY < 400 && index !== 0) {
        let tooltip = this.container.querySelectorAll('.tooltip')[0]
        let maskLayer = this.container.querySelectorAll('.mask-layer')[0]
        let html = ''

        tooltip.style.display = 'block'
        tooltip.style.top = `${event.pageY + 10}px`
        tooltip.style.left = `${event.pageX + 10}px`

        maskLayer.style.display = 'block'
        maskLayer.style.top = `100px`
        maskLayer.style.left = `${27 +
          this.monthWidth * (index - 1) +
          this.monthInterval * (index - 1)}px`
        maskLayer.style.width = `${this.monthWidth + this.monthInterval}px`
        maskLayer.style.height = `${this.yAxisHeight}px`

        for (let i = 0; i < this.data.length; i++) {
          html += `<p>${this.data[i].product}-${this.data[i].region}: ${
            this.data[i].sale[index - 1]
          }</p>`
        }
        tooltip.innerHTML = html
      } else {
        this.container.querySelectorAll('.tooltip')[0].style.display = 'none'
        this.container.querySelectorAll('.mask-layer')[0].style.display = 'none'
      }
    })
  }
}
