import './components/style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginpage from './components/Loginpage';
import MyProfile from './components/MyProfile';
import NavigationMenu from './components/NavigationMenu';
import Budgeting from './components/Budgeting';
import Investing from './components/Investing';
import Homepage from './components/Homepage';
import TaxSaving from './components/TaxSaving';
function App() {
  return (
    <div className="App">
      <Router>
      <NavigationMenu />
        <Routes>
          <Route path='/' exact element={<Loginpage />} />
          <Route path='/Homepage' exact element={<Homepage />} />
          <Route path='/MyProfile' exact element={<MyProfile />} />
          <Route path='/Budgeting' exact element={<Budgeting />} />
          <Route path='/Investing' exact element={<Investing />} />
          <Route path='/TaxSaving' exact element={<TaxSaving />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
