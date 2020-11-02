import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { MoodStore, MoodState } from './mood.store';

@Injectable({ providedIn: 'root' })
export class MoodQuery extends QueryEntity<MoodState> {

  constructor(protected store: MoodStore) {
    super(store);
  }

}
