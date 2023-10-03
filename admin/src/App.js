import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import ForgotPassword from "./pages/Login/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
// import store from "./store";
// import { loadUser } from "./Action/UserAction";

const App = () => {
  const { isLogin } = useSelector((state) => state.user);
    return (
      <Router>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/login" Component={Login} />
        <Route path="/password/forgot" component={ForgotPassword} />
      </Routes> 
        <ProtectedRoute
        isAdmin={true}
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isLogin}
        />
    </Router>
    );
  };

export default App;

 // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

// <Router>
      //   <Routes>
      //     <Route exact path="/" Component={Login} />
      //     <Route exact path="/login" Component={Login} />
      //     <Route exact path="/password/forgot" Component={ForgotPassword} />
      //     {/* <ProtectedRoute isAuthenticated= {isLogin} redirectPath='/admin' element={<Dashboard/>}/> */}
      //   </Routes>
       
      // </Router>
