import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AudioProvider } from './context/AudioContext';
import App from './App';
import './index.css';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter>
        <AudioProvider>
          <App />
        </AudioProvider>
      </BrowserRouter>
    </Provider>
  );
}
