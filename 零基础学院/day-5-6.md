# Day-2

日期：2018-04-25

今天学习总用时：4 小时

今天学习的目标：

### 盒子模型

每个元素被表示为一个矩形的方框，框的内容、内边距、边界、外边距。

1.  width 和 height

    width 和 height 设置内容框（content box）的宽度和高度。

2.  padding 内边距
3.  border 边界
4.  margin 外边距

一些提示：

* 默认情况下 background-color/background-image 延伸到边界的边沿。该行为可以使用 background-clip 属性来改变。
* 如果内容框变得比示例输出的窗口大，会产生溢出，可以使用 overflow 属性来控制。
* 框的高度不监视百分比的宽度；框的高度总是采用框内容的高度，除非指定一个绝对的高度。
* 边界也忽略百分比宽度设置。
* 可以通过 box-sizing 修改框模型；常用 border-box。

### 实现分栏高度自动相等

核心代码：

```css
margin-bottom: -3000px;
padding-bottom: 3000px;
```

再配合父标签的 overflow：hidden 属性即可实现高度自动相等的效果

参考资料：[纯 CSS 实现侧边栏/分栏高度自动相等](http://www.zhangxinxu.com/wordpress/2010/03/%E7%BA%AFcss%E5%AE%9E%E7%8E%B0%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%88%86%E6%A0%8F%E9%AB%98%E5%BA%A6%E8%87%AA%E5%8A%A8%E7%9B%B8%E7%AD%89/)
