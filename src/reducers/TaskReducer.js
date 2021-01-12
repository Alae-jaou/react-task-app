
const tasksReducer = (state = [] , action ) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state , action.taskInfo];

        case 'EDIT_TASK': 
            return  state.map((task) => {
                if (task.taskId === action.id  ) {
                    return {...task , ...action.element}     
                } else return task ; 
            });
        case 'SET_TASK' : 
             return state.map((task) => {
                if (task.taskId === action.id) {
                    return {...task , taskState : action.targetIndex }
                } else return task;
            })
            
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

export default tasksReducer;