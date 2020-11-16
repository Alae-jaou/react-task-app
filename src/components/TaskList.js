import React , {useState , useRef , useEffect } from 'react';
import {connect} from 'react-redux';
import TaskListItem from './TaskListItem';
import ModalEffect from './Modals';
import {moveTask} from '../actions/taskActions';
import dataStructSelector from '../selectors/dataStructSelector';

const TaskList = (props) => {

    const [list, setList] = useState(props.taskStore);
    const draggedItem = useRef(null);
    const dragNode = useRef(null);
    const draggedBox = useRef(null);
    const [dragging , setDragging] = useState(false);
    const [modalState , setmodalState] = useState(false);
    const oldListStored = useRef(null);

    const handDragItem = (e  , itemcoords )=>{
      oldListStored.current = list;
      draggedItem.current = itemcoords;
      dragNode.current = e.target;
      setTimeout(()=> setDragging(true) , 0 );
      dragNode.current.addEventListener('dragend', handlStopDrag);
    }
    
    useEffect(() => {
      setList(props.taskStore)
    });

    const handlModalRespond = (response , taskId) => {
      setmodalState(response);
      if ( !response) {
        setList(oldListStored.current)
      } else {
        props.dispatch(moveTask(taskId));
        setmodalState(false);
      }
    }

    const getBoxStyles = ({boxIndex , itemIndex}) => {
        if (boxIndex === draggedItem.current.boxIndex && itemIndex === draggedItem.current.itemIndex ) {
          switch (boxIndex) {
            case 0:
              return 'is-dragged-group1 draggable-card ';
            case 1 :
              return 'is-dragged-group2 draggable-card ';
            case 2 :
              return 'is-dragged-group3 draggable-card';     
          }
        }
        return 'draggable-card';
    }

    const getGroupStyles = (boxIndex , boxGroup) => {
      if (boxIndex === draggedBox.current + 1 ) 
        return !(boxIndex && draggedBox.current) ? `group-two turn-on-grp-2` : `group-three turn-on-grp-3`;
      else 
        return `group-${boxGroup}`;
    }

    const handlStopDrag = () => {
      setDragging(false);
      dragNode.current.removeEventListener('dragend', handlStopDrag);
      draggedItem.current = null;
      dragNode.current = null;
      draggedBox.current = null;
    }
    
    const handlTargetItem = (e, {boxIndex , itemIndex}, itemId ) => {
      let currentItem = draggedItem.current;
      if (dragNode.current !== e.target && currentItem.boxIndex !== boxIndex && currentItem.boxIndex === boxIndex - 1    ) {
        setmodalState(true);
        console.log('itemId = ',itemId)
        
        setList(oldList => {
          let newList = JSON.parse(JSON.stringify(oldList));
          newList[boxIndex].items.splice(itemIndex , 0 , newList[currentItem.boxIndex].items.splice(currentItem.itemIndex,1)[0]);
          draggedItem.current = {boxIndex , itemIndex};
          return newList;
        });
      }
  }

  return (
    <div>
      <div className='container'>
        {
          list.map((box , boxIndex) => { 
            return (
              <div key={box.title }
              onDragEnter = {dragging && ! box.items.length ? (e) => 
                handlTargetItem(e , {boxIndex , itemIndex : 0 } , box.items ) : null 
              } 
              className={dragging ? getGroupStyles(boxIndex , box.group) :`group-${box.group}`} >
                {
                  box.items.map((item , itemIndex) => {
                    return (
                      <div key={item.taskId} 
                      onDragStart={(e) =>{
                        draggedBox.current = boxIndex;
                        handDragItem(e,{boxIndex , itemIndex})}}
                        draggable className={dragging ? getBoxStyles({boxIndex , itemIndex}) : 'draggable-card'} 
                        onDragEnter={dragging ? (e) => {
                        handlTargetItem(e , {boxIndex , itemIndex} , item.taskId );
                        console.log('second call', item.taskId)
                      }
                      : null } 
                      > 
                      <TaskListItem key={item.taskId}  {...item}  />
                      <ModalEffect show={modalState} onSubmit={ (response) => {
                      handlModalRespond(response , item.taskId)
                      } } />
                      </div>
                    )
                  })
                }
              </div>
            )
          })}   
      </div>
    </div>
  ) 
};

const mapStateToProps = (state) => ({
    taskStore : dataStructSelector(state.tasks , state.filter) 
});

export default connect(mapStateToProps)(TaskList);



// return (
    //     // props.tasks.map((task) => (
    //     //     <TaskListItem key={task.taskId}  {...task} />
    //     // )) 
    //     <div>
    //         <div className="container">
    //             <div className="group-one">

    //             </div>

    //             <div className="group-two">

    //             </div>

    //             <div className="group-three">

    //             </div>
    //         </div>
    //     </div>
        
    // )