import moment from 'moment';

const defaultFilters = {
    text : "",
    sorrtBy : "PRIORITY", // date or priority {by default is sorts by endDate task}
    startDate : moment().startOf("month"),
    endDate : moment().endOf("month")
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

export default filterReducer;