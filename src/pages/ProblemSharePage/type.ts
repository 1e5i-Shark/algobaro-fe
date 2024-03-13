export interface User {
  id: string;
  profileImage: string | null;
  nickname: string;
  joinTime: string;
  ready: boolean;
  role: string;
}
