import { supabase } from '@/lib/supabase'
import { useAuthActions, useAuthClaims } from '@/stores/authStore'
import { useDashboardActions } from '@/stores/dashboardStore'
import { PropsWithChildren, useEffect } from 'react'

export default function AuthProvider({ children }: PropsWithChildren) {
  const { setAuthClaims, setProfile, setIsLoading } = useAuthActions()
  const claims = useAuthClaims()
  const { reset: resetDashboard } = useDashboardActions()

  // Fetch the claims once, and subscribe to auth state changes
  useEffect(() => {
    const fetchClaims = async () => {
      setIsLoading(true)

      const { data, error } = await supabase.auth.getClaims()

      if (error) {
        console.error('Error fetching claims:', error)
      }

      setAuthClaims(data?.claims ?? null)
      setIsLoading(false)
    }

    fetchClaims()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, _session) => {
      console.log('Auth state changed:', { event: _event })
      // The dashboard store outlives the session, so the next user starts fresh.
      if (_event === 'SIGNED_OUT') resetDashboard()
      const { data } = await supabase.auth.getClaims()
      setAuthClaims(data?.claims ?? null)
    })

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [resetDashboard, setAuthClaims, setIsLoading])

  // Fetch the profile when the claims change
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)

      if (claims) {
        const { data } = await supabase.from('profiles').select('*').eq('id', claims.sub).single()

        setProfile(data)
      } else {
        setProfile(null)
      }

      setIsLoading(false)
    }

    fetchProfile()
  }, [claims, setProfile, setIsLoading])

  return <>{children}</>
}
