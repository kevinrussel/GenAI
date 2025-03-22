import React, { useState } from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, useRoutes} from 'react-router-dom';

import AboutPage from './pages/before-login/contact.js';
import Homepage from './pages/before-login/home.jsx';
import Login from './pages/before-login/login.jsx';
import Startup from './pages/after-login/startup.jsx';

const RoutesConfig = () => {
    return useRoutes([
        { path: "/", element: <Homepage /> },
        { path: "/about", element: <AboutPage /> },
        {path : "/login", element: <Login/>},
        {path:"/startup", element: <Startup />}
    ]);
};

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <RoutesConfig setIsLoggedIn={setIsLoggedIn} />
        </Router>
    );
};

export default App;
