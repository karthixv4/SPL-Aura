import { Routes,Route } from "react-router-dom";
import Home from "./Components/pages/Home";
import PlayerDetails from "./Components/pages/PlayerDetails";
import DetailedPlayer from "./Components/pages/DetailedPlayer";
import TeamList from "./Components/pages/team/TeamList";
import TeamDetails from "./Components/pages/team/TeamDetails";
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/addPlayer" element={<PlayerDetails></PlayerDetails>}></Route>
      <Route path="/details/:id" element={<DetailedPlayer></DetailedPlayer>}></Route>
      <Route path="/teams" element={<TeamList></TeamList>}></Route>
      <Route path="/team/details/:id" element={<TeamDetails></TeamDetails>}></Route>
      </Routes>
    </div>
  );
}

export default App;
