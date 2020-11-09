import React from 'react';
import TaskForm from './TaskForm';
import {connect} from 'react-redux';
import {addTask} from '../actions/taskActions';

const AddTask = (props) => (
    <div>
        <TaskForm onSubmit={(taskInfo) => {
            if( !taskInfo.error ) {
                const task = props.dispatch(addTask(taskInfo));
                props.history.push('/');       
            }
        }
        }
        />
    </div>
);

const mapStateToProps = (state) => ({
    tasks : state.tasks
});

export default connect(mapStateToProps)(AddTask);