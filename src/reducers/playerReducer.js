import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  players: [],
  captains:[],
  status: 'idle',
  error: null,
  player: {
    id: '',
    teamName: '',
    potName: '',
    wins: 0,
    losses: 0,
    draws: 0,
    lichessRating: '',
    splRating: '',
    name: '',
  },
 chart:[]
};
export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async () => {
  const response = await axios.get('http://localhost:8081/player/getAllPlayers');
  return response.data;
});

export const addPlayer = createAsyncThunk('players/addPlayer', async (player) => {
  const response = await axios.post('http://localhost:8081/player/savePlayer', player);
  return response.data;
});

export const updatePlayer = createAsyncThunk('players/updatePlayer', async (player) => {
  const response = await axios.put(`http://localhost:8081/player/updatePlayer`, player);
  return response.data;
});

export const deletePlayer = createAsyncThunk('players/deletePlayer', async (id) => {
  await axios.delete(`http://localhost:8081/player/deletePlayer?id=${id}`);
  return id;
});

export const fetchPlayerById = createAsyncThunk('player/fetchPlayerById',async(id) => {
  const response = await axios.get(`http://localhost:8081/player/getPlayer?id=${id}`);
  return response.data
})


const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    updatePlayerDetail: (state, action) => {
      console.log("Hey",action.payload)
      const { id, name, splRating, lichessRating } = action.payload;
      const player = state.find((player) => player.id === id);
      if (player) {
        player.name = name;
        player.splRating = splRating;
        player.lichessRating = lichessRating;
      }
    }
    },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("here",action.payload)
        state.players = action.payload.filter(member => member.captain === false)
        state.captains = action.payload.filter(member => member.captain === true)
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        
      })
      .addCase(fetchPlayerById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlayerById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("here",action.payload)
        state.player=action.payload
        const { wins, losses, draws } = action.payload;
      const chartData = [
        { name: 'Wins', value: wins },
        { name: 'Losses', value: losses },
        { name: 'Draws', value: draws ?? 0 }, // use 0 as default value for null draws
      ];
      state.chart = chartData;
      })
      .addCase(fetchPlayerById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        
      })
      .addCase(addPlayer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPlayer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.players.push(action.payload);
      })
      .addCase(addPlayer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updatePlayer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.players.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.players[index] = action.payload;
        }
      })
      .addCase(updatePlayer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deletePlayer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.players = state.players.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePlayer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {updatePlayerDetail} = playerSlice.actions
export default playerSlice.reducer;