import React, {useEffect} from 'react';
import {useDispatch } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logout} from '../../actions/AuthAction'

const LogOut = () => {
   const dispatch = useDispatch();
   useEffect(() =>{
      dispatch(logout());
   }, []);
  return (
    <Redirect to="/"></Redirect>
  )
};

export default LogOut;