import { createReducer, on } from "@ngrx/store";
import { currentUserLoaded } from "../user.actions";

export const userFeatureKey = 'user';
export interface UserState {
  user: any;
}

export const initialUserState: UserState = {
  user: undefined
};

export function userReducer(state, action) {
  return _userReducer(state, action);
}

const _userReducer = createReducer(
  initialUserState,
  on(currentUserLoaded, (state, action) => {
    return {
      ...state,
      user: action.user
    };
  })
);
