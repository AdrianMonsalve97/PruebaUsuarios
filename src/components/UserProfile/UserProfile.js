import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
  Grid,
  Stack,
  IconButton,
  Divider,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { GitHub, Email, Twitter, PeopleAlt } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorMessage from "../ErrorMessage";

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setUserData(response.data);
      } catch (error) {
        setError("Error al obtener los datos del usuario.");
      }
    };

    fetchUserData();
  }, [username]);

  const handleExportUserData = async () => {
    try {
      // Envía la información del usuario al backend
      const response = await axios.post("http://localhost:3001/api/users", {
        username: userData.login,
        followers: userData.followers,
      });

      // Verifica si la solicitud fue exitosa
      if (response.status === 201) {
        alert("Usuario exportado exitosamente.");
      } else {
        alert("Error al exportar el usuario.");
      }
    } catch (error) {
      console.error("Error al exportar el usuario:", error);
      alert("Error al exportar el usuario.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <IconButton sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
        {userData ? (
          <>
            <Avatar
              src={userData.avatar_url}
              alt={userData.login}
              sx={{
                width: 150,
                height: 150,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                mb: 2,
              }}
            />
            <CardContent sx={{ flexGrow: 1, width: "100%", mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h5" gutterBottom>
                {userData.name || userData.login}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {userData.bio}
              </Typography>
              <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <GitHub />
                <Box component="span" sx={{ ml: 1 }}>
                  <MuiLink href={userData.html_url} target="_blank" rel="noopener noreferrer">
                    {userData.login}
                  </MuiLink>
                </Box>
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={2} alignItems="center">
                <PeopleAlt />
                <Box component="span" sx={{ ml: 1 }}>
                  <Typography variant="body2">
                    {userData.followers} Seguidores | {userData.following} Siguiendo
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Typography variant="body2">
                  <Email />
                  <Box component="span" sx={{ ml: 1 }}>
                    {userData.email ? (
                      <MuiLink href={`mailto:${userData.email}`}>{userData.email}</MuiLink>
                    ) : (
                      "N/A"
                    )}
                  </Box>
                </Typography>
                <Typography variant="body2">
                  <Twitter />
                  <Box component="span" sx={{ ml: 1 }}>
                    {userData.twitter_username ? (
                      <MuiLink
                        href={`https://twitter.com/${userData.twitter_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{userData.twitter_username}
                      </MuiLink>
                    ) : (
                      "N/A"
                    )}
                  </Box>
                </Typography>
              </Box>
              <Button variant="contained" color="primary" onClick={() => handleExportUserData()}>
                Exportar
              </Button>
            </CardContent>
          </>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <Typography variant="body1">Cargando...</Typography>
        )}
      </Card>
    </Container>
  );
};

export default UserProfile;
