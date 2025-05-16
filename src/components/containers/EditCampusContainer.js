import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';
import { EditCampusView } from '../views';

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      redirect: false,
      redirectId: null,
      loading: true
    };
  }

  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id)
      .then(() => {
        // Set initial form values from fetched campus data
        const { campus } = this.props;
        this.setState({
          name: campus.name,
          address: campus.address,
          description: campus.description || "",
          imageUrl: campus.imageUrl || "",
          loading: false
        });
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    
    // Basic validation
    if (!this.state.name || !this.state.address) {
      alert('Name and address are required!');
      return;
    }

    const campusData = {
      id: this.props.match.params.id,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl
    };
    
    try {
      await this.props.editCampus(campusData);
      this.setState({
        redirect: true,
        redirectId: this.props.match.params.id
      });
    } catch (error) {
      console.error("Error updating campus:", error);
      alert('Failed to update campus. Please try again.');
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.state.redirectId}`} />;
    }

    if (this.state.loading) {
      return (
        <div>
          <Header />
          <div style={{ textAlign: 'center', padding: '40px' }}>
            Loading campus data...
          </div>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <EditCampusView 
          campus={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
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
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  };
};

export default withRouter(connect(mapState, mapDispatch)(EditCampusContainer));