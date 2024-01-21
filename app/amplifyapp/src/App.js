import React, { useState, useEffect, StrictMode } from "react";
import "./App.css";

import {Amplify, Auth} from 'aws-amplify';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Layout} from './pages/Layout'
import {Home} from './pages/Home'
import {Dashboard} from './pages/Dashboard'
import {Login} from './pages/Login'
import {Submission} from './pages/Submission'
import {Recording} from './pages/Recording'
import {Profile} from './pages/Profile'
import { Authenticator } from "@aws-amplify/ui-react";
import {RequireAuth} from "./RequireAuth"

import('@aws-amplify/ui-react/styles.css');

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
          <Route path = "/recording" element = {<Recording/>}/>
          <Route path = "/profile" element = {
            <RequireAuth>
            <Profile/>
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
