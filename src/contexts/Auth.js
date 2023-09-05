import React, { createContext, useContext, useEffect, useState } from "react";
import { useHook } from "./Hook";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert2';

const AuthContext = createContext(null);

export const Auth = ({ children }) => {
    const hook = useHook();
    const location = useLocation();
    const navigate = useNavigate();
    const [userOnline, setUserOnline] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const checkIfLoggedIn = () => {
        if (window.localStorage.getItem('username')) {
            setIsLoggedIn(true);
            setUserOnline(window.localStorage.getItem('username'))
        } else {
            setIsLoggedIn(false);
            setUserOnline('');
        }
    }

    const checkIfAdmin = () => {
        if (window.localStorage.getItem('administrator')) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
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
                        console.log(res.data)
                        swal({
                            title: "Social Handles",
                            text: "Updated!",
                            icon: "success",
                            button: "Proceed!",
                        })
                    } else {

                    }
                })

        } catch (error) {
            // Handle errors
            console.log(error)
        }
    }

    const storeActiveToken = (username, token, ref) => {
        let timestamp = Date.now() + (1 * 12 * 60 * 60 * 1000);
        window.localStorage.setItem('token', "Token " + token);
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('timestamp', timestamp);
        setUserOnline(username)
        checkIfLoggedIn();
        navigate(ref)
    }

    const sessionExpired = () => {
        if (isLoggedIn) {
            // var OneDay = new Date().getTime() + (1 * 24 * 60 * 60 * 1000);
            var OneDay = window.localStorage.getItem('timestamp');
            let yourDate = Date.now();

            // let hours = moment().diff(moment(yourDateString), 'hours');
            // let days = moment().diff(moment(yourDateString), 'days');

            if (yourDate < OneDay) {
                // session still continues
            } else if (yourDate >= OneDay) {
                // The yourDate time is exactly/more than 12 hours from now
                logOut();
            }
        }
    }

    const logOut = () => {
        window.localStorage.clear();
        setIsLoggedIn(false);
        setUserOnline('')
    }

    setTimeout(() => {
        sessionExpired();
        checkIfAdmin();
        checkIfLoggedIn();
    }, 300);

    useEffect(() => {
        // window.localStorage.setItem('username', 'olaolumide')
        checkIfLoggedIn();

        return () => {
            return true;
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, logOut, userOnline, setUserOnline, isAdmin, storeActiveToken, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}