    //          startDate <= taskDate <= endDate
const getVisibleData = (tasks , {text , sorrtBy , startDate , endDate }) => {
    return tasks.filter((task) => {
        const matchTaskName = typeof text !=='string' || task.taskName.toLowerCase().includes(text.toLowerCase());
        const matchTaskDescription = typeof text !=='string' || task.taskDescription.toLowerCase().includes(text.toLowerCase());
        const matchStartDate = typeof startDate === 'undefined'|| startDate <= task.startDate ;
        const matchEndDate = typeof endDate === 'undefined'||  endDate >= task.endDate;
    
        return (matchTaskName || matchTaskDescription) && matchStartDate && matchEndDate ;
        }).sort((a , b) => {
        if (sorrtBy === 'START_DATE') {
            return b.startDate - a.startDate
        } else if ( sorrtBy === 'PRIORITY' ) {
            return a.priority - b.priority
        } else return a.endDate - b.endDate
    })
}

export default getVisibleData;