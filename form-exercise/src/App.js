import './App.css';
import { Routes, Route,BrowserRouter,Navigate} from "react-router-dom";
import Navigation from './components/Navigation/navigation';
import Main from './components/Main/main';
import Success from './components/Success/success';

// Switch has been removed in react-router-dom v6 with Routes
// Here we import our react components which I've placed in a components folder
// Depending on url we shall render the appropriate component

function App() {
  return (
    <>

     <BrowserRouter>
        <Navigation />
       <Routes>
         <Route exact path='/' element={<Main />}/>
         <Route path='/success' element={<Success />} />
         <Route path='*' element={<Navigate to='/' />} />
       </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
