
export interface Testimonial {
  id: number;
  author: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Stat {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}
