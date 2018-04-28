import san from 'san'
import './hello.css'

const MyApp = san.defineComponent({
  template: '<p class="hello">Hello World {{ name }}!</p>',
  initData: function() {
    return {
      name: 'San'
    }
  }
})
const myApp = new MyApp()
myApp.attach(document.body)
