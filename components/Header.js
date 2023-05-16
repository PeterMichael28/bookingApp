import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



const Header = () => {
  return (
    <View style={{backgroundColor: '#003580', height:65, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 10}}>


     <Pressable style={{flexDirection: 'row', alignItems: 'center', borderColor: 'white', borderWidth: 1, borderRadius: 25, padding: 6}}>
     <Ionicons name="bed-outline" size={24} color="white" />
     <Text style={{marginLeft: 5, fontWeight: 'bold', color: 'white', fontSize: 15}}>Stays</Text>
     </Pressable>


     <Pressable style={{flexDirection: 'row', alignItems: 'center', borderColor: 'white'}}>
     <Ionicons name="ios-airplane-outline" size={24} color="white" />
     <Text style={{marginLeft: 5, fontWeight: 'bold', color: 'white', fontSize: 15}}>Flight</Text>
     </Pressable>

     <Pressable style={{flexDirection: 'row', alignItems: 'center', borderColor: 'white'}}>
     <Ionicons name="car-outline" size={24} color="white" />
     <Text style={{marginLeft: 5, fontWeight: 'bold', color: 'white', fontSize: 15}}>Car Rental</Text>
     </Pressable>

     <Pressable style={{flexDirection: 'row', alignItems: 'center', borderColor: 'white'}}>
     <FontAwesome5 name="uber" size={24} color="white" />
     <Text style={{marginLeft: 5, fontWeight: 'bold', color: 'white', fontSize: 18}}>Taxi</Text>
     </Pressable>
    </View>
  )
}

export default Header