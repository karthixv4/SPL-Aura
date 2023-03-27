import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    teams:[],
    team:{
        name:'',captain:'',members:[],totalMatches:0,wins:0,draws:0,losses:0,teamPoints:0,pointsGained:0,
        pointsLost:0
    },
    captains:[],
    results:[],
    points:[]
}

export const fetchTeams = createAsyncThunk('Teams/fetchTeams', async () => {
    const response = await axios.get('http://localhost:8081/team/getAllTeams');
    return response.data;
  });
  
  export const addTeam = createAsyncThunk('Teams/addTeam', async (team) => {
    const response = await axios.post('http://localhost:8081/team/saveTeam', team);
    return response.data;
  });
  
  export const updateTeam = createAsyncThunk('Teams/updateTeam', async (team) => {
    const response = await axios.put(`http://localhost:8081/team/updateTeam`, team);
    return response.data;
  });
  
  export const deleteTeam = createAsyncThunk('Teams/deleteTeam', async (id) => {
    await axios.delete(`http://localhost:8081/team/deleteTeam?id=${id}`);
    return id;
  });
  
  export const fetchTeamById = createAsyncThunk('Team/fetchTeamById',async(id) => {
    const response = await axios.get(`http://localhost:8081/Team/getTeam?id=${id}`);
    return response.data
  })

  const teamSlice = createSlice({
    name:'teams',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(fetchTeams.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(fetchTeams.fulfilled, (state, action) => {
            state.loading = false;
            state.teams = action.payload;
          })
        .addCase(fetchTeams.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        .addCase(addTeam.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(addTeam.fulfilled, (state, action) => {
            state.loading = false;
            state.teams.push(action.payload);
          })
        .addCase(addTeam.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        .addCase(updateTeam.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(updateTeam.fulfilled, (state, action) => {
            state.loading = false;
            const updatedTeam = action.payload;
            const index = state.teams.findIndex(team => team.id === updatedTeam.id);
            if (index !== -1) {
              state.teams[index] = updatedTeam;
            }
          })
        .addCase(updateTeam.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        .addCase(deleteTeam.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(deleteTeam.fulfilled, (state, action) => {
            state.loading = false;
            const deletedTeamId = action.payload;
            state.teams = state.teams.filter(team => team.id !== deletedTeamId);
          })
        .addCase(deleteTeam.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        .addCase(fetchTeamById.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(fetchTeamById.fulfilled, (state, action) => {
            state.loading = false;
            state.team = action.payload;
            const { wins, losses, draws } = action.payload;
            const chartData = [
                { name: 'Wins', value: wins ?? 0 },
                { name: 'Losses', value: losses ?? 0 },
                { name: 'Draws', value: draws ?? 0 }, // use 0 as default value for null draws
              ];
            state.results = chartData
            const { teamPoints,pointsGained,pointsLost } = action.payload;
            const statsData = [
                { name: 'Team Points', value: teamPoints ?? 0 },
                { name: 'Points Gained', value: pointsGained ?? 0 },
                { name: 'Points Lost', value: pointsLost ?? 0 }, // use 0 as default value for null draws
              ];
            state.points = statsData
          })
        .addCase(fetchTeamById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })


    }
  })

  export default teamSlice.reducer