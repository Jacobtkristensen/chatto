import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatList from '../../components/ChatList';
import Loading from '../../components/Loading';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../util/firebase';

export default function Home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    getUsers();
  }, [])
  
  const getUsers = async () => {
    // hent alle users udover den bruger der er logget ind
    const q = query(usersRef, where('userId', '!=', user?.uid));

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({...doc.data()});
    });

    setUsers(data);
  }
  
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      { 
        users.length > 0 ? (
          <ChatList users={users} />
        ) : (
          <View className="flex items-center" style={{ top: hp(30) }}>
            {/* <Loading /> */}
          </View>
        )
      }
    </View>
  );
}