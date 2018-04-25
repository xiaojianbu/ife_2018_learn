# Day-1

温故而知新，希望通过这次的学习可以把基础弄得更扎实些。

日期：2018-04-24 今天学习总用时：2 小时，今天学习的目标：巩固前端基础知识（√）

需要继续深入了解的东西：SVG、CSS 动画。

## 学习总结：

### HTML

1.  一些基本的 HTML 标签，例如：h1、p、img、a、ul、ol、li、dl、dt、dd 等；
2.  HTML 语义化：标题 header、导航栏 nav、主要内容：main article section、侧栏 aside、页脚 footer 等；
3.  多媒体的嵌入：img、figure、figcaption（为图片提供一个语义容器）、video、audio。

    ```html
    <video controls width="400" height="400" autoplay loop muted poster="poster.png">
      <source src="1.mp4" type="video/mp4">
      <source src="1.webm" type="video/webm">
      <p>Your browser doesn't support HTML5 video. Here is a <a href="1.mp4">link to the video</a> instead.</p>
    </video>
    <audio controls>
      <source src="1.mp3" type="audio/mp3">
      <source src="1.mp3" type="audio/ogg">
      <p>Your browser doesn't support HTML5 audio. Here is a <a href="1.mp3">link to the audio</a> instead. </p>
    </audio>
    ```

    muted:媒体播放时，默认关闭声音；poster：指向一个图像的 URL，这个图像会在视频播放前显示。

4.  嵌入技术：iframe

    ```html
    <iframe src="https://developer.mozilla.org/en-US/docs/Glossary" width="100%" height="500" frameborder="0" allowfullscreen sanbox>
      <p>
        <a href="https://developer.mozilla.org/en-US/docs/Glossary">Fallback link for browsers that don't support iframes
        </a>
      </p>
    </iframe>
    ```

    allowfullscreen:如果设置，iframe 则可以使用全屏 API 放置在全屏模式
    frameborder:如果设置为 1，则会告诉浏览器在此框架和其他框架之间绘制边框，这是默认行为。0 删除边框。不推荐这样设置，因为在 CSS 中可以更好地实现相同的效果。border: none;
    sandbox:该属性比其他 iframe 功能（例如 IE 10 及更高版本）稍微更现代的浏览器工作，要求提高安全性设置;

5.  矢量图：SVG，以下代码创建一个园和一个矩形

    ```html
    <svg version="1.1" baseProfile="full" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="black"/>
      <circle cx="150" cy="100" r="90" fill="blue"/>
    </svg>
    ```

6.  响应式图片：利用 srcset 和 sizes

    ```html
    <img srcset="1.jpg 320w,
         2.jpg 480w,
         3.jpg 800w" sizes="(max-width:320px) 280px,
         (max-width:480px) 440px,
         800px" src="3.jpg" alt="图片">
    <picture>
      <source media="(max-width:799px)" srcset="1.jpg">
      <source media="(min-width:800px)" srcset="2.jpg">
      <img src="2.jpg" alt="图片">
    </picture>
    ```

    source 元素包含一个 media 属性，这一属性包含一个媒体条件——就像第一个 srcset 例子，这些条件来决定哪张图片会显示——第一个条件返回真，那么就会显示这张图片。
    srcset 属性包含要显示图片的路径。在任何情况下，你都必须在 </picture>之前正确提供一个元素以及它的 src 和 alt 属性，否则不会有图片显示。

7.  表格的 HTML 标签

    * table
    * tr table row
    * th table header
    * td 单元格
    * colspan
    * rowspan

      7.1 为表格中的列提供共同的样式

      col 和 colgrouo 元素，可以定义整列数据的样式信息。

      ```html
      <table>
        <colgroup>
          <col>
          <col style="background-color: yellow">
        </colgroup>
        <tr>
          <th>DATA-1</th>
          <th>DATA-2</th>
        </tr>
        <tr>
          <td>data</td>
          <td>data</td>
        </tr>
      </table>
      ```

      7.2 使用 caption 添加标题

      7.3 添加 thead、tfoot、tbody 结构，这些元素允许把表格中的部分标记为表头、页脚、正文部分。

      7.4 scope 属性
      scope 属性可以添加在 th 元素中，用来帮助屏幕阅读设备更好地理解那些标题单元格，这个标题单元格到底是列标题还是行标题。

      scope 还有两个可选的值：colgroup 和 rowgroup。

#### HTML 表单

表单由一个或多个小部件组成，这些小部件可以是文本字段、选择框、按钮、复选框或单选按钮。HTML 表单和常规 HTML 文档的主要区别在于，大多数情况下，表单收集的数据被发送到 web 服务器。

1.  表单标签：form、label、input、textarea、button

    1.1 form 中的 action 属性和 method 属性。

        * action属性定义了在提交表单时所收集的数据的位置（URL）
        * method属性定义了发送数据的HTTP方法

    1.2 button 接受一个 type 属性，值为 submit、reset 或 button 中的一个。

        * submit 发送表单的数据到 form 元素的 action 属性所定义的网页。
        * reset 将所有表单小部件重新设置为它们的默认值。

    1.3 fieldset 和 legend 元素

    fieldset 元素是一种方便的用于创建具有相同目的的小部件组的方式，在 fieldset 标签后加上一个 legend 元素来给 fieldset 标上标签，legend 的文本内容正式地描述 fieldset 的用途。

    1.4 表单元素的通用属性

        * autofocus:当前页面加载时元素自动具有输入焦点。
        * disabled:表示用户不能与元素交互。
        * name:元素名称，用于表单数据提交。
        * value:元素的初始值。

