import  { useState } from 'react';
import Layout from 'components/Layout';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from 'features/user';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const { registered, loading } = useSelector(state => state.user);

    const [formData, setFormData] = useState ({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const { first_name, last_name, email, password } = formData;

    const onChangeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        dispatch(register({ first_name, last_name, email, password }))
    }

    if (registered)
        return <Navigate to='/login' />

    return (
        <Layout title='Auth Site | Register Page' content='Register Page'>
            <h1>Register for an account</h1>
            <form className='mt-5' onSubmit={onSubmitHandler}>
                <div className='form-group'>
                    <label className='form-label' htmlFor='first_name'>First Name</label>
                    <input
                        className='form-control'
                        type='text'
                        name='first_name'
                        onChange={onChangeHandler}
                        value={first_name}
                        require
                    />
                    <label className='mt-3 form-label' htmlFor='last_name'>Last Name</label>
                    <input
                        className='form-control'
                        type='text'
                        name='last_name'
                        onChange={onChangeHandler}
                        value={last_name}
                        require
                    />
                    <label className='mt-3 form-label' htmlFor='email'>Email</label>
                    <input
                        className='form-control'
                        type='email'
                        name='email'
                        onChange={onChangeHandler}
                        value={email}
                        require
                    />
                    <label className='mt-3 form-label' htmlFor='password'>Password</label>
                    <input
                        className='form-control'
                        type='password'
                        name='password'
                        onChange={onChangeHandler}
                        value={password}
                        require
                    />
                </div>
                {loading
                    ?
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                        <button className='btn btn-primary mt-4'>
                            Register
                        </button>
                    }
            </form>
        </Layout>
    )
};

export default RegisterPage;