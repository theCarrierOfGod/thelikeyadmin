import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth';
import TopBar from '../TopBar';
import Helmet from 'react-helmet'
import BottomBar from '../BottomBar';
import { useHook } from '../../contexts/Hook';
import axios from 'axios';

const Home = () => {
	 const location = useLocation();
    const auth = useAuth();
    const hook = useHook();
    const [searchParams, setSearchParams] = useSearchParams();
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ref, setRef] = useState();
    const getRef = () => {
        let theRef = searchParams.get('ref');
        if (theRef === "" || theRef === null) {
            setRef('/dashboard')
        } else {
            setRef(`${theRef}`);
        }
    }

    const login = (e) => {
        e.preventDefault();
        if (username.length < 3) {
            setUsernameError('minimum length not reached')
            return
        } else {
            setUsernameError('');
        }
        if (password.length < 8) {
            setPasswordError('minimum length not reached')
            return
        } else {
            setPasswordError('')
        }

        setIsLoading(true);

        let data = {
            username: username,
            password: password
        }
        signIn(data);
    }

    const signIn = async (data) => {
        try {
            const res = await axios.post(`${hook.endpoint}/sign/in`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        let loggedIn = res.data.username;
                        let token = res.data.token;
                        auth.storeActiveToken(loggedIn, token, ref);
                    } else {
                        let source = res.data.error.source;
                        let message = res.data.error.message;
                        if (source === "username") {
                            setUsernameError(message);
                        } else if (source === "password") {
                            setPasswordError(message);
                        }
                    }
                    setIsLoading(false);
                })

        } catch (error) {
            setIsLoading(false);
            setUsernameError('sign in error');
        }
    }

    useEffect(() => {
        getRef();
    }, [location.key]);
	return (

	)
}

export default Home;