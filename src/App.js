import './App.css';
import MemeGenerator from './meme-generator-app/meme_generator'
import ActivityForBoredPeople from "./bored-activity/activity_for_bored_people"
import { Link, Route } from "react-router-dom";


function App() {
  return (
    <div>
    <head>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    </head>
    <body>
    <div>
    <nav className="navbar navbar-light">
      <ul className="nav navbar-nav">
        <li>
          <Link to="/meme_generator">Meme Generator</Link>
        </li>
        <li>
          <Link to="/activity">Bored? Here you can find something to do</Link>
        </li>
      </ul>
    </nav>
    <Route path="/meme_generator"><MemeGenerator/></Route>
    <Route path="/activity"><ActivityForBoredPeople/></Route>
  </div>
  </body>
  </div>
);
      
}

export default App;
