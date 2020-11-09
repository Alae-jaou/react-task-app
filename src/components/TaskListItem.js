import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteTask} from '../actions/taskActions';


const TaskListItem = (  props   ) => {
    
   return(
       <div key={props.taskId}  >
           <NavLink to={`/edit/${props.taskId}`} > {props.taskName} </NavLink>
           <p> {props.taskDescription } </p>
           <button onClick={()=> {
                props.dispatch(deleteTask(props.taskId , props.taskState));
            }
            } > remove </button> 
            
        </div>
   )
}

const mapStateToProps = (state) => ({
    taskStored : state.tasks
})

export default connect(mapStateToProps)(TaskListItem);