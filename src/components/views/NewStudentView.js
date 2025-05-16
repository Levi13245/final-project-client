import { Button, TextField, Typography, Paper, Container } from '@material-ui/core';
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

const NewStudentView = ({ handleChange, handleSubmit }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Add New Student
        </Typography>
        
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="First Name"
            name="firstname"
            onChange={handleChange}
            fullWidth
            required
          />
          
          <TextField
            label="Last Name"
            name="lastname"
            onChange={handleChange}
            fullWidth
            required
          />
          
          <TextField
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
            fullWidth
            required
          />
          
          <TextField
            label="Image URL"
            name="imageUrl"
            onChange={handleChange}
            fullWidth
          />
          
          <TextField
            label="GPA"
            name="gpa"
            type="number"
            inputProps={{ min: "0.0", max: "4.0", step: "0.1" }}
            onChange={handleChange}
            fullWidth
          />
          
          <TextField
            label="Campus ID"
            name="campusId"
            type="number"
            onChange={handleChange}
            fullWidth
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            fullWidth
          >
            Add Student
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default NewStudentView;