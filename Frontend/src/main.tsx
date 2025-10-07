import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter as Router } from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify'
import { store } from './app/Store.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          rtl={false}
          theme="light"
          transition={Bounce}
        />
      </Provider>
    </Router>
  </StrictMode>,
)