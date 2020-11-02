export interface AppointmentRequest {
  id: number;
  user_id: number;
  counselling_venue_id: number;
  counselling_category_id: number;
  other_category_details: string;
  contact: string;
  date: string;
  time: string;
  status: any;
  created_at: string;
  updated_at: string;
}
