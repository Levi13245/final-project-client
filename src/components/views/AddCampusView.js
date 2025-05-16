/* ===== /src/components/views/AddCampusView.js ===== */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addCampusThunk } from '../../store/thunks';
import { 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const AddCampusView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({
    name: '',
    address: '',
    description: '',
    imageUrl: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await dispatch(addCampusThunk(form));
      history.push('/campuses');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Add New Campus
        </Typography>
        
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
          />
          
          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
            fullWidth
            required
          />
          
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          
          <TextField
            label="Image URL"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            fullWidth
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            fullWidth
          >
            Add Campus
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddCampusView;