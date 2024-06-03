import { View, Text, Image, TextInput, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import KeyboardView from '../components/keyboardView';
import { useAuth } from '../context/authContext';
import { set } from 'firebase/database';


export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
 
  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Login', "Don't leave empty fields");
      return;
    }
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (!response.success) {
      Alert.alert('Login', response.msg);
    }
    
  };

  const goToSignUp = () => {
    router.push('signUp');
  };

  return (
    <KeyboardView>
    <View className="flex-1">
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        <View className="items-center gap-10">
          <Entypo name="chat" size={50} color="black" />
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Welcome to Chatto! Talk is cheap, but our chats are priceless.
          </Text>
        </View>

        <View className="gap-10">
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800">Sign in</Text>

          <View className="gap-4">
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 items-center rounded-2xl bg-neutral-200">
              <Octicons name="mail" size={hp(2.7)} color="grey" />
              <TextInput
                onChangeText={value => emailRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Email address'
                placeholderTextColor={'grey'}
              />
            </View>
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 items-center rounded-2xl bg-neutral-200">
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

            {/* Login Button & Lottie loading animation*/}
            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(8)} />
                </View>
              ) : (
                <Pressable onPress={handleLogin} style={{ height: hp(6.5) }} className="bg-neutral-800 rounded-2xl justify-center items-center">
                  <Text style={{ fontSize: hp(2.7) }} className="font-semibold text-neutral-100">Login</Text>
                </Pressable>
              )}
            </View>

            {/* Link to signup */}
            <View className="flex-row justify-center">
              <Text style={{ fontSize: hp(2) }} className="text-neutral-800">Don't have an account?</Text>
              <Pressable onPress={goToSignUp}>
                <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-800"> Sign up</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
    </KeyboardView>
  );
}
