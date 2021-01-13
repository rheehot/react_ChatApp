import { SET_CURRENT_CHAT_ROOM } from '../actions/types';

// 로그인이 시작된다면 로딩값을 true
const initialChatRoomState = {
    currentChatRoom: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialChatRoomState, action) {
    switch (action.type) {
        case SET_CURRENT_CHAT_ROOM:
            return {
                ...state,
                currentChatRoom: action.payload
            }
        default:
            return state;
    }
}