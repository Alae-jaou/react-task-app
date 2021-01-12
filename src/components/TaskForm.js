import React , {useState} from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

const TaskForm = (props  ) => {
    let obj= {
        taskName : props.taskInfo ? props.taskInfo.taskName : '',
        taskDescription : props.taskInfo ? props.taskInfo.taskDescription : '',
        taskStartDate : props.taskInfo ? props.taskInfo.startDate : moment(),
        taskEndDate : props.taskInfo ? props.taskInfo.endDate : moment().add(7,'days'),
        priority : props.taskInfo ? props.taskInfo.priority : '' 
    };
    
    const [Name , setName] =  useState(obj.taskName);
    const [Description , setDescription] = useState(obj.taskDescription);
    const [dateRange , setDateRange] = useState({
        startDate : obj.taskStartDate.valueOf(), 
        endDate : obj.taskEndDate.valueOf()
    });
    const [Prio , setPrio] = useState(obj.priority);
    const [focusedInput , setFocusedInput] = useState(null);
    const [error, setError] = useState(undefined);
  
    const onSubmitForm = (e) => {
        e.preventDefault();
        if ( !Name || !Description || !Prio ) {
            setError(true);
            props.onSubmit({error : true});
        } else {
            setError(false);
            props.onSubmit ({
            taskName : Name,
            taskDescription : Description,
            ...dateRange,
            priority : Prio
        });
        }    
    }
    const buttonLabel = !obj.taskName ? 'Add Task' : 'Edit Task';
    return (
        <div>
            <form onSubmit={onSubmitForm} >
                {error && <p> Please you have to provide a task Title, Description and Prio </p>}
                <input  name='NameInput' 
                value={Name} onChange={(e) => setName(e.target.value)}
                placeholder='Enter the task title ' />

                <textarea name='DescriptionInput' 
                value={Description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Description" /> 

                <DateRangePicker
                startDate={moment(dateRange.startDate)} // momentPropTypes.momentObj or null,
                startDateId="start_date_id" // PropTypes.string.isRequired,
                endDate={moment(dateRange.endDate)} // momentPropTypes.momentObj or null,
                endDateId="end_date_id" // PropTypes.string.isRequired,
                onDatesChange={(dates) => setDateRange(dates)} // PropTypes.func.isRequired,
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                isOutsideRange={() => false}
                onFocusChange={focusedInput => setFocusedInput( focusedInput )} // PropTypes.func.isRequired,
                /> 
                
                <select name="PrioSelector"
                value={Prio} onChange={(e) => setPrio(e.target.value)} >
                 
                    <option value="">--Please choose the Prio--</option>
                    <option value="1"> Urgent </option>
                    <option value="2"> Medium </option>
                    <option value="3"> Not Urgent </option>
                </select>

                <button> { buttonLabel } </button>
            </form>
        </div>
)};

export default TaskForm;