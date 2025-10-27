import Snowflake from '../snowflake/index.vue'
import Background from './background.vue'
import Launchpad from './launchpad.vue'
import SendResume from './sendResume.vue'
import Setting from './setting.vue'
import WriteResume from './writeResume.vue'
const list = [
  { name: '启动台', component: Launchpad },
  { name: '背景', component: Background },
  { name: '写简历', component: WriteResume },
  { name: '投简历', component: SendResume },
  { name: '雪花', component: Snowflake },
  { name: '设置', component: Setting },
]
export default list
