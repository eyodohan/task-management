import * as actions from "./actionTypes";

const initialState = {
  isLoggedIn: false,
  userData: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN_USER: {
      return [
        ...state,
        {
          userData: action.payload.userData,
          isLoggedIn: true,
        },
      ];
    }
  }
}
