import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Toolbar,
  Button,
  AppBar,
  Grid,
} from "@material-ui/core";
import { useUser } from "../Context/user-context";
import Axios from "axios";
import CardRevision from "../components/CardRevision";
function Cliente() {
  const { logOut, user } = useUser();
  const [Revisiones, setRevisiones] = useState([]);

  useEffect(() => {
    async function initial() {
      const { data } = await Axios.get(`/empresaContacto/usuario/${user}`);
      const final = await Axios.get(`/revision?empresa=${data.empresa._id}`);
      return final.data;
    }
    initial().then((revisiones) => {
      console.log(revisiones);
      setRevisiones(revisiones);
    });
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify={"space-between"}>
            <Grid item>
              <Typography variant="h6" /* className={classes.title} */>
                Tu historial
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={() => logOut()} color="inherit">
                Salir
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={5}>
          {Revisiones.length > 0 ? (
            <>
              {Revisiones.map((revision) => (
                <Grid item md={4}>
                  <CardRevision revision={revision} />
                </Grid>
              ))}
            </>
          ) : (
            <Grid container justify="center" style={{ marginTop: 20 }}>
              <Grid item>
                <Typography variant="h4" align="center">
                  No hay ninguna revision
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Cliente;
