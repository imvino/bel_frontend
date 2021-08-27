import React,{useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import UserContext from "./store/Context";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import {useStyles} from "./Styles";
import AddPosts from "./pages/AddPosts";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useHistory} from "react-router-dom";
import Password from "./pages/Password";

function App(props) {

    const [isLogin,setLogin] = useState(true)
    const [anchorEl, setAnchorEl] = React.useState(null);
    let history = useHistory();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const Logout = ()=>{
        localStorage.clear()
        window.location.replace('/')
    }
    const classes = useStyles();
    return (
        <UserContext.Provider value={{isLogin,setLogin}}>
        <Router>
            <div>
                <div className={classes.root}>
                    {/*For navigation bar*/}
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                Blog
                            </Typography>
                            <Link variant="body2" className={classes.menuLink} href={'/'} >Home</Link>
                            <Link variant="body2" className={classes.menuLink}  href={'/addPosts'} >New Post</Link>
                            {!isLogin ?<Link variant="body2" className={classes.menuLink} href={'/login'}>Login</Link> :
                                <>
                                <Button style={{backgroundColor: '#fff'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                Admin
                                </Button>
                                <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                >
                                <MenuItem component={Link} href={'/password'}>Password</MenuItem>
                                <MenuItem onClick={Logout}>Logout</MenuItem>
                                </Menu>
                                </>
                            }
                        </Toolbar>
                    </AppBar>
                </div>
                {/*To switch between components*/}

                <Switch>
                    <Route path="/"  exact={true} component={Home}/>
                    <Route path="/login"  exact={true} component={Login}/>
                    <Route path="/post/:id" exact={true} component={PostDetails}/>
                    <Route path="/password" exact={true} render={props=>(
                        isLogin ?
                            <Password/>:<Redirect to={'/login'}/>
                    )}/>
                    <Route path="/addPosts" exact={true} render={props=>(
                        !isLogin ?
                        <Redirect to={'/login'}/> : <AddPosts/>
                    )}/>
                </Switch>

            </div>
        </Router>
        </UserContext.Provider>
    );
}

export default App;
