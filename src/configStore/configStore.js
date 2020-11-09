import tasksReducer from '../reducers/TaskReducer';
import filterReducer from '../reducers/filterReducer';
import  {createStore , combineReducers , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const configStore = () => createStore(
    combineReducers({
        tasks : tasksReducer,
        filter : filterReducer
        
    }),
    applyMiddleware(thunk)
);

export default configStore;