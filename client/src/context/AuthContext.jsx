import {createContext, useCallback, useEffect, useState} from 'react';
import { postRequest, baseUrl } from '../utils/services';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });
    const [LoginError, setLoginError] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    useEffect(() => {
        const user = localStorage.getItem('User');

        setUser(JSON.parse(user))
    })

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

    const registerUser = useCallback(async (e) => {
        e.preventDefault()
        setIsRegisterLoading(true);
        setRegisterError(null);
        const res = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))

        setIsRegisterLoading(false)

        if (res.error) {
          return setRegisterError(res);
        }

        
        localStorage.setItem('User', JSON.stringify(res))
        setUser(res);
    }, [registerInfo]);

    const loginUser = useCallback(async (e) => {
        e.preventDefault()
        setIsLoginLoading(true);
        setLoginError(null)
        const res = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo))
        if (res.error) {
            return setLoginError(res);
          }

        localStorage.setItem('User', JSON.stringify(RES));
        setUser(res)
        setIsLoginLoading(false);    
    }, [loginInfo])

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, [])

    const logoutUser = useCallback(() => {
        localStorage.removeItem('User');
        setUser(null)
    },[])
    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        LoginError,
        updateLoginInfo,
        loginInfo,
        isLoginLoading,
    }}>
    {children}
    </AuthContext.Provider>
}