import san from 'san'
import { router } from 'san-router'
import styleControl from './styleControl.san'

router.add({ rule: '/', Component: styleControl, target: '#app' })

router.start()
