import { Route, Routes } from "react-router-dom";
import Layout from "./components/common/layout/Layout";
import GameSection from "./components/home/GameSection";
import LeaderBoard from "./components/leaderboard/LeaderBoard";

function App() {
  return (
    <Layout>
      <Routes>
       <Route path="/" element={<GameSection/>}/>
       <Route path="/leaderboard" element={ <LeaderBoard/>}/>
      </Routes>
        
    </Layout>
  );
}

export default App;
