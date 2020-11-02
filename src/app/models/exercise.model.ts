import { Deserializable } from './deserializable.model';

export class Exercise implements Deserializable {
  title: string; time: string; difficult: string; image: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
