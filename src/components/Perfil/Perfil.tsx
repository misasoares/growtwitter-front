import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDto, listMe } from "../../config/services/user.service";
import Sidebar from "../Sidebar/Sidebar";

interface PerfilProps{
    userLogado?: UserDto
    loading?: boolean
}

function Perfil(props:PerfilProps){
    const navigate = useNavigate();
    const [userLogado, setUserLogado] = useState<UserDto>();
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      setUserLogado(props.userLogado)



    }, [navigate]);
  
    return (
      <>
        <h1>perfil</h1>
        
      </>
    );
}
export default Perfil