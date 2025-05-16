import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const StudentView = ({ student, deleteStudent }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
        <img 
          src={student.imageUrl || '/default-student.jpg'} 
          alt={`${student.firstname} ${student.lastname}`}
          style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
        />
        
        <div>
          <h1>{student.firstname} {student.lastname}</h1>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>GPA:</strong> {student.gpa || 'N/A'}</p>
          
          {student.campus ? (
            <p>
              <strong>Campus:</strong>
              <Link to={`/campus/${student.campus.id}`}>
                {student.campus.name}
              </Link>
            </p>
          ) : (
            <p>Not enrolled in any campus</p>
          )}
          
          <div style={{ marginTop: '20px' }}>
            <Link to={`/student/${student.id}/edit`}>
              <Button variant="contained" color="primary">
                Edit Student
              </Button>
            </Link>
            <Button 
              variant="contained" 
              color="secondary" 
              style={{ marginLeft: '10px' }}
              onClick={() => deleteStudent(student.id)}
            >
              Delete Student
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;