import { useAuthClaims } from "@/stores/authStore";

export interface IUser {
	name?: string;
	profileImageUrl?: string;
	email?: string;
}

export function useCurrentUser(): IUser {
	const claims = useAuthClaims();

	return {
		name: claims?.user_metadata?.full_name,
		profileImageUrl: claims?.user_metadata?.avatar_url,
		email: claims?.email,
	}
}
