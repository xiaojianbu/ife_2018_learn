import san from 'san'
import {
  router
} from 'san-router'
import GrandFather from './GrandFather.san'

router.add({
  rule: '/',
  Component: GrandFather,
  target: '#app'
})

router.start()
