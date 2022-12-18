import React, {useState} from 'react';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {useSelector} from 'react-redux'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header/Header'

function AppLayout({children}) {
  const {darkTheme} = useSelector((state) => state.sidebar);
  const ThemeInLocal = JSON.parse(localStorage.getItem("theme"));
  let isTheme = darkTheme;
 if(!darkTheme){
     isTheme = ThemeInLocal
 }
  const myTheme = createTheme({
    
    // Theme settings
    palette: {
      mode: isTheme ? "dark" : "light",
    },
  });
  console.log(myTheme)
  return (
    <>
        <ThemeProvider theme={myTheme}>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
    </>
  )
}

export default AppLayout