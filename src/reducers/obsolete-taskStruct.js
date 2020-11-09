const dataStruct = (data = [{
    title: 'group 1',
    group: 'one',
    items: []
}, {
    title: 'group 2',
    group: 'two',
    items: []
}, {
    title: 'group 3',
    group: 'three',
    items: []
}], action) => {
    switch (action.type) {
        case 'SET_VALUES':
            data.map((task , taskIndex) => 
                task.items = action.taskList.filter((item) => item.taskState -1 === taskIndex )
            );
            console.log('a' , data);
            return data
            break;
        case 'AUTO_SET_VALUE':
            return action.data
        case 'DELETE_TASK':
            const arr = data[action.taskState-1].items.filter((task) => task.taskId !== action.taskId);
            data[action.taskState -1 ].items = arr;
            return data;
    }
    
    return data;
}

export default dataStruct;