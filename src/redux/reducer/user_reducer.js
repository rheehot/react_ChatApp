import { SET_USER, CLEAR_USER } from '../actions/types';

// 로그인이 시작된다면 로딩값을 true
const initialUserState = {
    currentUser: null,
    isLoading: true
}

export default function (state = initialUserState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isLoading: false
            }
        case CLEAR_USER:
            return {
                ...state,
                currentUser: null,
                isLoading: false
            }
        default:
            return state;
    }
}