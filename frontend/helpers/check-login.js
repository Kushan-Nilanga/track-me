import Cookies from 'js-cookie'

export default function checkAuth() {
    if (Cookies.get('isLogged') === undefined || Cookies.get('isLogged') === 'false') { 
        return false;
    }
    return true;
}
