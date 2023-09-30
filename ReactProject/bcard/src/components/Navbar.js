import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import Searchbar from './SearchBar';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import { GeneralContext } from '../App';
import { RoleTypes, checkPermissions, pages, settings } from '../Config';
import ToggleTheme from './ToggleTheme';

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, roleType, setUser, setRoleType, setIsLoading, snackbar, isDark } = useContext(GeneralContext);
  const navigate = useNavigate();
  const path = useResolvedPath().pathname;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout = () => {
    setIsLoading(true);
    fetch(`https://api.shipap.co.il/clients/logout`, {
      credentials: 'include',
    })
      .then(() => {
        setUser();
        setRoleType(RoleTypes.none);
        navigate('/')
        snackbar('User Disconnected')
      })
      .catch(() => {
        navigate('/error');
      })
      .finally(() => {
        setIsLoading(false);
      });
    handleCloseUserMenu();
  }

  return (
    <AppBar position="static">
      <Container maxWidth="100%" sx={{ backgroundColor: isDark ? '#121010' : '#000000bd' }}>
        <Toolbar disableGutters>
          {/* logo text */}
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', sm: 'none', lg: 'flex' },
                fontFamily: 'Oswald, sans-serif',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                padding: '10px',
              }}
            >
              Cardify+
            </Typography>
          </Link>
          {/* hamburger */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex', lg: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'block', lg: 'none' },
              }}
            >
              {pages.filter(p => !p.permissions || checkPermissions(p.permissions, roleType)).map((page) => (
                <Link to={page.route} key={page.route} style={{ textDecoration: 'none', color: 'initial' }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          {/* logo icon here*/}
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'none' },
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 700,
              fontSize: "30px",
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          > {/* and media screen logo name */}
            Cardify+
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
            {pages.filter(p => !p.permissions || checkPermissions(p.permissions, roleType)).map((page) => (
              <Link to={page.route} key={page.route} style={{ textDecoration: 'none', color: 'initial' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  variant={page.route === path ? 'contained' : ''}
                  sx={{ my: 2, color: 'white', display: 'block', margin: "8px", fontFamily: "Oswald, sans-serif", fontSize: "16px", backgroundColor: page.route === path ? '#0e22d8' : '' }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
          <ToggleTheme />
          <Searchbar />
          {
            user &&
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='U' src="\images\img-dark.png" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(setting => {
                  return (
                    setting.permissions.includes(roleType) && <Link to={setting.route} key={setting.route} style={{ textDecoration: 'none', color: 'initial' }} >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting.title}</Typography>
                      </MenuItem>
                    </Link>
                  )
                })}
                <Link to={'/'} onClick={logout} style={{ textDecoration: 'none', color: 'initial' }} >
                  <MenuItem >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}