import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import StudentData from "./studentData.json"
// import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import store from "./studentData.js";

// const studentStore = StudentData;
// const store = configureStore({
//   reducer: {
//     students: studentReducer,
//   },
// });
createRoot(document.getElementById('root')).render(
<Provider store={store}>
   {/* <StrictMode> */}
    <App />
  {/* </StrictMode> */}
  </Provider>
)
