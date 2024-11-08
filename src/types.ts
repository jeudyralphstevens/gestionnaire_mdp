export interface FileEntry {
  name: string;
  path: string;
  password: string;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}