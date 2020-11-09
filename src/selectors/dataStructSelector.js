    //          startDate <= taskDate <= endDate
const dataStructSelector = (tasks , {text , sorrtBy , startDate , endDate }) => {
    const data = [
    {title: 'group 1', group: 'one', items: []}, 
    {title: 'group 2', group: 'two', items: [] }, 
    {title: 'group 3', group: 'three',items: []}];

    data.map((struct , structIndex) => {
        data[structIndex].items =  tasks.filter((task) =>  {
            const matchTaskName =  task.taskName.toLowerCase().includes(text.toLowerCase());
            const matchTaskDescription = task.taskDescription.toLowerCase().includes(text.toLowerCase());
            const matchStartDate = typeof startDate === 'undefined'|| startDate <= task.startDate ;
            const matchEndDate = typeof endDate === 'undefined'||  endDate >= task.endDate;
            // console.log((matchTaskName || matchTaskDescription) && matchStartDate && matchEndDate);
            return (matchTaskName || matchTaskDescription) && matchStartDate && matchEndDate && (task.taskState -1 === structIndex) ;
            }).sort((a , b) => {
                if (sorrtBy === 'START_DATE') {
                    return b.startDate - a.startDate
                }else if ( sorrtBy === 'END_DATE' ) {
                    return a.endDate - b.endDate
                }else return a.priority - b.priority
})
    })
    
    return data
}


export default dataStructSelector;
// const data = [
//       {taskName : 'amina' , taskDescription : 'Alae' , taskState : 1 } ,
//       {taskName : 'brahim' , taskDescription : 'aria' , taskState : 0  } 
//     ];

//    const a = dataStructSelector(data , {text : 'amina'});
//    console.log( 'éré"ré' , a);