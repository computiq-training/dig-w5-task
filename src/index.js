import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider

} from 'react-router-dom'
import {ThemeProvider, THEMES} from './contexts/ThemeContext'
import {Login} from './pages/login'
import Patients from './pages/patients';
import Home from './pages/Home'
import Layout from './pages/layout';
import SnackbarProvider from 'react-simple-snackbar'
import { AuthProvider } from './contexts/AuthContext';
import PatientProfile from './pages/PatientPres';
//import { Guard } from './components/GuardComponent';
const router = createBrowserRouter([
  {
    path:'/',
    element:
      <Layout/>,

    children:[
      {
        path:'patients',
        element:<Patients/>
      },
      {
        path:'Home',
        element:<Home/>
      },
      {
        path:'patients/:id',
        element:<PatientProfile/>
      }
     
    ]
  },
  {
    path:'/login',
    element:<Home/>
  },
  
])
 const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={{
      ...THEMES.light
    }}>
      <SnackbarProvider>
         <AuthProvider>
          <RouterProvider router={router}/>
         </AuthProvider>
      </SnackbarProvider>
     
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
