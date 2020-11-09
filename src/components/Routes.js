import React from 'react';
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import HomePage from './HomePage';
import AddTask from './AddTask';
import EditTask from './EditTask';
import ErrorPage from './ErrorPage';
import Header from './Header';

const Routes = () => (
    <div>
        <Router>
            <Header  />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/addTask" component={AddTask} />
                <Route path="/edit/:id" component={EditTask} />
                <Route component={ErrorPage} />
            </Switch>
        </Router>
   </div>
    
)

export default Routes;