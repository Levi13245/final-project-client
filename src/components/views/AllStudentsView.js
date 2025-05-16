import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const AllStudentsView = ({ students, deleteStudent }) => {
  return (
    <div>
      <h1>All Students</h1>
      
      <Link to="/students/new">
        <Button variant="contained" color="primary" style={{ marginBottom: '20px' }}>
          Add New Student
        </Button>
      </Link>

      {!students.length ? (
        <p>There are no students.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {students.map((student) => (
            <div key={student.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px'
            }}>
              <Link to={`/student/${student.id}`}>
                <img 
                  src={student.imageUrl || '/default-student.jpg'} 
                  alt={`${student.firstname} ${student.lastname}`}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <h2>{student.firstname} {student.lastname}</h2>
              </Link>
              {student.campus && (
                <p>
                  <strong>Campus:</strong> 
                  <Link to={`/campus/${student.campus.id}`}>
                    {student.campus.name}
                  </Link>
                </p>
              )}
              
              <div style={{ marginTop: '10px' }}>
                <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </Button>
                <Link to={`/student/${student.id}/edit`} style={{ marginLeft: '10px' }}>
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllStudentsView;