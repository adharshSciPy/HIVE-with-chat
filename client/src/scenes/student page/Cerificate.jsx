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



    // download pdf
    const handleDownload = async (fileName) => {
        try {
            const response = await axios.get(`http://localhost:5000/public/downloadPdf/${fileName}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            window.open(url, '_blank');
        } catch (err) {
            console.log(err);
        }
    };



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

                                    <CardMedia
                                        sx={{
                                            height: "5rem",
                                            width: '5rem'
                                        }}
                                        component="img"

                                        image={`https://www.computerhope.com/jargon/p/pdf.png`}

                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.title}
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant='outlined' onClick={() => handleDownload(item.certificate.fileName)}>Download</Button>
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