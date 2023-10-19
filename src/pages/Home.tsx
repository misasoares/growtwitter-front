
import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Timeline from "../components/Timeline/Timeline";



function Home() {
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <>
    <Sidebar/>
    <Timeline/>
    
    </>
  );
}

export default Home;
