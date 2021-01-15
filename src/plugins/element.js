import Vue from 'vue'
import { 
  Alert,
  Avatar,
  Link,
  Tabs,
  TabPane,
  Card,
  Button,
  Input,
  Select,
  Option,
  Tooltip,
  Dialog,
  Message,
  Checkbox,
  Radio,
  RadioGroup,
  PageHeader,
  DatePicker,
  Autocomplete,
  MessageBox,
} from 'element-ui'
import '@/scss/element-var.scss'

Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Alert)
Vue.use(Avatar)
Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Link)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(PageHeader)
Vue.use(DatePicker)
Vue.use(Autocomplete)

Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$confirm = MessageBox.confirm