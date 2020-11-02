import { Deserializable } from './deserializable.model';

export class Appointment implements Deserializable{
  id:number;
  category:number;
  request:number;
  counsellor: number;
  date: string;
  platform: number;
  time: string;
  link: string;
  status: number;
  location: number;
  notes:string;
  created_at: string;
  updated_at: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
