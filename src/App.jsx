import UploadDataToFirebase from "./components/UploadDataToFirebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./components/Auth";
import Cart from "./components/Cart";
import { CartProvider } from "./context/context";
import checkout from "./components/checkout";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/Auth" Component={Auth} />
          <Route path="/Cart" Component={Cart} />
          <Route path="/checkout" Component={checkout} />
          <Route path="*" Component={NoMatch} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

const NoMatch = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">404</div>
  );
};
