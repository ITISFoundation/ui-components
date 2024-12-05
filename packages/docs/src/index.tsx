import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const containerElement = document.getElementById('root')

if (containerElement) {
  const root = createRoot(containerElement);
  root.render(<App/>);
}
