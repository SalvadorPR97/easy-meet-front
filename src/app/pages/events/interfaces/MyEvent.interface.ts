export interface MyEvent {
  id: number;
  title: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  city: string;
  image_url: string;
  date: string;
  start_time: string;
  end_time: string;
  only_women: boolean;
  only_men: boolean;
  category_id: number;
  subcategory_id: number;
  owner_id: number;
  min_participants: number;
  max_participants: number;
  price: number;
  created_at: string;
  updated_at: string;
  users: any;

}
