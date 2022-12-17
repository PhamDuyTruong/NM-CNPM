import React from 'react'
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