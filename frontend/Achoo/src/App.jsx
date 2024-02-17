import './App.css'
import Navbar from './Components/Navbar'
import AllRoutes from './Components/routes/AllRoutes'
import Dashboard from './Components/Dashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Navbar from './Components/'

function App() {

  return (
    <>
      <Navbar />
      <AllRoutes />
      <ToastContainer />
    </>
  )
}

export default App
