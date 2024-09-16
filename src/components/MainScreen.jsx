import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from './SideBar';
import { createContext } from "react";
import MenuAppBar from "./Appbar";
import '../App.css'
import { ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import Loader from "./Loading";
import Error from "./Error";


const projectContext = createContext();

axios.defaults.withCredentials = true; // This ensures cookies are sent with requests
const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884'
      }}});
export default function MainScreen() {
    const [dataLoaded, setDataLoaded] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);
    const [projectLoading, setProjectLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const addProject= (project)=> setProjects((prev)=>{ if(prev)
      return [...prev, {id : prev.length , name : project} ]
    else return [{id : 0 , name : project}];});
    // Fetch user data
    useEffect(() => {
        const loadData = async () => {
            try {
                const uid = localStorage.getItem("uid");
                if (!uid) {
                     throw new Error("User ID not found in local storage");
                }
                const result = await axios.get(`/api/getdata?userId=${uid}`);
                // if(result.status === 200) {
                    setDataLoaded(result.data.taskdata);
                

            } catch (error) {
                if (error.response && error.response.status === 400) {
                    navigate("/auth/login");
                } else {
                    console.error("Error loading data:", error);
                    setError("Failed to load data. Please try again.");
                }
            } finally {
                setDataLoading(false);
            }
        };

        loadData();
    }, [navigate ]);

    // Fetch projects data
    useEffect(() => {
        const getProjects = async () => {
            try {
                const uid = localStorage.getItem("uid");
                const result = await axios.get(`/api/getProjects?userId=${uid}`);
                setProjects(result.data.projects);
            } catch (err) {
                console.error("Error during getting projects:", err);
                setError("Failed to load projects. Please try again.");
            } finally {
                setProjectLoading(false);
            }
        };

        getProjects();
    }, []);

   console.log("Main"+dataLoaded , projects)
    return (
        <>
            {dataLoading && projectLoading ? (
                <Loader/>
            ) : error ? (
                <Error/>
            ) : (
            <ThemeProvider theme ={theme}>
              <projectContext.Provider value={{projects , addProject}}>
                 <MenuAppBar onOpen={setOpen} />
                <SideBar onOpen={setOpen} open={open} data={dataLoaded}  />
             </projectContext.Provider>
             </ThemeProvider>
            )}
        </>
    );
}

export {projectContext};