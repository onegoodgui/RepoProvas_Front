import Container from "./components/generalUse/Container";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn/SignIn";
import SignUp from "./pages/AuthPages/SignUp/SignUp";
import Homepage from "./pages/Homepage/Homepage";

import { AuthProvider } from "./contexts/AuthContext";
import { FilterProvider } from "./contexts/FilterContext";

function App() {
  return (
    <>
    <Container>
      
      <AuthProvider>
        <FilterProvider>

          <BrowserRouter>
            <Header/>
            <Routes>
              <Route path="/" element={<SignIn/>} />
              <Route path="/sign-up" element={<SignUp/>} />
              <Route path='/homepage' element={<Homepage/>}/>
            </Routes>
          </BrowserRouter>

        </FilterProvider>
      </AuthProvider>

    </Container>
    </>
  );
}

export default App;
