import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Posts() {
  const navigate = useNavigate()
  const [cards, setCards] = React.useState([]);
  const userID = useSelector((state) => state.auth.user);
  function getAllPost() {
    axios.get(`http://localhost:5000/student/getAllPosts/${userID}`).then((res) => {
      setCards(res.data.posts);
      console.log(res.data.posts);
    });
  }
  React.useEffect(() => {
    getAllPost()
  }, []);

  const handleApply = (id) => {
    console.log(id)
    axios.post(`http://localhost:5000/student/applyPost/${id}/${userID}`)
      .then((res) => {
        console.log(res)
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        getAllPost()
      })
  }
  return (
    <>
      <main>
        <Container smaxWidth="md">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h5" color="secondary" sx={{ mb: 3, fontWeight: 500 }}>Posts</Typography>
            <Button variant="outlined" onClick={() => navigate('/student/post/appliedPost')}>Applied Post</Button>
          </Stack>

          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards?.map((item, val) => {
              return (
                <Grid item key={val} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "20rem",
                      maxWidth: '30rem',
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                    }}
                  >

                    <CardMedia
                      sx={{
                        height: "70%",
                        width: '100%'
                      }}
                      component="img"
                      image={`http://localhost:5000${item.imageName}`}
                      // image={`http://localhost:5000/server/uploads/2023-05-05T11-32-06.481Z-batch.png`}
                      alt={`http://localhost:5000${item.imageName}`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" color="secondary">
                          {item.title}
                        </Typography>
                        <Button size="small" onClick={() => handleApply(item._id)} variant="contained">Apply</Button>
                      </Stack>

                      <Typography variant="body2" color="secondary">
                        {item.postType}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {moment(item.date).format('MM-DD-YYYY')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
            {
              cards.length === 0 && (
                <Box sx={{ height: '60vh', width: '95vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >There are no new posts available for you to view</Box>
              )
            }
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      {/* <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box> */}
    </>
  );
}