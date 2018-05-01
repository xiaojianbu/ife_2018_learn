import san from 'san'
import { router } from 'san-router'
import ifAndFor from './ifAndFor.san'

router.add({ rule: '/', Component: ifAndFor, target: '#app' })

router.start()
