/* ===== /src/components/views/CampusView.js ===== */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { 
  Button, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Divider 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  campusImage: {
    width: '100%',
    height: 300,
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
  },
  studentCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const CampusView = ({ campus, deleteCampus, deleteStudent }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={campus.imageUrl || '/default-campus.jpg'}
            alt={campus.name}
            className={classes.campusImage}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            {campus.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Address: {campus.address}
          </Typography>
          <Typography paragraph>
            {campus.description || 'No description available.'}
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            component={Link}
            to={`/campus/${campus.id}/edit`}
            style={{ marginRight: 16 }}
          >
            Edit Campus
          </Button>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={() => deleteCampus(campus.id)}
          >
            Delete Campus
          </Button>
        </Grid>
      </Grid>

      <Divider style={{ margin: '40px 0' }} />

      <Typography variant="h4" gutterBottom>
        Enrolled Students
      </Typography>
      
      {campus.students.length === 0 ? (
        <div>
          <Typography paragraph>No students currently enrolled.</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link}
            to={`/students/new?campusId=${campus.id}`}
          >
            Enroll New Student
          </Button>
        </div>
      ) : (
        <div>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link}
            to={`/students/new?campusId=${campus.id}`}
            style={{ marginBottom: 20 }}
          >
            Enroll New Student
          </Button>
          
          <Grid container spacing={3}>
            {campus.students.map(student => (
              <Grid item key={student.id} xs={12} sm={6} md={4}>
                <Card className={classes.studentCard}>
                  <img
                    src={student.imageUrl || '/default-student.jpg'}
                    alt={`${student.firstname} ${student.lastname}`}
                    style={{ width: '100%', height: 200, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component={Link} to={`/student/${student.id}`}>
                      {student.firstname} {student.lastname}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="secondary"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Remove from Campus
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

CampusView.propTypes = {
  campus: PropTypes.object.isRequired,
  deleteCampus: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
};

export default CampusView;