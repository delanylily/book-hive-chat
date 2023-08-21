import { createAction, props } from '@ngrx/store';

export const currentUser = createAction('[User Profile] get current user');
export const currentUserLoaded = createAction('[User Profile] current user loaded', props<{ user: any; }>());
