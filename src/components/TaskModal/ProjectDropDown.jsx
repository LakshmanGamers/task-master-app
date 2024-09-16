import React, { useContext } from "react";
import { projectContext } from "../MainScreen";

export default function ProjectDropdown(props) {
    const {projects} = useContext(projectContext);
    return (
        <>
            <select
                name='project'
                value={props.value}
                onChange={props.onChange}
            >
                {projects.map((project) => (
                    <option key={project.id} value={project.name}>
                        {project.name}
                    </option>
                ))}
               
            </select>
        </>
    )
}