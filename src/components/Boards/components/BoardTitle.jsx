import { Typography, TextField } from '@mui/material';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { TaskContext } from "../BoardsScreen";
import { BoardTitleContext } from '../../SideBar';
export default function BoardTitle({ BoardTitle, onTitleChange }) {
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState("");
    const { state, setState } = useContext(TaskContext);
    const inputRef = useRef(null);
    const  { setBoardItems , boardItems } = useContext(BoardTitleContext)
    useEffect(() => {
        setTitle(BoardTitle);
    }, [BoardTitle]);

    const handleBlur = () => {
        setEditing(false);
        setState((prevState) => ({
            ...prevState,
            name: title
        }));

        onTitleChange({
            ...state,
            name: title
        });
    };

    const handleClick = () => {
        setEditing(true);
        setTitle(state.name);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            inputRef.current.blur(); // Trigger blur when pressing Enter
        }
    };

    return (
        <>
            {!isEditing ? (
                <Typography
                    variant="h5"
                    style={{ fontWeight: 'bold', marginLeft: '20px', cursor: 'pointer' }}
                    onClick={handleClick}
                >
                    {state.name}
                </Typography>
            ) : (
                <TextField
                    inputRef={inputRef}
                    variant="outlined"
                    size="small"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    style={{ marginLeft: '20px', width: 'calc(100% - 40px)' }} // Adjust width based on margin
                />
            )}
        </>
    );
}
