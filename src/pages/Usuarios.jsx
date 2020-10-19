import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  DialogActions,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Axios from "axios";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import {
  SuccessButton,
  WarningButton,
  ErrorButton,
} from "../components/Buttons";
import { useModal } from "../Context/modal-context";
import { useUser } from "../Context/user-context";
function Usuarios() {
  const { logOut } = useUser();
  const { setLoading } = useModal();
  const [openModal, setopenModal] = useState(false);
  const [user, setUser] = useState({});
  const [users, setusers] = useState([]);

  useEffect(() => {
    async function initUsuarios() {
      const data = await Axios.get(
        "/usuarios?tipo_usuario=Gerente&tipo_usuario=Supervisor&tipo_usuario=Tecnico&isTrabajando=true"
      );
      const usuarios = data.data;
      return usuarios;
    }
    setLoading(true);
    initUsuarios()
      .then((usuarios) => {
        setusers(usuarios);
      })
      .catch(() => {
        logOut();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setLoading, logOut]);

  const handleDelete = async (e) => {
    e.preventDefault();
    user.isTrabajando = false;
    await Axios.patch(`/usuarios/${user._id}`,user);
    const newUsers = users.filter((usr) => usr._id !== user._id);
    setusers(newUsers);
    setopenModal(false);
    setUser("");
  };

  return (
    <>
      <Typography align="center" variant="h4" component="h1" gutterBottom>
        Lista de Trabajadores
      </Typography>
      <Box textAlign="end">
        <Link to="/usuarios/agregar">
          <SuccessButton
            variant="contained"
            color="secondary"
            startIcon={<Add />}
          >
            Agregar Trabajador
          </SuccessButton>
        </Link>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Tipo Usuario</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.nombre}</TableCell>
                <TableCell>{user.apellido}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.telefono}</TableCell>
                <TableCell>{user.tipo_usuario}</TableCell>
                <TableCell>
                  <ErrorButton
                    onClick={() => {
                      setopenModal(true);
                      setUser(user);
                    }}
                    fullWidth
                  >
                    Eliminar
                  </ErrorButton>
                  <Link to={`/usuarios/editar/${user._id}`}>
                    <WarningButton fullWidth>Editar</WarningButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal abierto={openModal} titulo="¿Seguro que desea Eliminar?">
        <DialogActions>
          <ErrorButton onClick={() => setopenModal(false)}>
            Cancelar
          </ErrorButton>
          <SuccessButton onClick={handleDelete}>Aceptar</SuccessButton>
        </DialogActions>
      </Modal>
    </>
  );
}

export default Usuarios;
