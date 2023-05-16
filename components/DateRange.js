import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import DateRangePicker from "react-native-daterange-picker";

const DateRange = () => {

    const [ details, setDetails ] = useState( {
        date: null,
        displayDate: moment()
    } )

    const handleDates = ( dates ) => {
        setDetails({...dates})
        
    }
  return (
    <View style={styles.container}>
    <DateRangePicker
      onChange={(dates) => handleDates(dates)}
     
        
      displayedDate={details.displayDate}
      range
    >
      <Text>Click me!</Text>
    </DateRangePicker>
  </View>
  )
}

export default DateRange


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });