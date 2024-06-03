import { View, Text, Platform } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/authContext';
import {
    Menu,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from './menuItems';
import { Feather } from '@expo/vector-icons';



export default function HeaderHome() {
    const { user, logout } = useAuth();

    const { top } = useSafeAreaInsets();
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <View style={{ paddingTop: Platform.OS === "ios" ? top : top + 10 }} className="flex-row justify-between px-5 bg-neutral-900 pb-6 rounded">
            <View>
                <Text style={{ fontSize: hp(3) }} className="color-neutral-100">Chatto</Text>
            </View>

            <View>
                <Menu>
                    <MenuTrigger>
                        <Image
                            style={{ height: hp(4), aspectRatio: 1, borderRadius: 100 }}
                            source={user?.profileUrl}
                            placeholder={blurhash}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsContainer: {
                                width: wp(36),
                                borderRadius: 10,
                                marginTop: hp(5),
                                marginHorizontal: wp(-5),
                                shadowColor: '#000',
                            }
                        }}
                    >
                        <MenuItem
                            text="Logout"
                            action={logout}
                            value={null}
                            icon= {<Feather name='log-out' size={hp(2.7)} color='grey' />}
                        />
                    </MenuOptions>
                </Menu>

            </View>
        </View>

    )
}