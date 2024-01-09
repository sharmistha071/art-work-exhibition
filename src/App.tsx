import { useState } from "react";
import "./App.css";

import Home from "./pages/Home";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>hello</p>
      <Home />
    </div>
  );
};

export default App;
