import './styles/global.css'
import 'react-toastify/dist/ReactToastify.min.css';

import {LiveGame} from "./components/LiveStatusGameCard/LiveGame";
import {HashRouter, Switch, Route, Redirect} from "react-router-dom";
import {Footer} from "./components/Footer/Footer";
import {LiveGames} from "./components/LiveGameCard/LiveGames";
import {Navbar} from "./components/Navbar/Navbar";

function App() {
  return (
      <HashRouter basename="/">
          <Navbar/>
          <div className="container">
              <Switch>
                  <Route path="/" exact component={LiveGames}/>
                  <Route path="/live/:gameid" component={LiveGame}/>
                  <Redirect to="/"/>
              </Switch>
          </div>
          <Footer/>
      </HashRouter>
  );
}

export default App;
