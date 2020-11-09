import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <div>
        
        <NavLink to="/" exact activeClassName="selected"  > Home </NavLink>
        <NavLink to="/addTask" activeClassName="selected" > Add Task </NavLink>
        <NavLink to="/Errorpage" activeClassName="selected" > Error page </NavLink>
        
    </div>
);

export default Header;