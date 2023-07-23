import React from "react";
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import SearchUser from"./components/SearhUser/SearchUser" ;
import { Container } from "@mui/material";
import UserProfile from "./components/UserProfile/UserProfile";
import UserFollowersChart from "./components/UserFollowersChart/UserFollowersChart";

const App = () => {
  return (
    <Router>
      {/* Utiliza el componente Routes para anidar las rutas */}
      <Routes>
        <Route path="/" element={<SearchUser />} /> {/* Utiliza element para especificar el componente a renderizar */}
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/followers-chart" element={<UserFollowersChart />} />
      </Routes>
    </Router>
  );
};
export default App;
