import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../css/Home.css';
import { fetchPlayers,deletePlayer,updatePlayer } from "../../reducers/playerReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState}  from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

const Home = () => {
  const dispatch = useDispatch();
  var datas = useSelector((state) => state.playerDetails.players)
  useEffect(() => {
    dispatch(fetchPlayers())
  }, []);

  const [data, setData] = useState(datas);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);


  const handleDeleteClickOpen = (row) => {
    setSelectedRow(row);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleUpdateClickOpen = (row) => {
    setSelectedRow(row);
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const handleDeleteConfirm = () => {
    dispatch(deletePlayer(selectedRow.id))
    setOpenDelete(false);
  };

  const handleUpdateConfirm = () => {
    dispatch(updatePlayer(selectedRow)); 
    setOpenUpdate(false);
  };

  return (

    <div className="centered-div">
      <h1 className="text-center">SPL 24</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">SPL Rating</TableCell>
              <TableCell align="right">Lichess Rating</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((row) => (
              <TableRow key={row.id.timestamp}>
                <TableCell component="th" scope="row">
                  {row.id.date}
                </TableCell>
                <TableCell align="right">{row.name || '-'}</TableCell>
                <TableCell align="right">{row.splRating || '-'}</TableCell>
                <TableCell align="right">{row.lichessRating || '-'}</TableCell>
                <TableCell align="right">
                  <Button color="primary" onClick={() => handleUpdateClickOpen(row)}>Update</Button>
                  <Button color="secondary" onClick={() => handleDeleteClickOpen(row)}>Delete</Button>
                  <Button component={Link} to={`/details/${row.id}`} variant="contained" color="primary">
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

        {/* Update record dialog */}
        <Dialog
          open={openUpdate}
          onClose={handleUpdateClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Record</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              value={selectedRow?.name || ""}
              onChange={(e) => setSelectedRow({...selectedRow, name: e.target.value})}
              fullWidth
            />
            <TextField
              margin="dense"
              id="splRating"
              label="SPL Rating"
              type="number"
              value={selectedRow?.splRating || ""}
              onChange={(e) => setSelectedRow({...selectedRow, splRating: e.target.value})}
              fullWidth
            />
            <TextField
              margin="dense"
              id="lichessRating"
              label="Lichess Rating"
              type="number"
              value={selectedRow?.lichessRating || ""}
              onChange={(e) => setSelectedRow({...selectedRow, lichessRating: e.target.value})}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdateConfirm} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>

    </div>

  )
};

export default Home