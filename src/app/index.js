import React from 'react'
import './index.css';
import ComponentLayout from 'components/CompLayout';
import store from 'store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <ComponentLayout></ComponentLayout>
    </Provider>)
}

export default App;

