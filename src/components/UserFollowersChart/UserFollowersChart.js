import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const UserFollowersChart = () => {
  const [followersData, setFollowersData] = useState([]);

  useEffect(() => {
    const fetchFollowersData = async () => {
      try {
        // Obtener los datos de seguidores de los 10 primeros usuarios desde la API de GitHub
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

  // Crear un objeto de configuración para el gráfico de barras
  const chartData = {
    labels: followersData.map((user) => user.username),
    datasets: [
      {
        label: "Seguidores",
        data: followersData.map((user) => user.followers),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: "category",
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default UserFollowersChart;
