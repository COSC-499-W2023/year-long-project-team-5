import React, { useState, useEffect, StrictMode } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {Amplify, Auth, API, Storage } from 'aws-amplify';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Layout} from './pages/Layout'
import {Home} from './pages/Home'
import {Dashboard} from './pages/Dashboard'
import {Login} from './pages/Login'

import { Authenticator } from "@aws-amplify/ui-react";

function MyRoutes(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element ={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path = "/dashboard" element={<Dashboard/>}/>
          <Route path = '/login' element = {<Login/>}/>
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