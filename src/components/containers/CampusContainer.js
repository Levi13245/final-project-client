import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, deleteCampusThunk } from "../../store/thunks";
import { CampusView } from "../views";

class CampusContainer extends Component {
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <Header />
        <CampusView 
          campus={this.props.campus} 
          deleteCampus={this.props.deleteCampus}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    deleteCampus: (campusId) => dispatch(deleteCampusThunk(campusId)),
  };
};

export default connect(mapState, mapDispatch)(CampusContainer);