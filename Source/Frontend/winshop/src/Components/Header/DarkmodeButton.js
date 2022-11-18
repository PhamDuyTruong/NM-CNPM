import React from 'react';
import Switch from "@material-ui/core/Switch";
import { Tooltip } from "@material-ui/core";

function DarkmodeButton() {
    const isTheme = true;
  return (
    <div>
        <Tooltip title="Dark Mode">
            <Switch checked={isTheme} onChange={""}>
            </Switch>
        </Tooltip>
    </div>
  )
}

export default DarkmodeButton