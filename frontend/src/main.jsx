import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { AppContextProvider } from './Context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppContextProvider>
            <App />
          </AppContextProvider> 
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
