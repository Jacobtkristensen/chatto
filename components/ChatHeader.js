import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

export default function ChatHeader({ user, router}) {
  return (
    <Stack.Screen
      options={{
        title: '',
        headerLeft: () => (
          <View className="flex-row items-center gap-4">
            <Pressable onPress={() => router.back()}>
              <FontAwesome6 name="chevron-left" size={hp(3)} color="grey" />
            </Pressable>
            <View className="flex-row items-center gap-3">
              <Image 
                source={user?.profileUrl}
                style={{height: hp(4.5), aspectRatio: 1, borderRadius: 100}}
              />
              <Text style={{fontSize: hp(2.5)}} className="font-semibold text-neutral-800">{user?.username}</Text>
              </View>
            </View>
        ),
        headerRight: () => (
          <View className="flex-row items-center gap-4 bg">
          <Ionicons name="call-outline" size={24} color="black" />
          <Ionicons name="videocam-outline" size={24} color="black" />          
          </View>
          
        )
      }}
    />
  )
}