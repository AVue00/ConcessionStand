import { Outlet } from 'react-router-dom';
import BackgroundOverlay from './components/BackgroundOverlay';

function App() {
  return (
    <div className='container'>
      <BackgroundOverlay />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;