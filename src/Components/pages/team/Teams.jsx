import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { fetchTeams,deleteTeam } from '../../../reducers/teamReducer';
import { fetchPlayers } from '../../../reducers/playerReducer';
import { useDispatch, useSelector } from "react-redux";
import { useState}  from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
import Select from '@mui/material/Select';

const Teams = () => {
  const dispatch = useDispatch();
  var datas = useSelector((state) => state.teamDetails.teams)
  var players = useSelector((state) => state.playerDetails.players)
  var captains = useSelector((state) => state.playerDetails.captains)

  useEffect(() => {
    dispatch(fetchTeams())
    dispatch(fetchPlayers())
  }, []);

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [captain, setCaptain] = useState('');
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const handleDeleteClickOpen = (row) => {
    setSelectedRow(row);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteTeam(selectedRow.id))
    setOpenDelete(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Here you can submit the form data to your API endpoint to save the new team
    console.log({
      teamName,
      captain,
      selectedMembers,
    });
    setOpen(false);
  };

  const handleMemberSelect = event => {
    setSelectedMembers(event.target.value);
  };


  return (

    <div className="centered-div">
      <h1 className="text-center">SPL 24 Teams</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Team
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Team Name</TableCell>
              <TableCell align="right">Team Captain</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id.date}
                </TableCell>
                <TableCell align="right">{row.name || '-'}</TableCell>
                <TableCell align="right">{row.captain || '-'}</TableCell>
                <TableCell align="right">
                  <Button color="secondary" onClick={() => handleDeleteClickOpen(row)}>Delete</Button>
                  <Button component={Link} to={`/team/details/${row.id}`} variant="contained" color="primary">
  View
</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Delete confirmation dialog */}
        <Dialog
          open={openDelete}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Team</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Team Name</InputLabel>
            <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Captain</InputLabel>
            <Select value={captain} onChange={e => setCaptain(e.target.value)}>
              {captains.map(captain => (
                <MenuItem key={captain.id} value={captain.id}>
                  {captain.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Members</InputLabel>
            <Select
              multiple
              value={selectedMembers}
              onChange={handleMemberSelect}
              renderValue={selected => selected.join(', ')}
            >
              {players.map(member => (
                <MenuItem key={member.id} value={member.id}>
                  <Checkbox checked={selectedMembers.indexOf(member.id) > -1} />
                  <ListItemText primary={member.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      </TableContainer>

    </div>

  )
};

export default Teams