import React, {useContext, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import {useStyles} from "../Styles";
import UserContext from "../store/Context";
import {useHistory} from "react-router-dom";

var jwt = require('jsonwebtoken');
const axios = require('axios');


export default function Login() {
    let history = useHistory();
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [alertBox, setAlertBox] = useState(null)

    function handleSubmit(event) {
        event.preventDefault();
        setAlertBox(null)
        axios.post(process.env.REACT_APP_SERVER + '/login', {username: user, password: pass})
            .then(function (response) {
                if (!response.data.token) {
                    setAlertBox({status: 'error', msg: 'Invalid Username/Password'})
                }
                localStorage.setItem('jwt', response.data.token)
                return history.push("/addPosts")
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }


    const classes = useStyles();

    function jtoken() {
        jwt.verify(localStorage.getItem('jwt'), process.env.REACT_APP_ACCESS_TOKEN, function (err, decoded) {
            if (err) {
                console.log('Invalid Token');
                setLogin(false)
            }
            if (decoded) {
                console.log(decoded)
                setLogin(true)
            }
        });
    }
    useEffect(() => {
        jtoken()
    }, [])
    //  console.log({'validation':validation})
    const {isLogin, setLogin} = useContext(UserContext);
    // console.log(isLogin)
    if (isLogin) {
        history.push("/addPosts")
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {alertBox ? <Alert severity={alertBox.status}>{alertBox.msg}</Alert> : null}
                <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="user"
                        label="Username"
                        name="user"
                        autoComplete="user"
                        placeholder={'Enter your username'}
                        autoFocus
                        onInput={e => setUser(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="pass"
                        label="Password"
                        type="password"
                        id="pass"
                        autoComplete="current-password"
                        placeholder={'Enter your password'}
                        onInput={(e) => setPass(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>

                </form>
            </div>
        </Container>
    );
}