2.  文本域

    文本输入域 input 是最基本的表单小部件。所有文本域都有的通用规范：

        * 可以标记为readonly
        * 可以有placeholder
        * 可以被限制在size和长度
        * 如果浏览器支持，可以从拼写检查中获益

    2.1 单行文本域，使用 input 创建一个单行文本域，type 属性被设置为 text。

    2.2 E-mail 地址域，type 被设置为 email。

    2.3 密码域，type 被设置为 password。

    2.4 搜索域，type 被设置为 search。

    2.5 电话号码域，type 被设置为 tel。

    2.6 URL 域，type 被设置为 url。

    2.7 多行文本域，使用 textarea 元素。元素属性：cols、rows、wrap。

3.  下拉内容

    3.1 选择框，用 select 元素创建，其中有一个或多个 option 元素作为子元素。

    3.2 多选选择框，通过 multiple 属性添加到 select 元素。

    3.3 自动补全输入框，使用 datalist 元素来为表单小部件提供建议的、自动完成的值，并使用一些 option 子元素来指定要显示的值。然后使用 list 属性将数据列表绑定到一个文本域。demo：

    ```html
    <label for="myFruit">What's your favorite fruit?</label>
    <input type="text" name="myFruit" id="myFruit" list="mySuggestion">
    <datalist id="mySuggestion">
        <option>Apple</option>
        <option>Banana</option>
        <option>Blackberry</option>
        <option>Blueberry</option>
        <option>Lemon</option>
        <option>Lychee</option>
        <option>Peach</option>
        <option>Pear</option>
    </datalist>
    ```

4.  可选中项

    4.1 复选框：使用 type 属性值为 checkbox 的 input 元素来创建一个复选框。

    4.2 单选按钮：使用 type 属性值为 radio 的 input 元素来创建一个单选按钮。

5.  高级表单部件

    5.1 数字，type 属性设置为 number。可以通过设置 min 和 max 属性来约束该值；可以通过设置 step 属性来指定增加和减少按钮更改小部件的值的数量。

    5.2 滑块，type 设置为 range。最好设置 min、max 和 step 属性。

    5.3 日期选择器,所有日期和事件控制都可以使用 min 和 max 属性来约束。

        5.3.1 本地时间：创建一个小部件来显示和选择一个日期，但是没有特定的时区信息。type="datetime-local"
        5.3.2 月,type="month"
        5.3.3 时间,type="time"
        5.3.4 星期，type="week"

    5.4 拾色器 type="color"

    5.5 文件选择器
    type="file",被接受的文件类型可以使用 accept 属性来约束，添加 multiple 属性可以选择多个文件。

    5.6 仪表和进度条

        5.6.1 进度条 progress  
        5.6.2 仪表 meter

        `html <meter min="0" max="100" value="75" low="33" high="66" optimum="50">75</meter>`

6.  表单发送文件

    文件是二进制数据--而所有其他数据都是文本数据。由于 HTTP 是一种文本协议，所以处理二进制数据有特殊的要求。

    6.1 enctype 属性

    允许指定在提交表单时生成的请求中的 Content-Type 的 HTTP 数据头的值。默认值为 application/x-www-form-urlencoded（已经编码为 URL 参数的表单数据）。

    6.2 发送文件所需的而外三个步骤：

        * 将method属性设置为POST
        * 将enctype设置为multiparty/form-data
        * 包含一个或多个文件选择器。

7.  常见的安全问题

    7.1 XSS 和 CSRF

         跨站脚本(XSS)和跨站点请求伪造(CSRF)是常见的攻击类型，它们发生在当您将用户发送的数据显示给用户或另一个用户时。
         XSS允许攻击者将客户端脚本注入到其他用户查看的Web页面中。
         CSRF攻击类似于XSS攻击，因为它们以相同的方式攻击——向Web页面中注入客户端脚本——但它们的目标是不同的。CSRF攻击者试图将特权升级到特权用户(比如站点管理员)的权限，以执行他们不应该执行的操作(例如，将数据发送给一个不受信任的用户)。

    7.2 SQL 注入

        SQL 注入是一种试图在目标web站点使用的数据库上执行操作的攻击类型。

8.  表单数据校验

    JS 校验和 HTML5 内置的校验

    当使用内置表单数据验证：

        * 当一个元素校验通过时：
            - 该元素可以通过CSS伪类:valid进行特殊的样式化；
            - 如果用户尝试提交表单，如果没有其它的控制来阻止该操作，那么该表单的数据会被提交。
        * 当一个元素未校验通过：
            - 该元素可以通过CSS伪类:invalid进行列表的样式化；
            - 如果用户尝试提交表单，浏览器会展示出错误信息，并停止表单的提交。

    8.1 required 属性，如果要使输入成为必须，则可以使用此属性。

    8.2 使用正则表达式验证，另一个常用的验证功能是 pattern 属性，以正则表达式作为 value 值。

    8.3 强制条目的长度，所有文本框可以使用 minlength 和 maxlength 属性来控制文本的长度。

### 参考来源

[Web 开发入门](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web)
