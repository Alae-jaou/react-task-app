import React from 'react';
import TaskList from './TaskList';
import FilterInput from './FilterInput';

const HomePage = () => (
    <div>
        <h3> Task List </h3>
        <FilterInput />
        <TaskList  />
        
    </div>
);

export default HomePage;