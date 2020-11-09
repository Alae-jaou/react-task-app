import React  from 'react';
import Routes from './components/Routes';
import './styles/styles.scss';
import configStore from './configStore/configStore';
import { Provider } from "react-redux";


const store = configStore();

store.subscribe(() => {
  console.log('store ',store.getState());
  
});
const App = () => (
  <div>
    <Provider store={store}>
       <Routes />
    </Provider>
   
  </div>
);


// const App = () => {

//   const [value , setValue] = useState('');
//   const [double , setDouble] = useState('');
  
  
//   const getDouble = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:3001',{number : value})
//     .then((res)=>setDouble(res.data.double))
//     .catch((err)=>console.log(err));

//   }
  
//   return (
//     <div>
//       <h1>  Welcom to React  </h1> 

//     <form onSubmit={getDouble}>
//       <input value={value} onChange={(e)=>setValue(e.target.value)} />
//       <button> Get double </button>
//     </form>

//     {double && <div>
//         <p> The double is  {double} </p>
//         </div>
//       }

//     </div>
//   );
// };



export default App;