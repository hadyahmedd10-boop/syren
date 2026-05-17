export type Testimonial = {
  id: string;
  name: string;
  email?: string;
  experience?: string;
  experience_slug?: string;
  rating: number;
  message: string;
  title?: string;
  approved?: boolean;
  created_at?: string;
};