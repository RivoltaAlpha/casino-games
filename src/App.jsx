import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from './pages/Landing';
import Mines from './games/mines/mines';
import ChargeBuffalo from './games/chargeBuffalo/ChargeBuffalo';
import Alibaba from './games/Alibaba/Alibaba';

import BoxingKIng from './games/boxingKIng/boxingKing';

//import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        {/* Define the page routes */}
        <Route path="/" element={<Landing/>} />

        {/* <Route path="/crazy" element={<Crazy77/>} />
        <Route path="/mines" element={<Mines/>} />
        <Route path="/mega" element={<Mega/>} />
        <Route path="/supa" element={<Supa/>} />

        <Route path="/mc" element={<MoneyComing/>} />
        <Route path="/ge" element={<MoneyComing/>} />

        <Route path="/demo" element={<Demo/>} />*/}
        <Route path="/boxing-king" element={<BoxingKIng/>} />
        <Route path="/alibaba" element={<Alibaba/>} /> 
        <Route path="/mines" element={<Mines/>} /> 
        <Route path="/charge-buffalo" element={<ChargeBuffalo/>} /> 

      </Routes>
    </Router>
  );
}

export default App;
