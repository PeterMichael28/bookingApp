import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  booking: [],
  liked: []
}

const BookingSlice = createSlice({
  name: 'booking',
  initialState,
    reducers: {
      savedPlaces:(state,action) => {
        state.booking.push({...action.payload})
      },
      

      likedPlaces: ( state, action ) => {
        
        // rooms={route.params.rooms}
        // children={route.params.children}
        // adults={route.params.adults}
        // selectedDates={route.params.selectedDates}
        // property={property}
        // availableRooms={property.rooms}
        const {rooms, children, adults, selectedDates, property} = action.payload

        const allLikes = state.liked
        const existingLiked = allLikes.filter((like) => like.property.name === property.name)

        if ( existingLiked.length > 0 ) {
          const filteredLikes = allLikes.filter(like => like.property.name !== property.name)
          state.liked = filteredLikes
        } else {
          state.liked.push( {
            rooms, children, adults, selectedDates, property
          })
        }
      }

  }
});

export const {savedPlaces} = BookingSlice.actions

export default BookingSlice.reducer

export const selectBooking = (state) => state.booking.booking


