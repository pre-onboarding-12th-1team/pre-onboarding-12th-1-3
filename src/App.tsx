import 'styles/index.scss'

import MainPage from 'pages/MainPage'
import { Provider } from 'react-redux'
import { store } from 'redux/store'

const App = () => (
  <Provider store={store}>
    <MainPage />
  </Provider>
)

export default App
