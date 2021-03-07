import React from 'react'
import './index.css';
import PreviewComponent from 'components/PreviewComponent';
import store from 'store'
import { Provider } from 'react-redux'
function App() {
  return (
    <Provider store={store}>
      <PreviewComponent></PreviewComponent>
    </Provider>)
}

export default App;

