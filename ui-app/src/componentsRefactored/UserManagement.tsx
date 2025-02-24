// UserManagement.tsx
import React from 'react';
import { useUserManagement } from '../hooks/useUserManagement';
import AllUsernames from './AllUsernames';
import AddUserForm from './AddUserForm';
import SearchUserEmail from './SearchUserEmail';
import ShowEmail from './ShowEmail';

const UserManagement = () => {
  const {
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
  } = useUserManagement();

  return (
    <div>
      <h1>User Management</h1>
      <button onClick={getAllUsernames}>View All Usernames</button>
      <button onClick={handleClickNewUser}>Add New User</button>
      <button onClick={handleSearchForm}>Search User</button>
      {showUsernames && <AllUsernames usernames={usernames} />}
      {showAddUserForm && <AddUserForm formData={formData} handleInputChange={handleInputChange} addUser={addUser} />}
      {searchUserForm && <SearchUserEmail searchUsername={searchUsername} setSearchUsername={setSearchUsername} handleShowEmail={handleShowEmail} />}
      {showEmail && <ShowEmail searchEmail={searchEmail} />}
    </div>
  );
};

export default UserManagement;
