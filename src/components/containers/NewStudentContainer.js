import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addStudentThunk } from '../../store/thunks';
import NewStudentView from '../views/NewStudentView';


class NewStudentContainer extends Component {
   constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: null,
      campusId: props.location.state?.campusId || null, // Get campusId from location state
      redirect: false, 
      redirectId: null
    };
  }

  handleChange = event => {
    const value = event.target.type === 'number' 
      ? parseFloat(event.target.value) || null
      : event.target.value;
    
    this.setState({
      [event.target.name]: value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    // Basic validation
    if (!this.state.firstname || !this.state.lastname || !this.state.email) {
      alert('First name, last name, and email are required!');
      return;
    }

    let student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa,
      campusId: this.state.campusId
    };
    
    let newStudent = await this.props.addStudent(student);

    this.setState({
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: null,
      campusId: null,
      redirect: true, 
      redirectId: newStudent.id
    });
  }

  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null});
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <NewStudentView 
        handleChange={this.handleChange} 
        handleSubmit={this.handleSubmit}      
      />         
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addStudent: (student) => dispatch(addStudentThunk(student)),
  }
}

export default connect(null, mapDispatch)(NewStudentContainer);