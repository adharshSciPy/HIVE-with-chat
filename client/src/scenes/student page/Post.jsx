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

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Posts() {
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
      <h2 style={{ textAlign: "center" }}>Posts</h2>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
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