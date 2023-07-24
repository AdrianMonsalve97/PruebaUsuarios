import React, { useState } from "react";
import { Button, Card, CardContent, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
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
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Buscar Usuario de GitHub
          </Typography>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "10px" }} />
            <input
              type="text"
              value={username}
              onChange={handleChange}
              placeholder="Ingrese el nombre de usuario"
              style={{ padding: "5px", marginRight: "10px" }}
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
            <div>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Resultados de la búsqueda:
              </Typography>
              <ul>
                {users.map((user) => (
                  <li key={user.id}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: "5px" }} />
                    <Link to={`/user/${user.login}`}>{user.login}</Link>
                  </li>
                ))}
              </ul>

              <Link to="/followers-chart" style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Ver Gráfico de Seguidores
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default SearchUser;
