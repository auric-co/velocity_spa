import { Injectable } from '@angular/core';
import { Mood } from './mood.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface MoodState extends EntityState<Mood> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'mood' })
export class MoodStore extends EntityStore<MoodState> {

  constructor() {
    super();
  }

}

