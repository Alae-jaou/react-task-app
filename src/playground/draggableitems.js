import React , {useState , useRef } from 'react';
import ModalExample from './ModalExample';


const DraggableStruct = ({data}) => { 

    const [list, setList] = useState(data);
    const draggedItem = useRef(null);
    const dragNode = useRef(null);
    const [dragging , setDragging] = useState(false);
    const [modalState , setmodalState] = useState(false);
    const oldListStored = useRef(null);

    const handDragItem = (e  , itemcoords)=>{
        oldListStored.current = list;
        draggedItem.current = itemcoords;
        dragNode.current = e.target;
        setTimeout(()=> setDragging(true) , 0 );
        dragNode.current.addEventListener('dragend', handlStopDrag);
    }

    const handlModalRespond = (response) => {
      setmodalState(response);
      if ( !response) {
        setList(oldListStored.current)
      }
    }

    const getStyles = ({boxIndex , itemIndex}) => {
        //console.log({boxIndex , itemIndex})
        if (boxIndex === draggedItem.current.boxIndex && itemIndex === draggedItem.current.itemIndex ) {
          switch (boxIndex) {
            case 0:
              return 'is-dragged-group1 draggable-card';
            case 1 :
              return 'is-dragged-group2 draggable-card';
            case 2 :
              return 'is-dragged-group3 draggable-card';     
          }
        }
        return 'draggable-card';
    }

    const handlStopDrag = () => {
      console.log('stop dragging ');
      setDragging(false);
      dragNode.current.removeEventListener('dragend', handlStopDrag);
      draggedItem.current = null;
      dragNode.current = null;
    }
      
    const handlTargetItem = (e, {boxIndex , itemIndex} ) => {
      let currentItem = draggedItem.current;
      console.log(boxIndex , itemIndex  , modalState);
      
      if (dragNode.current !== e.target && currentItem.boxIndex !== boxIndex && currentItem.boxIndex < boxIndex ) {
        setmodalState(true);
        setList(oldList => {
          let newList = JSON.parse(JSON.stringify(oldList));
          newList[boxIndex].item.splice(itemIndex , 0 , newList[currentItem.boxIndex].item.splice(currentItem.itemIndex,1)[0]);
          draggedItem.current = {boxIndex , itemIndex};
          return newList;
        })
        
      }
  }

  return (
    <div>
      <div className='container'>
        {
          list.map((box , boxIndex) => {
            return (
              <div key={box.title}
              onDragEnter = {dragging && ! box.item.length ? (e) => 
                handlTargetItem(e , {boxIndex , itemIndex : 0 } ) : null
              }
              className={`group-${box.group}`} >
                {
                  box.item.map((item , itemIndex) => {
                    return (
                      <div key={item} 
                      onDragStart={(e) =>handDragItem(e,{boxIndex , itemIndex})}
                      draggable className={dragging ? getStyles({boxIndex , itemIndex}) : 'draggable-card'} 
                      onDragEnter={dragging ? (e) => {
                        handlTargetItem(e , {boxIndex , itemIndex});
                      }
                      : null } 
                      > 
                      {item} 
                      <ModalExample show={modalState} onSubmit={ (response) => {
                        handlModalRespond(response)
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
}

export default DraggableStruct;


      
      // <div className="container">
        

      //   <div className="group-one">
      //     <div className="draggable-card" >
      //       Hello from here
      //     </div>
      //     <div className="draggable-card" >
      //       Hello from here
      //     </div>
      //   </div>

      //   <div className="group-two">
      //     <div className="draggable-card" >
      //       Hello from second group
      //     </div>
      //   </div>
        
      //   <div className="group-three">
      //     <div className="draggable-card" >
      //       Hello from the third group
      //     </div>
      //   </div>

      // </div>