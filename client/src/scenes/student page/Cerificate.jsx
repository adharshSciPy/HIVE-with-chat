import * as React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { setSilver, setGold, setDaimond, unSetSilver, unSetGold, unSetDaimond } from '../../store/auth';
import { useDispatch } from "react-redux";

function Cerificate() {
    const [certificates, setCertificates] = React.useState([])
    const userID = useSelector((state) => state.auth.user);
    React.useEffect(() => {
        axios.get(`http://localhost:5000/student/getAllCertificates/${userID}`)
            .then((res) => {
                console.log(res.data.certificates)
                setCertificates(res.data.certificates)
                console.log(certificates)
            })
    }, [])

    // const dispatch = useDispatch();
    // function levelSetter() {
    //     if (certificates?.length >= 8) {
    //         dispatch(setDaimond());
    //         dispatch(unSetSilver());
    //         dispatch(unSetGold());
    //         console.log('1')
    //     }
    //     else if (certificates?.length >= 4 && certificates?.length < 8)  {
    //         dispatch(setGold());
    //         dispatch(unSetDaimond());
    //         dispatch(unSetSilver());
    //         console.log('2')
    //     }
    //     else if (certificates?.length >= 0 && certificates?.length < 4) {
    //         dispatch(setSilver());
    //         dispatch(unSetDaimond());
    //         dispatch(unSetGold());
    //         console.log('3')
    //     }
    //     else {
    //         console.log('failed to level up')
    //     }
    // }

    // React.useEffect(() => {
    //     levelSetter()
    // }, [])



    return (
        <Container maxWidth="lg">
            <Typography variant="h5" color="initial">My Certificates</Typography>
            <Grid container spacing={4}>
                {
                    certificates?.map((item, val) => {
                        return (
                            <Grid item key={val} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >

                                    {/* <CardMedia
                                        sx={{
                                            height: "10rem",
                                        }}
                                        component="img"
                                        // image={`http://localhost:5000/${item.imageName.filePath}`}
                                        image={`http://localhost:5000/${item.imageName.filePath}`}
                                        alt={item.imageName.fileName}
                                    /> */}
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.title}
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Download</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>

            {
                certificates?.length === 0 && (
                    <Box sx={{ height: '60vh', width: '95vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >There are no new posts available for you to view</Box>
                )
            }
        </Container>
    )
}

export default Cerificate