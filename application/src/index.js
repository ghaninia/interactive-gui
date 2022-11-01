import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Application from './application';
import DataContext from "./application/contexts/DataContext" ;

const root = ReactDOM.createRoot(document.getElementById('root'));
const data = JSON.parse(document.getElementById('data')?.textContent) ;


root.render(
  <React.StrictMode>
      <DataContext.Provider value={ data }>
        <Application />
      </DataContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
