import { StyleSheet, Text, View ,SafeAreaView,KeyboardAvoidingView,Pressable,TextInput, Alert, ActivityIndicator} from 'react-native'
import React ,{useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { setDoc,doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const RegisterScreen = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)


    const register = async () => {
        if(email === "" || password === "" || phone === "" ) {
            
                Toast.show({
                    type: 'error',
                    text1: `All fields are required`,
                  })
        
                  return
        }

        setLoading(true)
        try {
           await createUserWithEmailAndPassword(auth,email,password).then((userCredentials) => {
           
                const user = userCredentials._tokenResponse.email;
                const uid = auth.currentUser.uid;
    
                 setDoc(doc(db,"users",`${uid}`),{
                     email:user,
                     phone:phone
                 })
           } ).then( () => {
               Toast.show( {
                type: 'success',
                text1: 'Registration Successful!!!',
               } )

               setLoading(false)
           } )
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: `${error}`,
              })

              setLoading(false)
        }
       
    }
  return (
    <SafeAreaView  style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}>
    <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ color: "#003580", fontSize: 17, fontWeight: "700" }}>
            Register
          </Text>

          <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>
           Create an Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="enter your email id"
              placeholderTextColor={"gray"}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor={"gray"}
              style={{
                fontSize: password ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Phone
            </Text>

            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="enter your Phone No"
              keyboardType="number-pad"
              placeholderTextColor={"gray"}
              style={{
                fontSize: password ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>
        </View>

        <Pressable
        onPress={register}
          style={{
            width: 200,
            backgroundColor: "#003580",
            padding: 15,
            borderRadius: 7,
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text style={{textAlign:"center",color:"white",fontSize:17,fontWeight:"bold", justifyContent: 'center', alignItems: 'center'}}>{loading ? <ActivityIndicator color='#fff' size={20}/> : 'Register'}</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} style={{marginTop:20}}>
            <Text style={{textAlign:"center",color:"gray",fontSize:17}}>Already have an account? Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})