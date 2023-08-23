
import UploadDataToFirebase from "./components/UploadDataToFirebase"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"
import Cart from "./Pages/Cart"
import Auth from "./components/Auth"

function App() {
return (
  <Router>
  <Routes>

    <Route path="/" element={<Home />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/Auth" element={<Auth/>} />
    <Route path="*" element={<NoMatch />} />
  </Routes>
</Router>
)

}

export default App


const NoMatch = () => {
  return (
    <div>404</div>
  )
}