
import UploadDataToFirebase from "./components/UploadDataToFirebase"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"
import Auth from "./components/Auth"

function App() {
return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
)

}

export default App


const NoMatch = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">404</div>
  )
}