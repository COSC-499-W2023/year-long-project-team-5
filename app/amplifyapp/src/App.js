import React from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import {Layout} from './pages/Layout'
import {Home} from './pages/Home'
import {Dashboard} from './pages/Dashboard'
import {Login} from './pages/Login'
import {Submission} from './pages/Submission'
import {Recording} from './pages/Recording'
import { Confirmation } from "./pages/Confirmation";
import {Profile} from './pages/Profile'
import { Authenticator } from "@aws-amplify/ui-react";
import {RequireAuth} from "./RequireAuth"
import {Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Auth.configure(awsconfig);
Amplify.configure(awsconfig);
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
          <Route path = "/confirmation" element = {<Confirmation />}/>
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
