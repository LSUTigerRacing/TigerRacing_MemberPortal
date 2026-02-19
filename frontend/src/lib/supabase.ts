import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

function setCookie(name: string, value: string, days: number = 7): void {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
  console.log(`Cookie created with name: ${name}`)
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`
}

const cookieStorage = {
  getItem: (key: string): string | null => {
    console.log('Getting cookie', key)
    return getCookie(key)
  },
  setItem: (key: string, value: string): void => {
    console.log('Setting cookie', key, value.substring(0, 50) + '...')
    setCookie(key, value, 7) // Store for 7 days
  },
  removeItem: (key: string): void => {
    console.log('Removing cookie', key)
    deleteCookie(key)
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: cookieStorage
  }
})

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
  }
  deleteCookie('sb-access-token')
  deleteCookie('sb-refresh-token')
  deleteCookie('sb-user')
  window.location.href = '/'
}