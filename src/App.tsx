import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Calculator from './Calculator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </Router>
  );
}

export default App;
