import Navbar from "./components/Navbar";
import Footer  from "./components/Footer";
import Home from "./pages/Home";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <>
          <Navbar/>
          <main className='place-items-center mx-auto'>
              <Home/>
          </main>
          <Footer/>
          <ToastContainer/>
      </>
  );
}

export default App;
