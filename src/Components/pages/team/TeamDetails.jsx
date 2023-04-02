import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTeamById,SetMembers,addMembers,addPlayersToTeam } from '../../../reducers/teamReducer';
import { fetchPlayers } from '../../../reducers/playerReducer';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';

const TeamDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    var team = useSelector((state) => state.teamDetails.team)
    var members = useSelector((state)=>state.teamDetails.members)
    var players = useSelector((state) => state.playerDetails.players)
    useEffect(()=>{
        dispatch(fetchTeamById(id));
        dispatch(fetchPlayers())
    },[id])

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPlayersToTeam(id,members))
        handleClose();
      };
  return (
    <>
 <Paper elevation={3}>
      <Typography variant="h4">{team.name}</Typography>
      <Typography variant="subtitle1">{team.venue}</Typography>
      <Typography variant="subtitle2">Captain: {team.captain.name}</Typography>
      <Typography variant="body1">Matches played: {team.matchesPlayed}</Typography>
      <Typography variant="body1">Wins: {team.wins}</Typography>
      <Typography variant="body1">Draws: {team.draws}</Typography>
      <Typography variant="body1">Losses: {team.losses}</Typography>
      <Typography variant="body1">Team points: {team.teamPoints}</Typography>
      <Typography variant="body1">Points gained: {team.pointsGained}</Typography>
      <Typography variant="body1">Points lost: {team.pointsLost}</Typography>
      <Typography variant="body1">Penalty: {team.penalty ? team.penalty : 'None'}</Typography>
    </Paper>
    <Button onClick={handleOpen} variant="contained" color="primary">
        Add Players
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Team</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <br />
          <FormControl fullWidth>
            <InputLabel id="team-members-label">Team Members</InputLabel>
            <Select
              labelId="team-members-label"
              id="team-members"
              multiple
              value={members}
              onChange={(e) => dispatch(addMembers(e.target.value))}
              input={<Input />}
              renderValue={(selected) => (
                <div>
                  {players
                    .filter((member) => selected.includes(member.id))
                    .map((member) => member.name)
                    .join(', ')}
                </div>
              )}
            >
              {players.map((member) => (
                <MenuItem key={member.id} value={member.id}>
                  <Checkbox checked={team.members.indexOf(member.id) > -1} />
                  <ListItemText primary={member.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
    </>
  )
}

export default TeamDetails