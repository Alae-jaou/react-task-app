import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'; 

export const addTask = (taskInfo) => ({
    type : 'ADD_TASK', 
    taskInfo
});

export const startAddTask = ({
    taskName = '',
    taskDescription = '',
    taskState = 0,
    startDate = 0 ,
    endDate = 0, 
    priority = '' 
} = {}) => {
    return async (dispatch) => {
        const task = {
            taskName,
            taskDescription,
            startDate ,
            taskState,
            endDate , 
            priority 
        }
        await axios.post('http://localhost:3001/task' , task)
        .then((res) => {
            dispatch(addTask({taskId : res.data._id , ...task}))
        }).catch((e) => console.log('server not responding', e))
    }
}

export const editTask = (id , element = {}) => ({
    type : 'EDIT_TASK',
    id, 
    element
    
});

export const moveTask = ( id ) => ({
    type : 'MOVE_TASK', 
    id
});

export const deleteTask = ( id , taskState ) => ({
    type : 'DELETE_TASK',
    id,
    taskState
});

export const setTask = (id, targetIndex) => ({
    type : 'SET_TASK',
    id, 
    targetIndex
})

// export const setDataStruct = ( taskList ) => ({
//     type : 'SET_VALUES',
//     taskList
// });

// export const deleteElement = (taskId , taskState) => ({
//     type : 'DELETE_TASK',
//     taskId,
//     taskState   
// });

// export const setAutoSetValues = ( data ) => ({
//     type : 'AUTO_SET_VALUE',
//     data
// });
