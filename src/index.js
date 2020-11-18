import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import ReduxApp from './playground/reduxUpdated';
import Draggableitems from './playground/Draggableitems';
import * as serviceWorker from './serviceWorker';
import './styles/styles.scss'; 

const data = [
  {
    title : 'group 1',
    group:'one',
    item:[1,2,3]
  },{
    title : 'group 2',
    group:'two',
    item:[4,5]
  },{
    title : 'group 3',
    group:'three',
    item:[6,7]
  }
];

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
