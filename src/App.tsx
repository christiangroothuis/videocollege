import React from 'react';

import { SWRConfig } from 'swr';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CheckAuthOnMount from './service/CheckAuthOnMount';

import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Course from './pages/Course';
import Player from './pages/Player';
import Presentation from './pages/Presentation';

import './index.csss';

function App() {
    return (
        <React.StrictMode>
            <SWRConfig
                value={{
                    refreshInterval: 0,
                    revalidateOnFocus: false,
                    fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
                }}
            >
                <CheckAuthOnMount />
                <Router>
                    <Layout>
                        <ScrollToTop />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="course/:id" element={<Course />} />
                            <Route path="presentation/:id" element={<Presentation />} />
                            <Route path="player/:id" element={<Player />} />
                        </Routes>
                    </Layout>
                </Router>
            </SWRConfig>
        </React.StrictMode>
    );
}

export default App;
