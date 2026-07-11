
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Overview from "./Overview";
import { Provider } from "react-redux";
import store from "./store";
import { Transaction } from "./Transaction";
import './App.css'
import Validation from './Validation';
function App() {

  return (
    <>
      <Provider store={store}>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Transaction/>}></Route>
  <Route path="/Overview" element={<Overview/>}></Route>
  <Route path="/Validation" element={<Validation/>}></Route>
</Routes>

    </BrowserRouter>
</Provider>
    
    </>
  )
}

export default App
