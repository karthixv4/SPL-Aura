import React from 'react'
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchPlayerById } from "../../reducers/playerReducer";
import { useParams } from 'react-router-dom';

  const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];
const DetailedPlayer = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    var datas = useSelector((state) => state.playerDetails.player);
    var chart = useSelector((state) => state.playerDetails.chart)
    useEffect(()=>{
        dispatch(fetchPlayerById(id));
    },[id])
  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h5" component="h2">
        {datas.name}
      </Typography>
      <Typography color="textSecondary">{`Lichess Rating: ${datas.lichessRating}`}</Typography>
      <Typography color="textSecondary">{`SPL Rating: ${datas.splRating}`}</Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Paper elevation={3}>
        <Typography variant="h6" component="h3" align="center">
          Wins/Losses/Draws
        </Typography>
        <PieChart width={400} height={300}>
          <Pie
            data={chart}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {chart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Paper elevation={3}>
        <Typography variant="h6" component="h3" align="center">
          Stats
        </Typography>
        <Typography>{`Wins: ${datas.wins}`}</Typography>
        <Typography>{`Losses: ${datas.losses}`}</Typography>
        <Typography>{`Draws: ${datas.draws}`}</Typography>
      </Paper>
    </Grid>
  </Grid>
  )
}

export default DetailedPlayer