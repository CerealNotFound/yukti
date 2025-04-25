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
