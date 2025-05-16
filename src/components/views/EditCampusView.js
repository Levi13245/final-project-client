/* ===== /src/components/views/EditCampusView.js ===== */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';
import { 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container,
  CircularProgress
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

const EditCampusView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { campusId } = useParams();
  const campus = useSelector(state => state.campus);
  const [form, setForm] = useState({
    name: '',
    address: '',
    description: '',
    imageUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampus = async () => {
      await dispatch(fetchCampusThunk(campusId));
      setLoading(false);
    };
    loadCampus();
  }, [dispatch, campusId]);

  useEffect(() => {
    if (campus.id) {
      setForm({
        name: campus.name,
        address: campus.address,
        description: campus.description || '',
        imageUrl: campus.imageUrl || ''
      });
    }
  }, [campus]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await dispatch(editCampusThunk({ ...form, id: campusId }));
      history.push(`/campus/${campusId}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" style={{ textAlign: 'center', padding: '40px' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Edit Campus
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
            Save Changes
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditCampusView;