/* ===== /src/components/containers/EditStudentContainer.js ===== */
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchStudentThunk, editStudentThunk } from '../../store/thunks';
import { EditStudentView } from '../views';

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: null,
      campusId: null,
      redirect: false,
      redirectId: null
    };
  }

  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.student !== this.props.student) {
      this.setState({
        firstname: this.props.student.firstname,
        lastname: this.props.student.lastname,
        email: this.props.student.email,
        imageUrl: this.props.student.imageUrl || "",
        gpa: this.props.student.gpa || null,
        campusId: this.props.student.campusId || null
      });
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    
    let student = {
      id: this.props.match.params.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa,
      campusId: this.state.campusId
    };
    
    await this.props.editStudent(student);

    this.setState({
      redirect: true,
      redirectId: this.props.match.params.id
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <EditStudentView 
          student={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  };
};

export default withRouter(connect(mapState, mapDispatch)(EditStudentContainer));