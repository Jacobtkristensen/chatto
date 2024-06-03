import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import HeaderHome from '../../components/HeaderHome'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen 
      name="home" 
      options={{
        header: () => <HeaderHome />
      }}
      />

    </Stack>
  )
}