import Home from './Routes/Home';
import Register from './Routes/Register';
import Content from './Routes/Content';
import My_List from './Routes/My_List';

import Footer from './Components/Footer';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from "react-router-dom";
import Header from './Components/Header';

function App() {
  return (
    <div className='min-h-screen bg-sky-500'>
      <div className='flex flex-col min-h-screen'>
        <Router>


          <div className=''>
            <Header/>
          </div>
            
  
          <div className='felx flex-grow justify-center items-center'>
            <Routes>
              
              {/* MAKE SURE BOTH ROUTE TO HOME PAGE */}
              <Route path="/" element={<Home />}></Route>
              <Route path="/Register" element={<Register />}></Route>
              <Route path="/Content" element={<Content />}></Route>
              <Route path="/My_List" element={<My_List />}></Route>
              
            </Routes>
          </div>


          <div className=''>
            <Footer/>
          </div>
            
          
        </Router>
      </div>
      
    </div>
    
    
  );
}

export default App;
