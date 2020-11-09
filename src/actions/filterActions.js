// Filter actions 
export const setText = (text = '') => ({
    type : 'SET_TEXT',
    text
});

export const setStartDate = ( startDate = '' ) => ({
    type : 'SET_START_DATE',
    startDate
}); 

export const setEndDate = ( endDate = '' ) => ({
    type : 'SET_END_DATE',
    endDate
});

export const setSortBy = (sorrtBy = 'endDate') => ({
    type : 'SET_SORT_BY',
    sorrtBy
});
