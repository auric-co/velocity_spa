import { Injectable } from '@angular/core';
import { User } from './user.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface UserState extends EntityState<User> {}

export function createInitialState(): UserState {
  return {
    id: '',
    name: '',
    surname: '',
    memberNumber: '',
    dob: '',
    email: '',
    msisdn: '',
    profile: '',
    company: '',
    country: '',
    city: '',
    bmi: '',
    weight: '',
    height: '',
    points: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends EntityStore<UserState> {

  constructor() {
    super(createInitialState());
  }

}

