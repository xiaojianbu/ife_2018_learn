import san from 'san'
import { router } from 'san-router'
import HelloWorld from './HelloWorld1.san'

router.add({ rule: '/', Component: HelloWorld, target: '#app' })

router.start()
