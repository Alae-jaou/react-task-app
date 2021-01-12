import React, { useState ,useEffect , useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {connect} from 'react-redux';
import TaskListItem from './TaskListItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import initState from '../selectors/dataStructSelector';
import {setTask} from '../actions/taskActions'

const onDragEnd = (result, columns, setColumns , setOldColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  setOldColumns(columns);

  // If we drop in differente columns
  if (source.droppableId !== destination.droppableId) {
    // get witch column we had the dragging action
    const sourceColumn = columns[source.droppableId];
    // get witch column we had the dropping action
    const destColumn = columns[destination.droppableId];
    // getting all items of the dragged column 
    const sourceItems = [...sourceColumn.items];
    // getting all items of the dropped column
    const destItems = [...destColumn.items];
    
  
    // splice( L'indice à partir duquel commencer à changer le tableau ,
    //         Un entier indiquant le nombre d'anciens éléments à remplacer,
    //         Les éléments à ajouter au tableau )
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
   
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }  
};

const TaskList = (props) => {
  const [columns, setColumns] = useState(props.taskStore);
  const [oldColumns , setOldColumns] = useState({});
  const currentDragedItem = useRef(null);
  const count = useRef(0);
  // Track changes in case of filtering
  useEffect(() => {
    setColumns(props.taskStore)
  },[props.taskStore])

  useEffect(() => {
    const data = []; 
    Object.entries(columns).forEach(([id , column]) => {
      column.items.forEach((item) => {
        data.push({...item , taskState : parseInt(id)})
      })
    })
    
    if (JSON.stringify(columns) !== JSON.stringify(oldColumns) ) {
      Object.entries(columns).forEach(([index,itemCol]) =>  {
        itemCol.items.forEach((item) => {
          if(item.taskId === currentDragedItem.current  ) {
            props.dispatch(setTask(currentDragedItem.current , index))
          } 
        })
      })
      // currentDragedItem.current = null;
    }
  } , [count.current])

  const handDragStart = (e) => {    
    currentDragedItem.current = e.draggableId ;
    count.current+=1
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragStart = {(e)=> handDragStart(e) }
        onDragEnd={result => onDragEnd(result, columns, setColumns , setOldColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.taskId}
                              draggableId={item.taskId}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                  <TaskListItem 
                                  taskId = {item.taskId}
                                  taskName={item.taskName} 
                                  taskDescription={item.taskDescription} 
                                  
                                  />

                                  </div>
                                );
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );

}

const mapStateToProps = (state) => ({
  taskStore : initState(state.tasks , state.filter)
});

export default connect(mapStateToProps)(TaskList)

