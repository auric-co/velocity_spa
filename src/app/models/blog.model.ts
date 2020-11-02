import { Deserializable } from './deserializable.model';

export class Blog implements Deserializable{
  id: number;
  category: string;
  quiz: string;
  title: string;
  intro: string;
  content: string;
  image: string;
  url: string;
  post: number;
  created_at: string;
  updated_at: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
