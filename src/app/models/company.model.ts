import { Deserializable } from './deserializable.model';

export class Company implements Deserializable {
  id:number
  name: string;
  logo: string;
  status: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
