import { Routes, Route , Navigate} from "react-router-dom";
import PlannerLayout from "./Components/Layout";
import Home from "./Components/Home";
import Blog from "./Components/Blog";
import About from "./Components/About";
import Userlayout from "./Components/client/Userlayout";
import UserDashboard from "./Components/client/UserDashboard";
import CompletedEvents from "./Components/client/CompletedEvents";
import Ongoing from "./Components/client/Ongoing";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PlannerLayout />}>
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/about" element={<About/>}/>
        </Route>

        {/* client layout */}
        <Route path="/user" element={<Userlayout />}>
        <Route path="/user/dashboard" element={<UserDashboard/>}/>
        <Route path="/user/completed" element={<CompletedEvents/>}/>
        <Route path="/user/ongoing" element={<Ongoing/>}/>

        </Route>
      </Routes>
    </>
  );
}

export default App;
