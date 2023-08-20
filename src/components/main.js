import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import  { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRoute } from "../router";
import { auth }  from "../../firebase/config"; 
import { authStateChanged } from "../redux/auth/authOperations";


export const Main = ()=> {
  // const [user, setUser] = useState(null)

  const stateChange = useSelector((state) => state.auth)
const dispatch = useDispatch()
useEffect(()=>{
  dispatch(authStateChanged())
  
    }, [])


  // auth.onAuthStateChanged((user)=> setUser(user))
  const routing = useRoute(stateChange);

  useEffect(()=>{}, [])

  return <NavigationContainer>{routing}</NavigationContainer>
}