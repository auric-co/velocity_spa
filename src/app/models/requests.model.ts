import { Deserializable } from './deserializable.model';

export class Requests implements Deserializable{
  id: number;
  user: number;
  platform: number;
  category: number;
  customCategory: string;
  contact: string;
  email: string;
  date: string;
  time: string;
  status: number;
  seen: number;
  created_at: string;
  updated_at: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
