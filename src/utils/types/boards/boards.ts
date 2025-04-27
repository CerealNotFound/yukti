export type Board = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  last_activity: string;
  author: string;
  who_can_see: "everyone" | "team" | "private";
  labels: string[];
  is_starred: boolean;
  status: "active" | "archived";
  category?: string;
};

export interface BoardWithAuthor {
  id: string;
  title: string;
  description: string;
  created_at: string;
  last_activity: string;
  who_can_see: 'everyone' | string; // You may want to make this more specific with allowed values
  labels: string[];
  is_starred: boolean;
  status: 'active' | string; // You may want to make this more specific with allowed values
  category: string;
  users: {
    name: string;
    email: string;
  };
}