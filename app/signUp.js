import { View, Text, Image, TextInput, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons, Entypo, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import KeyboardView from '../components/keyboardView';
import { useAuth } from '../context/authContext';

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileUrlRef = useRef("");

  const handleSignup = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileUrlRef.current) {
      Alert.alert('Sign Up', "Dont leave empty fields");
      return;
    }
    setLoading(true);

    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileUrlRef.current);
    setLoading(false);

    console.log('response :', response);
    if (!response.success) {
      Alert.alert('Sign Up', response.msg);  
    }

    // login process
  }
  const goToSignIn = () => {
    router.push('signIn');
  }

  return (
    <KeyboardView>
    <View className="flex-1">
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-10 ">
        <View className="items-center gap-10">
          <Entypo name="chat" size={50} color="black" />
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Welcome to Chatto! Talk is cheap, but our chats are priceless.
          </Text>
        </View>


        <View className="gap-10">
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800">Sign Up</Text>

          <View className="gap-4">
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 items-center rounded-2xl bg-neutral-200 ">
              <Feather name="user" size={hp(2.7)} color="grey" />
              <TextInput
                onChangeText={value => usernameRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Username'
                placeholderTextColor={'grey'}
              />
            </View>
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 items-center rounded-2xl bg-neutral-200 ">
              <Octicons name="mail" size={hp(2.7)} color="grey" />
              <TextInput
                onChangeText={value => emailRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Email address'
                placeholderTextColor={'grey'}
              />
            </View>
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 items-center rounded-2xl bg-neutral-200 ">
              <Octicons name="key" size={hp(2.7)} color="grey" />
              <TextInput
                onChangeText={value => passwordRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Password'
                secureTextEntry
                placeholderTextColor={'grey'}
              />
            </View>
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 items-center rounded-2xl bg-neutral-200 ">
              <AntDesign name="picture" size={hp(2.7)} color="grey" />
              <TextInput
                onChangeText={value => profileUrlRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Profile picture URL'
                placeholderTextColor={'grey'}
              />
            </View>
            
            {/* Signup Button */}

            <View>
              {
                loading ? (
                    <View className="flex-row justify-center"> 
                    <Loading size={hp(8)} />
                    </View>
                ): (
                    <Pressable onPress = { handleSignup } style = {{ height: hp(6.5) }} className="bg-neutral-800 rounded-2xl justify-center items-center">
              <Text style={{ fontSize: hp(2.7) }} className="font-semibold text-neutral-100">Sign up!</Text>
            </Pressable>
            )
              }
          </View>


          {/* Link to signup */}
          <View className="flex-row justify-center">
            <Text style={{ fontSize: hp(2) }} className="text-neutral-800">Already have an account?</Text>
            <Pressable onPress={goToSignIn}>
              <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-800"> Sign in</Text>
            </Pressable>
          </View>

        </View>

      </View>
    </View>
    </View >
    </KeyboardView>
  )
}