import {
    MenuOption,
} from 'react-native-popup-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';


export const MenuItem = ({text, action, value, icon}) =>{
    return (
        <MenuOption onSelect={() => action(value)}>
            <View className="flex-row items-center px-4 py-1 justify-between rounded-lg">
            <Text>Logout</Text>
            <Feather name='log-out' size={hp(2.7)} color='grey' />
            </View>
        </MenuOption>
    )
}