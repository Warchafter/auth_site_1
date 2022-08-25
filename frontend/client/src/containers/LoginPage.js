import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { resetRegistered, login } from 'features/user';
import Layout from 'components/Layout';

const LoginPage = () => {
    const dispatch = useDispatch();
    const { loading, isAuthenticated, registered } = useSelector(state => state.user);

    useEffect(() => {
        if (registered)
            dispatch(resetRegistered());
    }, [registered]);

    const [formData, setFormData] = useState ({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChangeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        dispatch(login({ email, password }));
    };

    if (isAuthenticated) return <Navigate to='/dashboard' />;


    return (
        <Layout title='Auth Site | Login Pages' content='Login Page'>
            <h1>Log into your account</h1>
            <form className='mt-5' onSubmit={onSubmitHandler}>
                <div className='form-group'>
                    <label className='form-label' htmlFor='email'>Email</label>
                    <input
                        className='form-control'
                        type='email'
                        name='email'
                        onChange={onChangeHandler}
                        value={email}
                        require
                    />
                    <label className='mt-3 form-label' htmlFor='first_name'>Password</label>
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
                            Log In
                        </button>
                    }
            </form>
        </Layout>
    )
};

export default LoginPage;