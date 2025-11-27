import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Calculator from './Calculator';
import Sources from './Sources';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/fuentes" element={<Sources />} />
      </Routes>
    </Router>
  );
}

export default App;
