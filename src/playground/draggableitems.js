import React, { useState ,useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  { id: "id_item_1", taskDescription : 'Alae' , taskState : 0 },
  { id: "id_item_2", taskDescription : 'Alae' , taskState : 0 },
  { id: "id_item_3", taskDescription : 'Alae' , taskState : 0 },
  { id: "id_item_4", taskDescription : 'Alae' , taskState : 0 },
  { id: "id_item_5", taskDescription : 'Alae' , taskState : 0 }
];

const columnsFromBackendTwo = {
  ["0"]: {
    name: "Requested",
    items: []
  },
  ["1"]: {
    name: "To do",
    items: []
  },
  ["2"]: {
    name: "In Progress",
    items: []
  },
  ["3"]: {
    name: "Done",
    items: []
  }
};

const initState = ( columnsFromBackendTwo , itemsFromBackend) => {
  itemsFromBackend.forEach((item) => {
    columnsFromBackendTwo[item.taskState.toString()].items.push(item)
  })
  return columnsFromBackendTwo
}


const columnsFromBackend = {
  ["0"]: {
    name: "Requested",
    items: itemsFromBackend
  },
  ["1"]: {
    name: "To do",
    items: []
  },
  ["2"]: {
    name: "In Progress",
    items: []
  },
  ["3"]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

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

function Draggableitems() {
  const [columns, setColumns] = useState(columnsFromBackend);
  

  useEffect(() => {
    const data = [];
    Object.entries(columns).forEach(([id , column]) => {
      column.items.forEach((item) => {
        data.push({...item , taskState : parseInt(id)})
      })
    })
    console.log(data)
  } , [columns])


  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
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
                              key={item.id}
                              draggableId={item.id}
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
                                    {item.taskDescription}
                                    
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
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

export default Draggableitems;
