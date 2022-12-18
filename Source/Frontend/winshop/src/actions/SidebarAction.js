import {OPEN_SIDEBAR, DRAW_SIDEBAR_OPEN, DRAW_SIDEBAR_CLOSE, IS_SHOW_CART, DARK_THEME} from '../constants/SidebarConstant';

export const openSidebar = () =>{
    return {
        type: OPEN_SIDEBAR
    }
}

export const drawSidebarOpen = () =>{
    return {
        type: DRAW_SIDEBAR_OPEN
    }
}

export const drawSidebarClose = () =>{
    return {
        type: DRAW_SIDEBAR_CLOSE
    }
};

export const getShowCart = (str) => {
    return {
        type: IS_SHOW_CART,
        payload: str
    }
}

export const getDarkTheme = (str) => {
    return {
        type: DARK_THEME,
        payload: str
    }
}