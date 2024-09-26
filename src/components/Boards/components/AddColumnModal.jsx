import React, { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function AddColumnModal({ onAdd, drag }) {
    const [title, setTitle] = useState('');
    const [on, setOn] = useState(false);

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleAddColumn = (e) => {
        e.preventDefault();
        if (!title) return;
        onAdd(title);
        setTitle('');
        setOn(false);
    }

    return (
        <div style={{ padding: "32px", position: "relative" }}>
            {
                !on && !drag &&
                <button style={{ border: "none", backgroundColor: "#fafafa", cursor: "pointer", fontSize: "14px" }} onClick={() => setOn(true)}>
                    <AddCircleIcon style={{ color: "#3f50b5", fontSize: "16px" }} /> Add Section
                </button>
            }

            {
                on && !drag &&
                <form>
                    <input
                        type="text"
                        placeholder="Section name"
                        onChange={handleChange}
                        style={{ borderRadius: "10px", paddingLeft: "10px", width: "250px", display: "inline-block", marginBottom: "10px" }}
                    />
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: "10px" }}>
                        <button
                         disabled={!title}
                            style={{
                                borderRadius: "5px",
                                backgroundColor: "#757ce8",
                                color: "white",
                                border: "none",
                                padding: "6px 10px", // Reduced padding for a smaller button
                                fontSize: "14px", // Adjust font size
                                cursor: "pointer",
                            }}
                            onClick={handleAddColumn}
                            type="submit"
                        >
                            Add Section
                        </button>
                        <button
                           
                            style={{
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                padding: "6px 10px", // Reduced padding for a smaller button
                                fontSize: "14px", // Adjust font size
                                cursor: "pointer",
                            }}
                            type="button" // Prevent form submission
                            onClick={() => setOn(!on)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            }
        </div>
    );
}
