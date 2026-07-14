
import AdminNavbar from "./Admin Side/pages/AdminNavbar";
import Navebar from "./Navebar";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const  NavbarUserAndAdmin= () => {
  
          const {role}= useContext(AppContext)

               
  return (
    <>
   
           {role==="admin" ? <AdminNavbar /> : <Navebar />}
    </>
  );
};

export default NavbarUserAndAdmin;
