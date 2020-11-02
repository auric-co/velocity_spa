export interface User {
  id: number | string;
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
  weight: any;
  height: any;
  address_line_1: any;
  address_line_2: any;
  points: number;
}

export function createUser(params: Partial<User>): any{
  return {

  } as User;
}
