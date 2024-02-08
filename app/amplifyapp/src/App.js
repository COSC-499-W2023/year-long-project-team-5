import React from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import {Layout} from './pages/Layout'
import {Home} from './pages/Home'
import {Submissions} from './pages/Submissions'
import {Login} from './pages/Login'
import {Request} from './pages/Request'
import {Recording} from './pages/Recording'
import { Confirmation } from "./pages/Confirmation";
import {Profile} from './pages/Profile'
import { Authenticator } from "@aws-amplify/ui-react";
import {RequireAuth} from "./RequireAuth"
import {Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Auth.configure(awsconfig);
Amplify.configure(awsconfig);

function MyRoutes({ colorMode, setColorMode }){
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element ={<Layout colorMode = {colorMode} setColorMode = {setColorMode} />}>
          <Route index element={<Home colorMode={colorMode}/>}/>
          <Route path = "/submissions" element={
            <RequireAuth>
            <Submissions/>
            </RequireAuth>
          }/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/request" element = {
            <RequireAuth>
            <Request/>
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

function App({colorMode, setColorMode}){
  return(
      <Authenticator.Provider>
        <MyRoutes colorMode={colorMode} setColorMode={setColorMode}/>
      </Authenticator.Provider>
  )
}
export default App;
