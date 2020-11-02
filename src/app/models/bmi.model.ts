import { Deserializable } from './deserializable.model';

export class BMI implements Deserializable{
  height: number;
  weight: number;
  score: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
