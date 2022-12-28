import React from 'react';
import Switch from "@material-ui/core/Switch";
import {useDispatch, useSelector} from 'react-redux'
import { Tooltip } from "@material-ui/core";
import {getDarkTheme} from '../../actions/SidebarAction'
function DarkmodeButton() {
  const {darkTheme} = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const ThemeInLocal = JSON.parse(localStorage.getItem("theme"));
  const handleDarkTheme = (event)=>{
    dispatch(getDarkTheme(event))
 }
 let isTheme = darkTheme;
 if(!darkTheme){
     isTheme = ThemeInLocal
 }
  return (
    <div>
        <Tooltip title="Dark Mode">
            <Switch checked={isTheme} onChange={(e) => handleDarkTheme(e.target.checked)}>
            </Switch>
        </Tooltip>
    </div>
  )
}

export default DarkmodeButton