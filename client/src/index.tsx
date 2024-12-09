import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'
//imported from material ui website
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { router } from './app/router/Routes.js';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore.js';


const root=ReactDOM.createRoot(document.getElementById('root')!);



root.render(
  //Storeprovider  removed
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
)

