import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {apiGet} from '../../services/apiRequests'
import {GET_MEMORY_GAMES} from '../../constants/urls'

// Async thunk action creator
export const getMemoryGames = createAsyncThunk('memoryGame/getMemoryGames', async () => {
    try {
      const response = await apiGet(GET_MEMORY_GAMES);
      return response.data;
    } catch (error) {
      // Handle any errors that occurred during the API request
      throw Error({msg:'Failed to fetch memory games',error});
    }
  });

const initialState = {
    data:null,
    loading:false,
    error:null
}


const memoryGameSlice = createSlice({
    initialState,
    name:"memoryGame",
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getMemoryGames.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getMemoryGames.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(getMemoryGames.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    }
})

export const {} = memoryGameSlice.actions;
export default memoryGameSlice.reducer;