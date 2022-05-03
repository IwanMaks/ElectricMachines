import React from "react";
import './style.css'
import './App.css'
import { Task1_2 } from "./components/Task1_2/Task1_2";
import { StartPage } from "./components/StartPage/StartPage";
import { Routes, Route, HashRouter } from "react-router-dom";

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="" element={<StartPage />} />
                <Route path="1" element={<Task1_2 type='task1' />} />
                <Route path="2" element={<Task1_2 type='task2' />} />
            </Routes>
        </HashRouter>
    )
}

export default App
