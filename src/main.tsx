import { createRoot } from 'react-dom/client';
import { invoke } from '@tauri-apps/api';

import App from './App';

import './index.css';

invoke<string>('greet', { name: 'World' }).then((response) => console.log(response));

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
