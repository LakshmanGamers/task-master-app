import react from 'react';
import styles from './Boards.module.css';
export default function KanbanBoard(){
    return (
        <div >
            <div className={styles.taskscontainer}>
                <div className='task-col'>
                    <h3>To Do</h3>
                    <ul>
                        <li>Task 1</li>
                        <li>Task 2</li>
                        <li>Task 3</li>
                    </ul>
                </div>
                <div className='task-col'>  
                <h3>To Do</h3>
                    <ul>
                        <li>Task 1</li>
                        <li>Task 2</li>
                        <li>Task 3</li>
                    </ul>
                
                 </div>
                <div className='task-col'>
                <h3>To Do</h3>
                    <ul>
                        <li>Task 1</li>
                        <li>Task 2</li>
                        <li>Task 3</li>
                    </ul>
                     </div>

            </div>
        </div>
    )
}