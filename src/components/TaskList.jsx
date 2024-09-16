import React, { useState } from "react";
import Card from "./card/Card";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


export default function TaskList({ tasks, onReorder, onDelete, onEdit }) {
    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const reorderedTasks = Array.from(tasks);
        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);

        onReorder(reorderedTasks);
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
                {(provided) => (
                    <ul ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks && tasks.map((task, index) => (
                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} >
                                        <Card item={task} index={index} onDelete={onDelete} onEdit={onEdit} />
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
}