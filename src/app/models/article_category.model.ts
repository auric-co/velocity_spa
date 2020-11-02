import { Deserializable } from './deserializable.model';

export class ArticlesCategory implements Deserializable {
  id: number;
  title: string;
  image: string;
  count: number;
  description: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
