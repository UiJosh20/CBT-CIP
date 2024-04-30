import { Routes, Route , Navigate} from "react-router-dom";
import PlannerLayout from "./Components/Layout";
import Home from "./Components/Home";
import Blog from "./Components/Blog";
import About from "./Components/About";
import Userlayout from "./Components/client/Userlayout";
import UserDashboard from "./Components/client/UserDashboard";
import UserCompletedEvents from "./Components/client/UserCompletedEvents";
import UserOngoing from "./Components/client/UserOngoing";


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
        <Route path="/user/completed" element={<UserCompletedEvents/>}/>
        <Route path="/user/ongoing" element={<UserOngoing/>}/>

        </Route>
      </Routes>
    </>
  );
}

export default App;
