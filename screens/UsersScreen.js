import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
  } from "react-native";
  import React, { useEffect, useLayoutEffect, useState } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import Toast from 'react-native-toast-message';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

  const UserScreen = () => {
    const navigation = useNavigation();
      const route = useRoute();
      
  const uid = auth.currentUser.uid


      if ( !uid ) {
      navigation.replace('Main')
  }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        title: "User Details",
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
        },
        headerStyle: {
          backgroundColor: "#003580",
          height: 110,
          borderBottomColor: "transparent",
          shadowColor: "transparent",
        },
      });
    }, [] );

    const [data, setData] = useState({})
    const [data2, setData2] = useState({})

    
    useEffect(() => {
        const fetchData = async () => {
            const docRef = await doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                setData(docSnap.data())
              } else {
                // doc.data() will be undefined in this case
                // console.log("No such document!");
                setData(undefined)
              }
            // console.log(docSnap)
        }
        fetchData()
    }, [uid])


      
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState('');
      const [ phoneNo, setPhoneNo ] = useState( '');
      
      useEffect( () => {
        if ( data?.email ) {
          setEmail(data.email)
      }


   if ( data?.phone ) {
          setPhoneNo(data.phone)
        }
    }, [data] )
    


    const finalStep = () => {
      if (!firstName || !lastName || !email || !phoneNo) {
         Toast.show({
                type: 'error',
                text1: `All Fields are Required!`,
              })
      }
      if (firstName && lastName && email && phoneNo) {
        navigation.navigate("Confirmation", {
          oldPrice: route.params.oldPrice,
          newPrice: route.params.newPrice,
          name: route.params.name,
          children: route.params.children,
          adults: route.params.adults,
          rating: route.params.rating,
          startDate: route.params.startDate,
          endDate: route.params.endDate,
        });
      }
    };
    return (
      <>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "column", gap: 10 }}>
            <Text>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              style={{ padding: 10, borderColor: "gray", borderWidth: 1 }}
            />
          </View>
  
          <View style={{ flexDirection: "column", gap: 10, marginTop: 10 }}>
            <Text>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              style={{ padding: 10, borderColor: "gray", borderWidth: 1 }}
            />
          </View>
  
          <View style={{ flexDirection: "column", gap: 10, marginTop: 10 }}>
            <Text>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ padding: 10, borderColor: "gray", borderWidth: 1 }}
            />
          </View>
  
          <View style={{ flexDirection: "column", gap: 10, marginTop: 10 }}>
            <Text>Phone no</Text>
            <TextInput
              value={phoneNo}
              onChangeText={(text) => setPhoneNo(text)}
              style={{ padding: 10, borderColor: "gray", borderWidth: 1 }}
              keyboardType="number-pad"
            />
          </View>
        </View>
  
        <Pressable
          style={{
            backgroundColor: "white",
            marginTop: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
            padding: 10,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
  
                marginTop: 4,
                gap: 8,
              }}
            >
              <Text
                style={{
                  color: "red",
                  fontSize: 20,
                  textDecorationLine: "line-through",
                }}
              >
                {route.params.oldPrice * route.params.adults}
              </Text>
              <Text style={{ fontSize: 20 }}>
                Rs {route.params.newPrice * route.params.adults}
              </Text>
            </View>
            <Text>
              You Saved {route.params.oldPrice - route.params.newPrice} rupees
            </Text>
          </View>
          <Pressable
            onPress={finalStep}
            style={{ backgroundColor: "#007FFF", padding: 10, borderRadius: 5 }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 15 }}>
              Final Step
            </Text>
          </Pressable>
        </Pressable>
      </>
    );
  };
  
  export default UserScreen;
  
  const styles = StyleSheet.create({});