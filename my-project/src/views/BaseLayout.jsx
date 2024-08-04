import { Outlet } from "react-router-dom"
import Nav from "../components/Navbar"


export default function BaseLayout() {
    return (
        <>
            <Nav/>
            <Outlet />
        </>
    )
}