//functional component
//entitlement,roles,tokens
//jsx - javascript xml
import "react";
import Home from "./pages/Home";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

const App = () => {
  return (
    <>
    <Header />
    <Home />
    <Footer/>
    </>
  );
};

export default App;