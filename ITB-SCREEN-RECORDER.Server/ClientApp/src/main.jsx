import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // או ./App.scss אם הגדרת עיצוב גלובלי
import './App.scss' // קובץ ה-SCSS שלך

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)