import './styles/global.css'
import 'react-toastify/dist/ReactToastify.min.css';

import {PlayerCard} from "./components/LiveStatusGameCard/PlayerCard";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar";
import {LiveGames} from "./components/LiveGameCard/LiveGames";

function App() {
  return (
      <Router>
          <Navbar/>
          <div className="container">
              <Switch>
                  <Route path="/" exact component={LiveGames}/>
                  <Route path="/live/:gameid" component={PlayerCard}/>
                  <Redirect to="/"/>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
