import React , {useState} from 'react';
import {connect} from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import {setText , setSortBy , setStartDate , setEndDate} from '../actions/filterActions';


const FilterInput = (props) => {
    // DateRangePicker input
    const [focusedInput , setFocusedInput] = useState(null);

    const handlDateChange = ({startDate , endDate}) => {
        props.dispatch(setStartDate(startDate));
        props.dispatch(setEndDate(endDate));
    }

    return (
        <div>
            <input placeholder='Search tasks' 
            value={props.filter.text} 
            onChange={(e) => props.dispatch(setText(e.target.value))}
            />

            <select onChange={(e) => props.dispatch(setSortBy(e.target.value)) } 
            value={props.filter.sorrtBy} 
            >
                <option value="PRIORITY"> Priority </option>
                <option value="START_DATE"> Creation Date </option>
                <option value="END_DATE"> Deadline </option>
            </select>

            <DateRangePicker
                startDate={props.filter.startDate   } // momentPropTypes.momentObj or null,
                startDateId="filter_start_date_id" // PropTypes.string.isRequired,
                endDate={props.filter.endDate } // momentPropTypes.momentObj or null,
                endDateId="filter_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={(dates) => handlDateChange(dates)} // PropTypes.func.isRequired,
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                isOutsideRange={() => false}
                onFocusChange={focusedInput => setFocusedInput( focusedInput )} // PropTypes.func.isRequired,
            /> 
        </div>
    )
}
    
const mapStateToProps = (state) => ({
    filter : state.filter
})

export default connect(mapStateToProps)(FilterInput);