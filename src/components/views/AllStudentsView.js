import { Link } from "react-router-dom";
import { Button, Typography, Card, CardContent, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
}));

const AllStudentsView = ({ students, deleteStudent }) => {
  const classes = useStyles();

  if (!students.length) {
    return (
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>All Students</Typography>
        <Typography>There are no students.</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/newstudent"
          style={{ marginTop: 20 }}
        >
          Add New Student
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>All Students</Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to="/newstudent"
        style={{ marginBottom: 20 }}
      >
        Add New Student
      </Button>

      <Grid container spacing={3}>
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student.id}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component={Link} to={`/student/${student.id}`}>
                  {student.firstname} {student.lastname}
                </Typography>
                <Typography>Email: {student.email}</Typography>
                <Typography>GPA: {student.gpa || 'N/A'}</Typography>
                <Typography>
                  Campus: {student.campus ? student.campus.name : 'Not enrolled'}
                </Typography>
                <div style={{ marginTop: 10 }}>
                  <Button 
                    size="small" 
                    color="secondary"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllStudentsView;