import { createApp } from 'vue'
import App from './App.vue'

//import로 가져온 createApp을 이용해 App.vue파일을 적용하고, id app을 가진 div에 mount한다
const app = createApp(App)

app.mount('#app')
