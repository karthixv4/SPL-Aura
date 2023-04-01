import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { fetchTeams,deleteTeam,addTeam,SetCaptain,SetMembers,SetName } from '../../../reducers/teamReducer';
import { fetchPlayers } from '../../../reducers/playerReducer';
import { useDispatch, useSelector } from "react-redux";
import { useState}  from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


const Teams = () => {
  const dispatch = useDispatch();
  var teams = useSelector((state) => state.teamDetails.teams)
  var team = useSelector((state) => state.teamDetails.team)
  var players = useSelector((state) => state.playerDetails.players)
  var captains = useSelector((state) => state.playerDetails.captains)

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(fetchTeams())
    dispatch(fetchPlayers())
  }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(addTeam(team))
      handleClose();
    };
  return (

    <>
     <Button onClick={handleOpen} variant="contained" color="primary">
        Add Team
      </Button>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team Name</TableCell>
            <TableCell>Captain Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.captain.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Team</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Team name"
            value={team.name}
            onChange={(e) => dispatch(SetName(e.target.value))}
          />
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="team-captain-label">Team captain</InputLabel>
            <Select
              labelId="team-captain-label"
              id="team-captain"
              value={team.captain.name}
              onChange={(e) => dispatch(SetCaptain(e.target.value))}
            >
              {captains.map((captain) => (
                <MenuItem key={captain.id} value={captain.id}>
                  {captain.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="team-members-label">Team Members</InputLabel>
            <Select
              labelId="team-members-label"
              id="team-members"
              multiple
              value={team.members}
              onChange={(e) => dispatch(SetMembers(e.target.value))}
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
};

export default Teams