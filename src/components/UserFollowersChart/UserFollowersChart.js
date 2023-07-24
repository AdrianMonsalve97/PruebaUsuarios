import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import Chart from "chart.js/auto";

const UserFollowersChart = () => {
  const [followersData, setFollowersData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchFollowersData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/search/users?q=followers:>0&per_page=10"
        );

        const usersData = response.data.items.map((user) => ({
          username: user.login,
          followers: user.followers,
        }));

        setFollowersData(usersData);
      } catch (error) {
        console.error("Error al obtener datos de seguidores:", error);
      }
    };

    fetchFollowersData();
  }, []);

  useEffect(() => {
    // Crear o actualizar el gráfico
    if (followersData.length > 0) {
      const chartData = {
        labels: followersData.map((user) => user.username),
        datasets: [
          {
            label: "Seguidores",
            data: followersData.map((user) => user.followers),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      const chartOptions = {
        scales: {
          y: {
            type: "linear",
            beginAtZero: true,
          },
        },
      };

      if (chartRef.current) {
        // Eliminar la instancia anterior del gráfico
        chartRef.current.destroy();
      }

      // Crear una nueva instancia del gráfico
      chartRef.current = new Chart(document.getElementById("chartCanvas"), {
        type: "bar",
        data: chartData,
        options: chartOptions,
      });
    }
  }, [followersData]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Gráfico de Seguidores de Usuarios en GitHub
      </Typography>
      <div>
        <canvas id="chartCanvas" />
      </div>
      {followersData.length === 0 && (
        <Typography variant="body1">Cargando datos...</Typography>
      )}
    </Container>
  );
};

export default UserFollowersChart;
