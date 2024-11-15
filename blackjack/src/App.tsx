import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Table from "./components/Table";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/user" element={<Table />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
