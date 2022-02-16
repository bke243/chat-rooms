import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { WelcomePage } from "./pages";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
