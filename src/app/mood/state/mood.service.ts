import { Injectable } from '@angular/core';
import { MoodStore, MoodState } from './mood.store';
import { NgEntityService } from '@datorama/akita-ng-entity-service';

@Injectable({ providedIn: 'root' })
export class MoodService extends NgEntityService<MoodState> {

  constructor(protected store: MoodStore) {
    super(store);
  }

}
