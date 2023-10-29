
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Timeline from "../components/Timeline/Timeline";
import { UserDto } from "../config/services/user.service";



function Home() {
  const navigate = useNavigate();
  const [userLogado, setUserLogado] = useState<UserDto>();
  

  useEffect(() => {

    async function me() {
      const res = await listMe();

      setUserLogado(res.data);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    me()
  });

  return (
    <>
    <Sidebar/>
    <Timeline/>
    
    </>
  );
}

export default Home;
