import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";

export default () => {

    return <>
        <Navbar />
        <Outlet/>  
    </>
}