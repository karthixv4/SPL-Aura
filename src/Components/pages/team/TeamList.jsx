import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { fetchTeams,deleteTeam,addTeam,SetCaptain,SetMembers,SetName,SetVenue } from '../../../reducers/teamReducer';
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


const TeamList = () => {
  const dispatch = useDispatch();
  var teams = useSelector((state) => state.teamDetails.teams)
  var team = useSelector((state) => state.teamDetails.team)
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
            <TableCell>Home</TableCell>
            <TableCell>Captain Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.venue}</TableCell>
              <TableCell>{row.captain.name}</TableCell>
              <Button component={Link} to={`/team/details/${row.id}`} variant="contained" color="primary">
  View
</Button>
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
          <TextField
            label="Team Venue"
            value={team.venue}
            onChange={(e) => dispatch(SetVenue(e.target.value))}
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

export default TeamList