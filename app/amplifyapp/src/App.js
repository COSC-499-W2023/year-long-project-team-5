import React, { useState, useEffect, StrictMode } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {Amplify, Auth, API, Storage } from 'aws-amplify';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Layout} from './pages/Layout'
import {Home} from './pages/Home'
import {Dashboard} from './pages/Dashboard'
import {Login} from './pages/Login'
import {Submission} from './pages/Submission'
import { Authenticator } from "@aws-amplify/ui-react";
import {RequireAuth} from "./RequireAuth"

function MyRoutes(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element ={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path = "/dashboard" element={
            <RequireAuth>
            <Dashboard/>
            </RequireAuth>
          }/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/submission" element = {
            <RequireAuth>
            <Submission/>
            </RequireAuth>
          }/>
        </Route>
      </Routes> 
    </BrowserRouter>
  )
}

function App(){
  return(
    <Authenticator.Provider>
      <MyRoutes/>
    </Authenticator.Provider>
  )
}

export default App;
