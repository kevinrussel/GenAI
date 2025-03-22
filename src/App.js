import React from 'react';
import Navbar from './components/navbar'; // Navbar component
import { BrowserRouter as Router, useRoutes} from 'react-router-dom';

// Pages
import AboutPage from './pages/contact';
import Homepage from './pages/home.jsx';
import Login from './pages/login.jsx';

const AppRoutes = () => {
    return useRoutes([
        { path: "/", element: <Homepage /> },
        { path: "/about", element: <AboutPage /> },
        {path : "/login", element: <Login/>}
    ]);
};

const App = () => {
    return (
        <Router>
            <Navbar />
            <AppRoutes />
        </Router>
    );
};

export default App;
