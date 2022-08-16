import { TrendingUpSharp } from '@mui/icons-material';
import React from 'react'
import { useForm } from 'react-hook-form';

type UserData = {
    username: string;
    email: string;
    password: string;
}

const RegisterForm = () =>  {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
 
  return (
    <section>
        <div className="register">
            <div className="col-1">
                <h2>Sign In</h2>

                <form id='form' className='register-form'>
                    <input type="text" {...register("username", { required: true})} placeholder='username' />
                    <input type="text" {...register("email", { required : true })} placeholder='email' />
                    <input type="text" {...register("password")} placeholder='password' />
                    <input type="text" {...register("confirmpwd")} placeholder='confirm password' />
                    <button className='btn'>Sign In</button>
                </form>

            </div>
        </div>
    </section>
  )
}

export { RegisterForm };