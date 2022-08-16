import * as React from 'react';
import Button from '@mui/material/Button';
import { RegisterForm } from '../components/registerForm';

function Register() {
    return <div className='registerpage'>
      <h1>Sign Up to help this project!</h1>    
        < RegisterForm />
    </div>
  }
  
  export default Register;

