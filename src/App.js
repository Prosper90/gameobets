import { Route, Routes } from "react-router-dom";
import Layout from "./components/common/layout/Layout";
import GameSection from "./components/home/GameSection";
import LeaderBoard from "./components/leaderboard/LeaderBoard";
import FlipStats from "./components/flipstats/FlipStats";
import AllFlips from "./components/allflips/AllFlips";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<GameSection />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/stats" element={<FlipStats />} />
        <Route path="/all" element={<AllFlips />} />
      </Routes>

    </Layout>
  );
}

export default App;
