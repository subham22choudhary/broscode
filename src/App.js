
import './App.css';


import CombinedMinifier from './components/CombinedMinifier';

import RemoveUnusedCss from './components/RemoveUnusedCss';



function App() {
  return (
    <div className="App">

      <CombinedMinifier />

      <RemoveUnusedCss />


    </div>
  );
}

export default App;
