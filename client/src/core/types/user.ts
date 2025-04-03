

export interface User {
  _id: string
  name: string
  email: string
  picture?: string
}


export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (userData: User, token: string) => void
  logout: () => void
}
