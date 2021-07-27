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
    <nav class="nav">
      <div class="item">
        <Link to="/meme_generator">Meme Generator</Link>
      </div>
      <div class="item">
        <Link to="/activity">Bored? Here you can find something to do</Link>
      </div>
    </nav>
    <Route path="/meme_generator"><MemeGenerator/></Route>
    <Route path="/activity"><ActivityForBoredPeople/></Route>
  </div>
  </body>
  </div>
);
      
}

export default App;
