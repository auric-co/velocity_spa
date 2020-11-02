import { Deserializable } from './deserializable.model';

export class Tip implements Deserializable{
  id: number;
  title: string;
  intro: string;
  date: string;
  seen: number;
  content: string;
  image: string;
  category: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
