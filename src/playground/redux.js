import React  from 'react';
import {createStore , combineReducers} from 'redux';
import { v4 as uuidv4 } from 'uuid';

// data in store : 
/*
store = [{
    taskId : '',
    taskName : '',
    taskDescription,
    taskState, //in the todo list = 1 / In progress = 2 / finished = 3
    startDate : 0,
    endDate: 0,  
    priority : '', // urgent = 1 , normal = 2 , not urgent = 3 
    message : undefined
}];
*/
// filters : 
/*
filter : {
    text : "",
    sorrtBy : "", // date or priority {by default is sorts by endDate task}
    startDate : undefined,
    endDate : undefined
}
*/
const ReduxApp = () => (
    <div>
        Redux Archi       
    </div>
);

const tasksReducer = (state = [] , action ) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state , action.taskInfo];

        case 'EDIT_TASK': 
            return  state.map((task) => {
                if (task.taskId === action.taskInfo.id  ) {
                    return {...task , ...action.taskInfo.element}     
                } else return task ; 
            });
            
        case 'MOVE_TASK' : 
            return  state.map((task) => {
                if (task.taskId === action.id && task.taskState < 3 ) {
                    return {...task , taskState : task.taskState + 1}     
                } else if ( task.taskState >= 3 )
                    return { ...task , message: ' You can\'t update a finished task ! ' } 
                else return task ; 
            });

        case 'DELETE_TASK': 
            return state.filter((task) => task.taskId !== action.id );

        default:
            return state;
    }
};

const defaultFilters = {
    text : "",
    sorrtBy : "endDate", // date or priority {by default is sorts by endDate task}
    startDate : undefined,
    endDate : undefined
};

const filterReducer = (state = defaultFilters , action) => {
    switch (action.type) {
        case 'SET_TEXT':
            return {...state, text : action.text};

        case 'SET_START_DATE':
            return {...state, startDate : action.startDate};

        case 'SET_END_DATE':
            return {...state, endDate : action.endDate};

        case 'SET_SORT_BY' : 
            return {...state , sorrtBy:action.sorrtBy }
       
        default:
            return state;
    }
    
};

const store = createStore(
    combineReducers({
        tasks : tasksReducer,
        filter : filterReducer
    })
);
    //          startDate <= taskDate <= endDate
const getVisibleData = (tasks , {text , sorrtBy , startDate , endDate }) => {
        return tasks.filter((task) => {
        const matchTaskName =  task.taskName.toLowerCase().includes(text.toLowerCase());
        const matchTaskDescription = task.taskDescription.toLowerCase().includes(text.toLowerCase());
        const matchStartDate = typeof startDate === 'undefined'|| startDate <= task.startDate ;
        const matchEndDate = typeof endDate === 'undefined'||  endDate >= task.endDate;
        console.log((matchTaskName || matchTaskDescription) && matchStartDate && matchEndDate);
        
        return (matchTaskName || matchTaskDescription) && matchStartDate && matchEndDate ;
    }).sort((a , b) => {
        if (sorrtBy === 'START_DATE') {
            return b.startDate - a.startDate
        }else if ( sorrtBy === 'PRIORITY' ) {
            return a.priority - b.priority
        }else return a.endDate - b.endDate
    })
};

//date or priority
store.subscribe(() => {
    //console.log(store.getState());
    const state = store.getState();
    const visibleData = getVisibleData(state.tasks , state.filter);
    console.log(visibleData);
});

const addTask = ({
    taskName = '',
    taskDescription = '',
    startDate = 0 ,
    endDate = 0, 
    priority = '' 
}) => ({
    type : 'ADD_TASK', 
    taskInfo : {
        taskId : uuidv4(),
        taskName,
        taskDescription,
        startDate,
        taskState : 0, 
        endDate, 
        priority, 
        message : undefined
    }
});

const editTask = ({id , element}) => ({
    type : 'EDIT_TASK',
    taskInfo : {
        id, 
        element
    }
});

const moveTask = ( id ) => ({
    type : 'MOVE_TASK', 
    id
});

const deleteTask = ( id ) => ({
    type : 'DELETE_TASK',
    id
});

// Filter actions 
const setText = (text = '') => ({
    type : 'SET_TEXT',
    text
});

const setStartDate = ( startDate = '' ) => ({
    type : 'SET_START_DATE',
    startDate
}); 

const setEndDate = ( endDate = '' ) => ({
    type : 'SET_END_DATE',
    endDate
});

const setSortBy = (sorrtBy = 'endDate') => ({
    type : 'SET_SORT_BY',
    sorrtBy
});

// create task
const element = store.dispatch(addTask({taskName : 'Alae' , priority: 2 }));
store.dispatch(addTask({taskName : 'ayoub', priority: 3}));
store.dispatch(addTask({taskName : 'mehdi' , priority: 1}));
store.dispatch(addTask({taskName : 'zakaria' , priority: 1}));
//edit Task
// store.dispatch(editTask({id : element.taskInfo.taskId , element : { taskName : 'Alae' , startDate : 50} } ))

// // move Task
// store.dispatch(moveTask(element.taskInfo.taskId));
// store.dispatch(moveTask(element.taskInfo.taskId));
// store.dispatch(moveTask(element.taskInfo.taskId));
// store.dispatch(moveTask(element.taskInfo.taskId));

// // delete task
// store.dispatch(deleteTask(element.taskInfo.taskId));

// set text
// store.dispatch(setText( 'Ami' ));

// set startDate 
// store.dispatch(setStartDate(12));

// // set endDate 
// store.dispatch(setEndDate(200));

// // set sorrtBy
 store.dispatch(setSortBy('PRIORITY'));
 console.log(store.getState());
export default ReduxApp;