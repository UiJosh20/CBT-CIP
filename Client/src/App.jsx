import { Routes, Route , Navigate} from "react-router-dom";
import PlannerLayout from "./Components/PlannerLayout";
import Home from "./Components/Home";
import Blog from "./Components/Blog";
import About from "./Components/About";
import Login from "./Components/Login";
import CreateAccount from "./Components/CreateAccount";

function App() {
  return (
    <>
      <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<CreateAccount/>}/>
        <Route path="/" element={<PlannerLayout />}>
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/about" element={<About/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
