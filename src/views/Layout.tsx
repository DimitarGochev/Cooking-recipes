import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

interface LayoutProps {
}

export const Layout = (props: LayoutProps) => {
    return (
        <div>
            <h1>Cooking Recipes App</h1>
            <nav>
                <NavLink className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} to="/home">Home</NavLink> | &nbsp;
                <NavLink className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} to="/users">Users</NavLink> | &nbsp;
                <NavLink className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} to="/recipes">Recipes</NavLink> | &nbsp;
            </nav>
            <Outlet />
        </div>
    );
};