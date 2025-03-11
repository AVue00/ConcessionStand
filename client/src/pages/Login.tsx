import { useState, FormEvent, ChangeEvent } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Auth from '../utils/auth';
import { login, createUser } from "../api/authAPI";
import ConcessionStandLogo from '../assets/ConcessionStandLogo.jpg';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [createData, setCreateData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
      setShow(false);
      setCreateData({
        username: '',
        password: '',
        confirmPassword: '',
      })
  }
  const handleShow = () => setShow(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };
  
  const handleConfirmChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCreateData({
      ...createData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      localStorage.setItem('user', loginData.username);
      localStorage.setItem('userId', data.userId);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  const handleConfirmSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (createData.username === '' || createData.password === '') {
      alert('Enter user info')
    } else if (createData.password === createData.confirmPassword) {
      try {
        const data = await createUser(createData);
        localStorage.setItem('user', createData.username);
        localStorage.setItem('userId', data.userId);
        Auth.login(data.token);
      } catch (err) {
        console.error('Failed to login', err);
      }
    } else {
      alert('Passwords doesn\'t match')
    }
  };

  return (
    <div className='container'>
      <img src={ConcessionStandLogo} alt="Concession Stand Logo" className="logo" />
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <Button type='submit' className="submit-button">Login</Button>
      </form>
      <Button onClick={handleShow} className="create-user-button">Sign Up!</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to Concession Stand!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='form' onSubmit={handleConfirmSubmit}>
            <label>Username:</label>
            <input 
              type='text'
              name='username'
              value={createData.username || ''}
              onChange={handleConfirmChange}
            />
            <label>Password:</label>
            <input 
              type='password'
              name='password'
              value={createData.password || ''}
              onChange={handleConfirmChange}
            />
            <label>Confirm Password:</label>
            <input 
              type='password'
              name='confirmPassword'
              value={createData.confirmPassword || ''}
              onChange={handleConfirmChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={handleConfirmSubmit}
            disabled={createData.username === '' || createData.password === '' || createData.password !== createData.confirmPassword}
          >
            Get Snacking!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
};

export default Login;