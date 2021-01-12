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
  const [dragging , setDragging] = useState(false);
  const [modalState , setmodalState] = useState(false);
  const draggedBox = useRef(null);
  const oldListStored = useRef(null);

  const handDragItem = (e  , itemcoords , id)=>{
      oldListStored.current = list;
      draggedItem.current = itemcoords;
      dragNode.current = e.target;
      setTimeout(()=> setDragging(true) , 0 );
      dragNode.current.addEventListener('dragend', ()=>handlStopDrag(id));
      
      
  }

  const handlStopDrag = (id) => {
    if (dragNode.current) {
      setDragging(false);
      dragNode.current.removeEventListener('dragend', handlStopDrag);
      if( draggedItem.current.boxIndex !== draggedBox.current ) {
        props.dispatch(moveTask(id));
      }
      draggedItem.current = null;
      dragNode.current = null;
      draggedBox.current = null;
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


 
    
  const handlTargetItem = (e, {boxIndex , itemIndex} , taskId ) => {
    let currentItem = draggedItem.current;

    if (dragNode.current !== e.target && currentItem.boxIndex !== boxIndex && currentItem.boxIndex < boxIndex ) {
      //setmodalState(true);
      setList(oldListStored.current)
      setList(oldList => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[boxIndex].items.splice(itemIndex , 0 , newList[currentItem.boxIndex].items.splice(currentItem.itemIndex,1)[0]);
        draggedItem.current = {boxIndex , itemIndex};
        return newList;
      })
      
    }
}

   useEffect(() => {
      setList(props.taskStore)
    });
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
                      handDragItem(e,{boxIndex , itemIndex} , item.taskId)}}
                      draggable className={dragging ? getBoxStyles({boxIndex , itemIndex}) : 'draggable-card'} 
                      onDragEnter={dragging ? (e) => {
                      handlTargetItem(e , {boxIndex , itemIndex});
                    }
                    : null } 
                    > 
                    <TaskListItem key={item.taskId}  {...item}   />
                    
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
}

const mapStateToProps = (state) => ({
  taskStore : dataStructSelector(state.tasks , state.filter)
});

export default connect()(TaskList);



