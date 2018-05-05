import san from 'san'
import {
  router
} from 'san-router'
import inputAndCheckbox from './inputAndCheckbox.san'

router.add({
  rule: '/',
  Component: inputAndCheckbox,
  target: '#app'
})

router.start()
