import { observable, action } from 'mobx';
import { Request } from '~/utils';
import axios from 'axios';

const AuthStore = observable({
    isLogin: false,
    userInfo: {
        username: '' as string,
        gender: '' as 'Female' | 'Male',
        age: 0 as number,
    },

    login: action(async (username: string, password: string) => {
        const token = await Request.login('/auth',{ username, password });
        console.log(token);
        if (!token) {
            return "로그인 정보를 확인해주세요"
        } else {
            AuthStore.setToken(token);
            AuthStore.isLogin = true;
            return ""
        }
    }),
    setToken: action((token: string) => {
        axios.defaults.headers.common['Authorization'] = "Token " + token;
    }),

    logout: action(() => {
        AuthStore.removeToken();
        AuthStore.isLogin = false;
    }),
    removeToken: action(() => {
        axios.defaults.headers.common['Authorization'] = "";
    }),

    fetchUserInfo: action(async () => {
        const userInfo = await Request.get('user/');
        AuthStore.userInfo = userInfo;
    }),

});

export default AuthStore;