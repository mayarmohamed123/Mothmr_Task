export interface User {
  id: string;
  name: string;
  email: string;
  role: 'advertiser' | 'influencer' | 'admin';
  avatar?: string;
}

export interface AuthToken {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'advertiser' | 'influencer';
}
