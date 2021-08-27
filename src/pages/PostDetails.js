import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useStyles,Loading} from "../Styles";
import {
    useParams
} from "react-router-dom";

const axios = require('axios');

export default function PostDetails() {
    const classes = useStyles();
    const [list,setList]= useState(null);
let slug = useParams()
    console.log(slug)
    useEffect(()=>{

        axios.get(process.env.REACT_APP_SERVER+'/post/'+slug.id)
            .then(function (response) {
                // handle success
                if(response.status === 200){
                    setList(response.data)
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    },[slug.id])

    return (
        <React.Fragment>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Blog Details
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {!list ? <Loading/> : list.map((val,i) => (
                            <Grid item key={i} xs={12} sm={12} md={12}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {val.title}
                                        </Typography>
                                        <Typography>
                                            {val.content}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}
