import {OPEN_SIDEBAR, DRAW_SIDEBAR_OPEN, DRAW_SIDEBAR_CLOSE, IS_SHOW_CART, DARK_THEME} from '../constants/SidebarConstant';

const initialState = {
    sideOpen: false,
    sideDraw: false,
    isShowCart: false,
    darkTheme: null
}

function addSidebarReducer(state= initialState, action){
    switch(action.type){
        case OPEN_SIDEBAR:
            return {...state, sideOpen: !state.sideOpen};
        case DRAW_SIDEBAR_OPEN:
            return {...state, sideDraw: true};
        case DRAW_SIDEBAR_CLOSE:
            return {...state, sideDraw: false};
        case IS_SHOW_CART:
            return {...state, isShowCart: action.payload}
        case DARK_THEME:
            localStorage.setItem("theme", JSON.stringify(action.payload));
            return {...state, darkTheme: action.payload}
        default:
            return state;
    }
};

export default addSidebarReducer;