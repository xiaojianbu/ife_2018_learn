import san from 'san'
import { router } from 'san-router'
import HelloWorld from './HelloWorld.san'

router.add({ rule: '/', Component: HelloWorld, target: '#app' })

router.start()
