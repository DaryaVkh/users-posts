import React, {FC} from 'react';
import {AppBar, Container, Tab, Tabs, Toolbar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const PageHeader: FC = () => {
    return (
        <AppBar sx={{ backgroundColor: '#121212' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to='/'
                        sx={{ mr: 4, display: { xs: 'none', md: 'flex' }, cursor: 'pointer', textDecoration: 'none', color: 'white', fontWeight: 'bold' }}
                    >
                        MAIN
                    </Typography>

                    <Tabs value={window.location.pathname !== '/' ? window.location.pathname : false} textColor="inherit" TabIndicatorProps={{ style: { display: "none" } }} >
                        <Tab label="Users" value="/user-list" component={Link} to='/user-list' sx={{ color: 'white', opacity: window.location.pathname === '/user-list' ? '1' : '0.5' }} />
                        <Tab label="Posts" value="/post-list" component={Link} to='/post-list' sx={{ color: 'white', opacity: window.location.pathname === '/post-list' ? '1' : '0.5' }} />
                    </Tabs>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default PageHeader;