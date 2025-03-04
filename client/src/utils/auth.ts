import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    return jwtDecode<JwtPayload>(token);
  }

  loggedIn() {
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    const exp = (JSON.parse(atob(token.split('.')[1]))).exp;
    if ((Math.floor((new Date()).getTime()/1000)) >= exp) {
        this.logout();
    }
  }

  getToken(): string {

    const loggedUser = localStorage.getItem('token') || '';
    return loggedUser
  }

  login(idToken: string) {

    localStorage.setItem('token', idToken);

   window.location.assign('/BuyerDashboard');
  }

  logout() {
    localStorage.removeItem('token');
    window.location.assign('/');
  }
}

export default new AuthService();