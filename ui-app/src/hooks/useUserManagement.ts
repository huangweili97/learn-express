// useUserManagement.ts
import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import User from '../viewModels/user';
import EmailResponse from '../viewModels/email';
import UsernameResponse from '../viewModels/username';

export const useUserManagement = () => {
  const [usernames, setUsernames] = useState<UsernameResponse[]>([]);
  const [showUsernames, setShowUsernames] = useState<boolean>(false);
  const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    id: ''
  });
  const [searchUserForm, setSearchUserForm] = useState<boolean>(false);
  const [searchUsername, setSearchUsername] = useState<string>('');
  const [searchEmail, setSearchEmail] = useState<EmailResponse[]>([]);
  const [showEmail, setShowEmail] = useState<boolean>(false);

  const getAllUsernames = async () => {
    try {
      const response = await axios.get<UsernameResponse[]>('http://localhost:8000/read/usernames');
      console.log(response.data);
      setUsernames(response.data);
      setShowUsernames(true);
      setShowAddUserForm(false);
      setSearchUserForm(false);
      setShowEmail(false);
    } catch (error) {
      console.error('Error fetching usernames:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickNewUser = () => {
    setShowAddUserForm(true);
    setShowUsernames(false);
    setSearchUserForm(false);
    setShowEmail(false);
  };

  const handleSearchForm = () => {
    setSearchUserForm(true);
    setShowAddUserForm(false);
    setShowUsernames(false);
    setShowEmail(false);
  };

  const handleShowEmail = async () => {
    try {
      const response = await axios.get<EmailResponse[]>(`http://localhost:8000/read/username/${searchUsername}`);
      const data = response.data;
      if (data.length > 0) {
        setSearchEmail(data);
      } else {
        setSearchEmail([{ id: 'error', email: 'Not Found' }]);
      }
      setShowEmail(true);
      setSearchUserForm(false);
      setShowAddUserForm(false);
    } catch (error) {
      console.error('Error fetching email of username', error);
    }
  };

  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:8000/write/adduser', formData);
      const data = response.data;
      if (data.error) {
        alert(data.error.message);
      } else {
        alert('User added successfully!');
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        id: ''
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return {
    usernames,
    formData,
    searchUsername,
    searchEmail,
    showUsernames,
    showAddUserForm,
    searchUserForm,
    showEmail,
    getAllUsernames,
    handleInputChange,
    handleClickNewUser,
    handleSearchForm,
    handleShowEmail,
    addUser,
    setSearchUsername
  };
};
