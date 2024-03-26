import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/homepage/home'
import './App.css';
import DashboardBanner from "./components/dashboard/dashboard-banner";

function App() {
  return (
    <div className="App">
    <Router>
      <main>
      <Routes path="/" >
        <Route index path="/" element={<Home />} />

        <Route path="dashboard">
          <Route index element={<DashboardBanner />} />
        </Route>

      </Routes>
        

      </main>
    </Router>
    </div>
  );
}

export default App;
