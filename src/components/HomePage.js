import React from 'react';
import TaskList from './TaskList';
import FilterInput from './FilterInput';
import Statistics from './Statistics';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const HomePage = () => (
    <div>
        <h3> Task List </h3>
        <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">        
            <Tab eventKey="home" title="Home">
                <FilterInput />
                <TaskList  />
            </Tab>

            <Tab eventKey="statistics" title="Statistics">
                <Statistics />
            </Tab>
        </Tabs>
        
    </div>
);


export default HomePage;

