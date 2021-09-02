import React, {useContext, useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useStyles} from "../Styles";
import {UserContext} from "../store/Context";


function AddPosts(props) {
    const axios = require('axios');
    const classes = useStyles();
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [alertBox, setAlertBox] = useState(null)
    const {isLogin,setLogin} = useContext(UserContext)

    useEffect(()=>{
        console.log(isLogin)
    },[isLogin])
    function handleSubmit(event) {
        setAlertBox(null)
        event.preventDefault();
        axios.post(process.env.REACT_APP_SERVER + '/post', {title: title, content: content,token:localStorage.getItem('jwt')})
            .then(function (response) {
                if (response.data.id) {
                    setContent('')
                    setTitle('')
                    setAlertBox({status: 'success', msg: response.data.id+': unique id of the post created'})
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>

            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Add Post
                </Typography>
                {alertBox ? <Alert severity={alertBox.status}>{alertBox.msg}</Alert> : null}
                <form className={classes.form}  onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        placeholder={'Enter title'}
                        autoFocus
                        value={title}
                        onInput={e => setTitle(e.target.value)}
                    />
                    <TextareaAutosize  variant="outlined"
                                       required
                                       id="content"
                                       name="content"
                                       placeholder={'Enter content'}
                                       autoFocus
                                       style={{width:'100%'}}
                                       minRows={10}
                                       value={content}
                                       onInput={e => setContent(e.target.value)}/>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Add Post
                    </Button>

                </form>
            </div>
        </Container>
    );
}

export default AddPosts;
