import { Routes, Route , Navigate} from "react-router-dom";
import PlannerLayout from "./Components/PlannerLayout";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PlannerLayout />}>
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path="/home" element={<Home/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
