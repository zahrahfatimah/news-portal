import { Outlet } from "react-router-dom"
import Nav from "../component/Nav"



export default function BaseLayout() {
    return (
        <>
            <Nav/>
            <Outlet />
        </>
    )
}