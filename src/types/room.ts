export interface UpdateRoomType {
  title: string;
  introduce: string;
  roomAccessType: string;
  problemPlatform: string;
  problemName: string;
  password: string;
  roomLimit: number;
  levelTag: string;
  algorithmTag: string;

  shortUUID: string;
  problemLink: string;
  tags: string[];
  languages: string[];
  users: UserType[];
  timer: number;
}

export interface UserType {
  username: string;
  status: string;
  image: string;
}
