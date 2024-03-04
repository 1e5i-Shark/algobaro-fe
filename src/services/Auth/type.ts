export interface SignInProps {
  email: string;
  password: string;
}

export interface SignUpProps {
  email: string;
  nickname: string;
  bojId: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  response: {
    accessToken: string;
  };
}

export interface SignUpResponse {
  success: boolean;
  response: {
    id: number;
  };
}
