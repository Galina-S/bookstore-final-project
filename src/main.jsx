import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from "../src/AppContext"

ReactDOM.createRoot(document.getElementById('root')).render(
<AppProvider>
  <BrowserRouter>
      <App />
  </BrowserRouter>
</AppProvider>
)
