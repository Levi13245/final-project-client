/* ===== /src/components/views/AllCampusesView.js ===== */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const AllCampusesView = ({ allCampuses, deleteCampus }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterBottom>
        All Campuses
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to="/campuses/add"
        style={{ marginBottom: 20 }}
      >
        Add New Campus
      </Button>

      {!allCampuses.length ? (
        <Typography variant="body1">There are no campuses.</Typography>
      ) : (
        <Grid container spacing={4}>
          {allCampuses.map((campus) => (
            <Grid item key={campus.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <img
                  src={campus.imageUrl || '/default-campus.jpg'}
                  alt={campus.name}
                  style={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component={Link} to={`/campus/${campus.id}`}>
                    {campus.name}
                  </Typography>
                  <Typography>{campus.address}</Typography>
                  <Typography color="textSecondary">{campus.description}</Typography>
                </CardContent>
                <div style={{ padding: 16 }}>
                  <Button 
                    size="small" 
                    color="secondary"
                    onClick={() => deleteCampus(campus.id)}
                  >
                    Delete
                  </Button>
                  <Button 
                    size="small" 
                    color="primary" 
                    component={Link}
                    to={`/campus/${campus.id}/edit`}
                    style={{ marginLeft: 8 }}
                  >
                    Edit
                  </Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  deleteCampus: PropTypes.func.isRequired,
};

export default AllCampusesView;