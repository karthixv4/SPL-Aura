import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState}  from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer } from '../../reducers/playerReducer';
const PlayerDetails = () => {

    const [formData, setFormData] = useState({
        name: '',
        splRating: '',
        lichessRating: ''
      });
      const dispatch = useDispatch();
    
      const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addPlayer(formData));
        setFormData({ name: '', splRating: '', lichessRating: '' });
      };
    
      const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
  return (
    <div>PlayerDetails
      <form onSubmit={handleSubmit}>
      <TextField
        id="name"
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <TextField
        id="splRating"
        name="splRating"
        label="SPL Rating"
        value={formData.splRating}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <TextField
        id="lichessRating"
        name="lichessRating"
        label="Lichess Rating"
        value={formData.lichessRating}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
    </div>
  )
}

export default PlayerDetails