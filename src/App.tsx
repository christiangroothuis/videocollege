import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Presentation } from './pages/Presentation/Presentation';
import { Course } from './pages/Course';

import './index.css';

function App(): JSX.Element {
    return (
        <React.StrictMode>
            <SWRConfig
                value={{
                    refreshInterval: 0,
                    revalidateOnFocus: false,
                    fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
                }}
            >
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="presentation/:id" element={<Presentation />} />
                            <Route path="course/:id" element={<Course />} />
                            {/* <Route path="player/:id" element={<Player />} /> */}
                        </Routes>
                    </Layout>
                </Router>
            </SWRConfig>
        </React.StrictMode>
    );
}

export default App;
