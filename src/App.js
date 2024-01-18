/**
 * App component which renders the main UI.
 * Imports and renders the AppBar and Student components.
 * Exports the App component as the default export.
 */
/*
* We are using Material Ui for the frontend part for the Student System Project
*/

import "./App.css";
import AppBar from "./components/Appbar";
import Student from "./components/Student";

function App() {
  return (
    <div className="App">
      <AppBar />
      <Student />
    </div>
  );
}

export default App;
