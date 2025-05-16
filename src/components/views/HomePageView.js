import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const HomePageView = () => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px 20px',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '80vh'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '30px' }}>Campus Management System</h1>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '30px',
        marginTop: '50px'
      }}>
        <Link to="/campuses">
          <Button 
            variant="contained" 
            color="primary" 
            style={{ padding: '15px 30px', fontSize: '1.2rem' }}
          >
            View Campuses
          </Button>
        </Link>
        
        <Link to="/students">
          <Button 
            variant="contained" 
            color="secondary" 
            style={{ padding: '15px 30px', fontSize: '1.2rem' }}
          >
            View Students
          </Button>
        </Link>
      </div>
    </div>
  );    
}

export default HomePageView;