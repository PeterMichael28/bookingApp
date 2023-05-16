import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { services } from "../utils/data";

const Amenities = () => {
  
  return (
    <View style={{ padding: 10, marginBottom: 80 }}>
      <Text style={{ fontSize: 17, fontWeight: "600" }}>
        Most Popular Facilities
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}
      >
        {services.map((item, index) => (
          <View
            style={{
              margin: 10,
              backgroundColor: "#007FFF",
              paddingHorizontal: 11,
              paddingVertical: 5,
              borderRadius: 25,
            }}
            key={index}
          >
            <Text style={{textAlign:"center",color:"white"}}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Amenities;

const styles = StyleSheet.create({});