import { NavLink } from "react-router-dom"

export const Navlinks = ({link, icon, linkName}) => {

    const activeStyle = {
        color: "#007aff",
    }

    return (
        <NavLink to={link} activeStyle={activeStyle} className="flex items-center py-2 px-4 hover:bg-gray-50 hover:text-blue transition duration-250 ease" end>
            <i className={`bx bx-${icon} text-xl`}></i>
            <span className="hidden md:block text-base ml-4">{linkName}</span>
        </NavLink>
    )
}