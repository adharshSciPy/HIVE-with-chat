import React from 'react'
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

function StudentPage() {
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
          <Typography variant="body1" color="secondary" sx={{ mb: 3, fontWeight: 500 }}>Latest Posts</Typography>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards?.map((item, val) => {
              return (
                <Grid item key={val} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                    }}
                  >

                    <CardMedia
                      sx={{
                        height: "10rem",
                      }}
                      component="img"
                      image={`http://localhost:5000${item.imageName}`}
                      // image={`http://localhost:5000/server/uploads/2023-05-05T11-32-06.481Z-batch.png`}
                      alt={`http://localhost:5000${item.imageName}`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                      </Typography>

                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleApply(item._id)}>Apply</Button>
                    </CardActions>
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
    </>
  )
}

export default StudentPage