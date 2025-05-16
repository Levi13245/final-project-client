import React from 'react';
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

const EditCampusView = ({ campus, handleChange, handleSubmit }) => {
  const classes = useStyles();

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
            value={campus.name}
            onChange={handleChange}
            fullWidth
            required
          />
          
          <TextField
            label="Address"
            name="address"
            value={campus.address}
            onChange={handleChange}
            fullWidth
            required
          />
          
          <TextField
            label="Description"
            name="description"
            value={campus.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          
          <TextField
            label="Image URL"
            name="imageUrl"
            value={campus.imageUrl}
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