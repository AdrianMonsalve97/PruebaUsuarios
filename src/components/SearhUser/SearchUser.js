import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../ErrorMessage";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
    setError("");
  };

  const handleSearch = async () => {
    try {
      // Validaciones
      if (username.length < 4) {
        setError("El nombre de usuario debe tener al menos 4 caracteres.");
        return;
      }
      if (username.toLowerCase() === "doublevpartners") {
        setError("No se permite la búsqueda de 'doublevpartners'.");
        return;
      }

      // Realizar la búsqueda en la API de GitHub
      const response = await axios.get(
        `https://api.github.com/search/users?q=${username}`
      );

      // Procesar la respuesta y mostrar los resultados
      const users = response.data.items.slice(0, 10);
      setUsers(users);
    } catch (error) {
      setError("Hubo un error al realizar la búsqueda.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Buscar Usuarios de GitHub
      </Typography>
      <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Ingrese el nombre de usuario"
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </div>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}

      {users.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Resultados de la búsqueda:</Typography>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <Link to={`/user/${user.login}`}>{user.login}</Link>
              </li>
            ))}
          </ul>
          <Button variant="contained" component={Link} to="/followers-chart" sx={{ mt: 2 }}>
            Ver Gráfica de Seguidores
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default SearchUser;
