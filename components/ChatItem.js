import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Image } from 'expo-image'

export default function ChatItem({item, router}) {

    const openChat = () => {
        router.push({pathname: '/chat', params: item})
    }

    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
    <Pressable onPress={openChat} className="flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 border-b border-neutral-200">
        
        <Image
            style={{height: hp(6), aspectRatio: 1, borderRadius: 100}} 
            source={item?.profileUrl}
            placeholder={blurhash}
            transition={500}
            />
        <View className="flex-1 gap-1">
            <View className="flex-row justify-between">
                <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-800">{item.username}</Text>
                <Text style={{fontSize: hp(1.8)}} className="font-medium text-neutral-500">Time</Text>
            </View>
            <Text style={{fontSize: hp(1.6)}} className="text-neutral-500">Last message</Text>
        </View>
    </Pressable>
  )
}