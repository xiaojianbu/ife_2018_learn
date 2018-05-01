import san from 'san'
import { router } from 'san-router'
import DataBind from './DataBind.san'

router.add({ rule: '/', Component: DataBind, target: '#app' })

router.start()
