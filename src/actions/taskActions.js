import { v4 as uuidv4 } from 'uuid';

export const addTask = ({
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
        taskState : 1, 
        endDate, 
        priority, 
        message : undefined
    }
});

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
