import React from 'react';
import TaskForm from './TaskForm';
import {connect} from 'react-redux';
import { editTask } from '../actions/taskActions';

const EditPage = (props) => {
    console.log(props);
    return (
        <div>
            
            <TaskForm  taskInfo={props.task}
            onSubmit={(task) => {
                console.log(task);
                props.dispatch(editTask( props.match.params.id, task));
                props.history.push('/');
            }}
            /> 
        </div>
    )
}

const mapStateToProps = (state , props) => ({
    task : state.tasks.find((task) => task.taskId === props.match.params.id )
});

export default connect(mapStateToProps)(EditPage);