import { create } from "zustand"

interface AuthActions {
  setAuthClaims: (claims: Record<string, any> | null) => void;
  setProfile: (profile: any) => void;
  setIsLoading: (loading: boolean) => void;
}

interface AuthData {
  claims?: Record<string, any> | null
  profile?: any | null
  isLoading: boolean
  actions: AuthActions;
}

const initialState = {
  claims: undefined,
  profile: undefined,
  isLoading: true,
}

const useAuthStore = create<AuthData>((set) => ({
  ...initialState,
  actions: {
    setAuthClaims: (authClaims) => set({claims: authClaims}),
    setProfile: (profile) => set({profile: profile}),
    setIsLoading: (isLoading) => set({isLoading: isLoading}),
  }
}))

export const useAuthClaims = () => useAuthStore((state) => state.claims);
export const useAuthProfile = () => useAuthStore((state) => state.profile);
export const useAuthIsLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthIsLoggedIn = () => useAuthStore((state) => state.claims != null);

export const useAuthActions = () => useAuthStore((state) => state.actions);
