import { Deserializable } from './deserializable.model';

export class User implements Deserializable {
  id: number;
  name: string;
  surname: string;
  memberNumber: string;
  dob: string;
  email: string;
  msisdn: string;
  profile: string;
  company: number;
  country: string;
  city: string;
  bmi: number;
  weight: number;
  height: number;
  points: number;

  deserialize(input: any): any {
    Object.assign(this, input);
    return this;
  }
}
