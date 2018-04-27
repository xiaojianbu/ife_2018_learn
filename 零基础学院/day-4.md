# Day-4

日期：2018-04-27

今天学习总用时：3 小时

今天学习的目标： 1.继续学习 git 2.学习 webpack 3.回顾 CSS 选择器知识

## 选择器

### 伪类和伪元素

1.  伪类

一个 CSS 伪类是一个以冒号（:）作为前缀的关键字，当你希望样式在特定状态下才被呈现到指定的元素时，可以在元素的选择器后面加上对应的伪类。例如：

```css
a:hover {
  color: darked;
}
```

2.  伪元素

    * ::after
    * ::before
    * ::first-letter
    * ::first-line
    * ::selection
    * ::backdrop

3.  组合器和多个选择器

    * 组合器

    | 组合  |                           选择                            |
    | :---- | :-------------------------------------------------------: |
    | A,B   |              匹配满足 A（和/或）B 的任意元素              |
    | A B   |         匹配任意元素，满足条件：B 是 A 的后代结点         |
    | A > B |        匹配任意元素，满足条件：B 是 A 的直接子节点        |
    | A + B |       匹配任意元素，满足条件：B 是 A 的下一兄弟结点       |
    | A > B | 匹配任意元素，满足条件：B 是 A 之后的兄弟节点中的任意一个 |

## 用于样式文本的 CSS 属性通常可以分为两类

* 字体样式：作用于字体的属性
* 文本布局风格：作用于文本的间距以及其他布局功能的属性。

### 字体样式

* color
* font-family
* font-size 常用单位 px、em、rem
* font-style: italic、normal、oblique
* font-weight: 设置文字的粗细大小。normal、bold、100-900 数值粗体值。
* text-transform: 允许你设置要转换的字体。none、uppercase（转为大写）、lowercase（转为小写）、capitalize（单词首字母大写）、full-width（字形转换成固定宽度的正方形）。
* text-decoration: 设置/取消字体上的文本装饰。none、underline、overline、line-through。可以一次接受多个值。
* text-shadow:可以有 4 个值
  1.  阴影与原始文本的水平偏移，必须指定。正偏移值向右。
  2.  阴影与原始文本的垂直偏移，必须指定。正偏移值向下。
  3.  模糊半径-更高的值以为意味着阴影分散更广泛。如果不包含此值，则默认为 0。
  4.  阴影的颜色，如果没有指定，默认为 black。

### 文本布局

1.  text-align

    * left
    * right
    * center
    * justify

2.  line-height

    可以设置为一个无单位的值，作为乘数；乘以 font-size 来获得 line-height。

3.  字母和字间距

    letter-spacing 和 word-spacing 属性

4.  text-indent
5.  word-break

### 列表特定样式

以下三个属性可以在 ul 或 ol 元素上设置：

* list-style-type:设置用于列表的项目符号的类型；
* list-style-position: 设置在每个项目开始之前，项目符号是出现在列表项内，还是出现在其外。
* list-style-image: 项目符号自定义图片。

### 链接样式

1.  链接状态

* link: 默认状态
* visited: 已被访问过
* hover: 鼠标光标悬停在这个链接上
* focus: 链接被选中
* active： 链接被激活

### 使用 CSS 改变背景样式

* background-color

  默认背景是 transparent（透明）

* background-image:可以是静态文件也可以是生成的渐变。

  线性渐变是通过 linear-gradient（）函数传入的，函数至少需要用逗号分隔的三个参数--背景中渐变的方向，开始的颜色和结尾的颜色。

* background-position

  允许在背景中任意位置放置背景图像。最常用的值类型：px,rem,百分比,left 等关键字。

* background-repeat
* background-attachment：当内容滚动时，指定元素背景的行为。
* background-size：允许动态调整背景图像的大小。

### 盒子阴影 box-shaow

box-shadow 属性值中有 4 个项：

    1. 水平偏移量；为正向右
    2. 垂直偏移量：为正向下
    3. 模糊半径
    4. 阴影的基本颜色

可以在单个 box-shadow 声明中指定多个框阴影，用逗号分隔。

box-shadow 有个关键字：inset,使其成为一个内部阴影。
