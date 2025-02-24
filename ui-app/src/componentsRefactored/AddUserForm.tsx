import React, { ChangeEvent } from 'react';
import User from '../viewModels/user';

type Props = {
  formData: User;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addUser: () => void;
}

const AddUserForm = ({ formData, handleInputChange, addUser }: Props) => (
  <div>
    <h2>Add New User:</h2>
    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
    <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleInputChange} />
    <button onClick={addUser}>Submit New User</button>
  </div>
);

export default AddUserForm;
