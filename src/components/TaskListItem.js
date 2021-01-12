import React , {useState , useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteTask} from '../actions/taskActions';
import ModalEffect from './Modals';

const TaskListItem = ( props ) => {
   const [show , setShow] = useState(false);
   const [count , setCount] = useState(0);
   
   return(
       <div> 
           <ModalEffect show={show} 
                taskId={props.taskId}
                onSubmit={(res) => res ? props.dispatch(deleteTask(props.taskId, props.taskState)) : null }
                count={count} 
           />
           
           <div key={props.taskId}  >
               <NavLink to={`/edit/${props.taskId}`} > {props.taskName} </NavLink>
               <p> {props.taskDescription} </p>
               
               <button onClick={(e) => {
                   setCount(count+1)
                   setShow(true)
               }}
               >
                remove </button>
           </div>
       </div>
       
   )
}

const mapStateToProps = (state) => ({
    taskStored : state.tasks
})

export default connect(mapStateToProps)(TaskListItem);