import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header/Header'

function AppLayout({children}) {
  return (
    <>
          <Header />
          {children}
          <Footer />
    </>
  )
}

export default AppLayout