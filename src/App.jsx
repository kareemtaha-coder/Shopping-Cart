import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./Component/Header/Header";
import { Home } from "./Component/Home/Home";
import { Cart } from "./Component/Cart/Cart";

function App() {
  return <>
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}>
  
      </Route>
      <Route path='/cart' element={ <Cart/>} >
         
      </Route>
    </Routes>
  </BrowserRouter>
  
  </>;
}

export default App;
