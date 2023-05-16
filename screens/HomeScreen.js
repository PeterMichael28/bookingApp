import { View, Text, ScrollView, Pressable, TextInput, Button } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Feather } from '@expo/vector-icons';
import DatePicker from "react-native-date-ranges";
import { BottomModal, ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals';
import { Image } from 'react-native';
import { Alert } from 'react-native';


const HomeScreen = () => {
  const [selectedDates, setSelectedDates] = useState();
    const navigation = useNavigation()
    const route = useRoute();
  const [rooms, setRooms] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [ modalVisibile, setModalVisibile ] = useState( false );
  

    useLayoutEffect( () => {
        navigation.setOptions( {
            headerShown: true,
            title: 'Bookings.com',
            headerStyle: {
                backgroundColor: '#003580',
                height: 110,
                borderBottomColor: 'transparent',
                shadowColor: 'transparent'
            },
            headerTitleStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center'
            },
            headerTitleAlign: 'center',
            headerRight: () => <Ionicons name="notifications-outline" size={ 24 } color="white" style={ {marginRight: 15,} } />
        })
    }, [])

    const customButton = (onConfirm) => {
      return (
        <Button
          onPress={onConfirm}
          style={{
            container: { width: "80%", marginHorizontal: "3%" },
            text: { fontSize: 20 },
          }}
          primary
          title="Submit"
        />
      );
    };

  const searchPlaces = (place) => {
    if ( !place|| !selectedDates || !rooms || (!adults) ) {
      Alert.alert('Invalid Details', 'Please fill in all details ', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return

    }

    if ( place && selectedDates ) {
      navigation.navigate( 'Places', {
        rooms:rooms,
        adults:adults,
        children:children,
        selectedDates:selectedDates,
        place:route?.params?.input
      })
    }
  }
  return (
    <>
     <View>
      <Header />

      <ScrollView>
              <View style={ { margin: 20, borderColor: '#ffc72c', borderWidth: 3, borderRadius: 6}}>

            {/* destination */}
            <Pressable
              style={ { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10, borderColor: '#ffc72c', borderWidth: 1, paddingVertical: 10 } }
              onPress={() => {navigation.navigate('Search')}}
            >
                <Feather name="search" size={24} color="black" />
                <TextInput placeholder={`'${route?.params ? route?.params.input : 'Enter your destination'} `} placeholderTextColor="black" onFocus={() => {navigation.navigate('Search')}}/>
            </Pressable>

            {/* selected dates */}
            <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10, borderColor: '#ffc72c', borderWidth: 1, paddingVertical: 10}}>
                <Feather name="calendar" size={24} color="black" />
                <DatePicker
                style={{
                  width: 350,
                  height: 30,
                  borderRadius: 0,
                  borderWidth: 0,
                  borderColor: "transparent",
                }}
                customStyles={{
                  placeholderText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                  headerStyle: {
                    backgroundColor: "#003580",
                  },
                  contentText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                }}
                selectedBgColor="#0047AB"
                customButton={(onConfirm) => customButton(onConfirm)}
                onConfirm={(startDate, endDate) =>
                  setSelectedDates(startDate, endDate)
                }
                allowFontScaling={false}
                placeholder={"Select Your Dates"}
                mode={"range"}
              />
            </Pressable>


             {/* guests and rooms */}
            <Pressable
              style={ { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10, borderColor: '#ffc72c', borderWidth: 1, paddingVertical: 10 } }
              onPress={() => setModalVisibile(true)}
            >
             <Ionicons name="person-outline" size={24} color="black" />
              <TextInput
                placeholder={ ` ${ rooms } room • ${ adults } adults • ${ children } Children` }
                placeholderTextColor="red"
                onFocus={() => setModalVisibile(true)}
              />
            </Pressable>


             {/* search buttons */}
             <Pressable style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#2a52be'}} onPress={() => searchPlaces(route?.params?.input)}>
                <Text style={{textAlign: 'center', fontSize: 15, color: 'white', fontWeight: '500'}}>Search</Text>
            </Pressable>
          </View>
          
          <Text
            style={{ marginHorizontal: 20, fontSize: 17, fontWeight: "500" }}
          >
            Travel More spend less
          </Text>

          {/* deals for you */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "#003580",
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                Genius
              </Text>
              <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                You are at genius level one in our loyalty program
              </Text>
            </Pressable>

            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                borderColor: "#E0E0E0",
                borderWidth: 2,
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                15% Discounts
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Complete 5 stays to unlock level 2
              </Text>
            </Pressable>

            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                borderColor: "#E0E0E0",
                borderWidth: 2,
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                10% Discounts
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Enjoy Discounts at participating at properties worldwide
              </Text>
            </Pressable>
          </ScrollView>


{/* image */}
          <Pressable
            style={{
              marginTop: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 200, height: 50, resizeMode: "cover" }}
              source={{
                uri: "https://assets.stickpng.com/thumbs/5a32a821cb9a85480a628f8f.png",
              }}
            />
          </Pressable>
      </ScrollView>
    </View>
    
      {/* bottom modal for selecting numbers of room and guests */}
      <BottomModal
        swipeThreshold={ 200 }
        onBackdropPress={ () => {
         
          setModalVisibile( false );
        } } 
        swipeDirection={ [ 'up', 'down' ] }
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              style={{
                marginBottom: 20,
               
                backgroundColor: "#003580",
              } }
              textStyle={{ color: "#fff", fontSize: 23, fontWeight: '500'}}
              onPress={() => {setModalVisibile(false)}}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select rooms and guests" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => {setModalVisibile(false)}}
        visible={modalVisibile}
        onTouchOutside={() => {setModalVisibile(!modalVisibile)}}
      >
        <ModalContent style={{ width: "100%", height: 210 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Rooms</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => {setRooms(Math.max(1, rooms - 1))}}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {rooms}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {setRooms((c) => c + 1)}}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Adults</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => {setAdults(Math.max(1, adults - 1))}}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {adults}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {setAdults((c) => c + 1)}}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Children</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => {setChildren(Math.max(0, children - 1))}}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {children}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {setChildren((c) => c + 1)}}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
    
  )
    
   
}

export default HomeScreen