import { View, Text, Pressable, ScrollView } from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
// import PropertyCard from "../components/PropertyCard";
import { SlideAnimation, ModalTitle, ModalContent, ModalFooter, BottomModal } from "react-native-modals";
import { FontAwesome, Entypo, FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import PropertyCard from '../components/PropertyCard';
import { data } from '../utils/data';
import { TouchableOpacity } from 'react-native';




const PlacesScreen = () => {
    const route = useRoute()


    const navigation = useNavigation();
    const [modalVisibile, setModalVisibile] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState([]);
     const [loading,setLoading] = useState(false);
      const [items,setItems] = useState([]);
      const searchPlaces = data?.filter((item) => item.place === route.params.place);
      const [sortedData,setSortedData] = useState(searchPlaces);
   
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        title: "Popular Places",
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
         headerLeft: () => <Ionicons name="arrow-back" size={24} color="white" onPress={() => navigation.goBack()} />,
        headerTitleAlign: 'center',
      });
    }, []);


    const filters = [
        {
          id: "0",
          filter: "cost:Low to High",
        },
        {
          id: "1",
          filter: "cost:High to Low",
        },
      ];
     
    //   useEffect(() => {
    //     if (items.length > 0) return;
    
    //     setLoading(true);
    
    //     const fetchProducts = async () => {
    //       const colRef = collection(db,"places");
    //       const docsSnap = await getDocs(colRef);
    //       docsSnap.forEach((doc) => {
    //         items.push(doc.data());
    //       });
    //       setLoading(false);
    //     };
    //     fetchProducts();
    //   }, [items]);
    
    
      const compare = (a,b) => {
        if(a.newPrice > b.newPrice){
          return -1;
        }
        if(a.newPrice < b.newPrice){
          return 1;
        }
        return 0;
      }
    
      const comparison = (a,b) => {
        if(a.newPrice < b.newPrice){
          return -1;
        }
        if(a.newPrice > b.newPrice){
          return 1;
        }
        return 0;
      }
    
      const applyFilter = (filter) => {
        setModalVisibile(false)
        switch(filter){
        case "cost:High to Low":
            searchPlaces.map((val) => val.properties.sort(compare));
            setSortedData(searchPlaces);
            break;
        case "cost:Low to High":
            searchPlaces.map((val) => val.properties.sort(comparison));
            setSortedData(searchPlaces);
            break;
        default: 
            return;
        }
      }
    
  return (
    <View>
        <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          padding: 12,
          backgroundColor: "white",
        }}
      >
        <Pressable
          onPress={() => setModalVisibile(!modalVisibile)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Octicons name="arrow-switch" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Sort
          </Text>
        </Pressable>

        <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="filter" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Filter
          </Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Map",{
          searchResults:searchPlaces,
        })} style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="map-marker-alt" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Map
          </Text>
        </Pressable>
      </Pressable>


      {loading ? (
        <Text styles={{marginTop: 20, textAlign: 'center'}}>Fetching places....</Text>
      ) : (
        <ScrollView style={{ backgroundColor: "#F5F5F5" }}>
        {sortedData
          ?.filter((item) => item.place === route.params.place)
          .map((item) =>
            item.properties.map((property, index) => (
              <PropertyCard
                key={index}
                rooms={route.params.rooms}
                children={route.params.children}
                adults={route.params.adults}
                selectedDates={route.params.selectedDates}
                property={property}
                availableRooms={property.rooms}
              />
            ))
          )}
      </ScrollView>
      )}

    

      <BottomModal
        onBackdropPress={() => {setModalVisibile(false)}}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        footer={
          <ModalFooter>
            <TouchableOpacity
            onPress={() => applyFilter(selectedFilter)}
              style={{
                paddingRight: 10,
                marginLeft: "auto",
                marginRight: "auto",
                marginVertical: 10,
                  marginBottom: 30,
                  backgroundColor: '#2a52be',
                width: '80%',
                height: 40,
                justifyContent: 'center',
                  alignItems: 'center',
                borderRadius: 20,
                
              }}
            >
              <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>Apply</Text>
            </TouchableOpacity>
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Sort and Filter" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => {setModalVisibile(false)}}
        visible={modalVisibile}
        onTouchOutside={() => {setModalVisibile(false)}}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                marginVertical: 10,
                flex: 2,
                height: 280,
                borderRightWidth: 1,
                borderColor: "#E0E0E0",
              }}
            >
              <Text style={{ textAlign: "center" }}>Sort </Text>
            </View>

            <View style={{ flex: 3, margin: 10 }}>
              {filters.map((item, index) => (
                <Pressable
                      onPress={ () => {
                        
                          setSelectedFilter( item.filter );
                      } }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                  key={index}
                >
                    {selectedFilter.includes(item.filter) ? (
                        <FontAwesome name="circle" size={18} color="green" />
                    ) : (
                        <Entypo name="circle" size={18} color="black" />
                    )}
                  
                  <Text
                    style={{ fontSize: 16, fontWeight: "500", marginLeft: 6 }}
                  >
                    {item.filter}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  )
}

export default PlacesScreen