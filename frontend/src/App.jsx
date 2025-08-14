import { Route, Routes } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { MessageContext } from "./MessageContext";
import ProtectedRoute from "./ProtectedRoute";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Class from "./pages/Class";

const App = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
      axios.get("/api/hello")
        .then(res => setMsg(res.data.pesan))
        .catch(err => console.error(err));
    }, []);

  return (
    <MessageContext.Provider value={{ msg, setMsg }}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/class" 
            element={
              <ProtectedRoute>
                <Class />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </MessageContext.Provider>
  )
}

export default App;