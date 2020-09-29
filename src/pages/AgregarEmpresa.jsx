import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import FormEmpresas from "../components/FormEmpresa";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useModal } from "../Context/modal-context";
function AgregarEmpresa() {
  const history = useHistory();
  const { setLoading } = useModal();
  const [error, setError] = useState(false);
  const handleAgregarEmpresa = async (empresa) => {
    setLoading(true);
    if (empresa.nombre === "" || empresa.codigo === "") {
      setError(true);
      setLoading(false);
      return;
    }
    try {
      await Axios.post("/empresa", empresa);
      history.goBack();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <Typography align="center" variant="h4" component="h1" gutterBottom>
        Agrega a tu empresa o cliente
      </Typography>
      <FormEmpresas error={error} handle={handleAgregarEmpresa} />
    </Container>
  );
}

export default AgregarEmpresa;
