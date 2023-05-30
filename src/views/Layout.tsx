import { AppBar, Box, Container, Typography } from '@mui/material';
import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../widgets/AppBar';

interface LayoutProps {
}

export const Layout = (props: LayoutProps) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            placeContent: 'center',
            alignItems: 'center'
        }}>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Outlet />
            <Box component={'footer'} sx={{
                height: '64px',
                width: '100%',
                backgroundColor: '#1976d2'
            }}></Box>
        </Box>
    );
};