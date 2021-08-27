import React, {useContext, useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useStyles} from "../Styles";
import UserContext from "../store/Context";
import {useHistory} from "react-router-dom";

var jwt = require('jsonwebtoken');

function Password(props) {
    const axios = require('axios');
    let history = useHistory();
    const classes = useStyles();
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [alertBox, setAlertBox] = useState(null)

    function handleSubmit(event) {
        setAlertBox(null)
        event.preventDefault();
        console.log(oldPassword)
        console.log(newPassword)
        axios.post(process.env.REACT_APP_SERVER + '/password', {oldPassword: oldPassword, newPassword: newPassword,token:localStorage.getItem('jwt')})
            .then(function (response) {
                if (response.data==='updated') {
                    setOldPassword('')
                    setNewPassword('')
                    setAlertBox({status: 'success', msg: 'Password updated'})
                }else{
                    setAlertBox({status: 'error', msg: 'Password not updated /Error'})
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

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
    if (!isLogin) {
        history.push("/login")
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Change Password
                </Typography>
                {alertBox ? <Alert severity={alertBox.status}>{alertBox.msg}</Alert> : null}
                <form className={classes.form}  onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Old Password"
                        name="oldPassword"
                        autoComplete="oldPassword"
                        placeholder={'Enter old password'}
                        autoFocus
                        value={oldPassword}
                        onInput={e => setOldPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="newPassword"
                        label="New Password"
                        name="newPassword"
                        autoComplete="newPassword"
                        placeholder={'Enter new password'}
                        autoFocus
                        value={newPassword}
                        onInput={e => setNewPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Update
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default Password;
