import React, { useEffect } from 'react'
import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css"
import { AuthContextProvider, useAuth } from "../context/authContext";
import { MenuProvider } from 'react-native-popup-menu';

// Main layout component for the application
const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    // check if the user is authenticated or not
    if (typeof isAuthenticated === 'undefined') return;
    const inApp = segments[0] === '(app)';
    if (isAuthenticated && !inApp) {
      // Redirect to the home page if authenticated
      router.replace('home');
    } else if (isAuthenticated == false) {
      // Redirect to the sign-in page if not authenticated
      router.replace('signIn');
    }
  }, [isAuthenticated])

  return <Slot />
}
// Root layout component wrapping MainLayout with necessary providers
export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  )
} 