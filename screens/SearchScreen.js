import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import { Feather } from "@expo/vector-icons";
import SearchResults from '../components/SearchResults';
import { data } from '../utils/data';


const SearchScreen = () => {
    const [input,setInput] = useState("");
  return (
    <SafeAreaView>
       <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor:"#FFC72C",
          borderWidth:4,
          borderRadius:10
        }}
      >
        <TextInput value={input} onChangeText={(text) => setInput(text)} placeholder="Enter Your Destination" styles={{width: '100%'}}/>
        <Feather name="search" size={22} color="black" />
      </View>

      <SearchResults data={data} input={input} setInput={setInput}/>
    </SafeAreaView>
  )
}

export default SearchScreen