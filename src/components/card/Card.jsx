import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import './card-style.css';
const Card = ({ item, index, onEdit, onDelete }) => {
    const [hover, setHover] = useState(false);
    console.log(item);
    
    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    const taskColor = (priority) => {
        if (priority === "Priority 1") {
            return '#ff0000'; // Red for Priority 1
        } else if (priority === "Priority 2") {
            return '#ff8000'; // Orange for Priority 2
        } else if (priority === "Priority 3") {
            return '#ffff00'; // Yellow for Priority 3
        } else if (priority === "Priority 4") {
            return '#00ff00'; // Green for Priority 4
        }
    };
    

    // console.log(item)
    return (
        <>
            {/* {hover && <div className="drag-handle">
                <DragIndicatorIcon />
            </div>} */}
       
        <div
            className="task-card"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}

        >
            
            <input
                type="checkbox"
                className="card-checkbox"
                aria-label={`Task ${index} completed`}
                onChange={() => onDelete(item.id)}
                style={{backgroundColor: taskColor(item.priority)}}

            />
            <div className="card-content">
                <div className="card-header">
                    <p className="card-head">{item.heading}</p>
                    <div className="icon-container">
                        {hover && (
                            <>
                                <EditIcon
                                    fontSize="medium"
                                    className="icon edit-icon"
                                    onClick={() => onEdit(item.id)}
                                />
                                <DeleteIcon
                                    fontSize="medium"
                                    className="icon delete-icon"
                                    onClick={() => onDelete(item.id)}
                                />
                            </>
                        )}
                    </div>
                </div>
                {item.description && (
                    <p className="card-description">{item.description}</p>
                )}
                <div className="card-footer">
                    {item.duedate && item.duedate !== "Due Date" && (
                        <p className="footer-item">
                            <CalendarTodayIcon fontSize="small" />
                            {formatDate(new Date(item.duedate))}
                            {/* {item.duedate} */}
                        </p>
                    )}
                    {item.priority && <p className="footer-item">{item.priority}</p>}
                    {item.project && <p className="footer-item">{item.project}</p>}
                </div>
            </div>
        </div>
        </>
    );
};

Card.propTypes = {
    item: PropTypes.shape({
        heading: PropTypes.string.isRequired,
        description: PropTypes.string,
        dueDate: PropTypes.string,
        priority: PropTypes.string,
        project: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

Card.defaultProps = {
    onEdit: () => {},
    onDelete: () => {},
};

export default Card;
