
import UploadDataToFirebase from "./components/UploadDataToFirebase"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"
import Cart from "./Pages/Cart"
import Auth from "./components/Auth"
import { NewContext } from "./context/context"
import { useState } from "react"

function App() {
  const [text, setText] = useState('Look Mom')
return (
    <NewContext.Provider value= {{text, setText}}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </NewContext.Provider>
)

}

export default App


const NoMatch = () => {
  return (
    <div>404</div>
  )
}