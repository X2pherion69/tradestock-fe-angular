import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { User } from 'pages/login/login.service';

export interface AuthState {
  user: User | null;
}

interface AddUserProps {
  user: User;
}

const initialState: AuthState = {
  user: null,
};

export const authActions = {
  addUser: createAction('[User] Add User', props<AddUserProps>()),
  resetAuth: createAction('[User] Reset User'),
};

export const authReducer = createReducer(
  initialState,
  on(authActions.addUser, (_state, user) => user),
  on(authActions.resetAuth, (_state) => initialState)
);

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getUser = createSelector(
  getAuthState,
  (state: AuthState) => state.user
);
