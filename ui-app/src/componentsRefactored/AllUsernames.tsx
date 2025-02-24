import React from 'react';
import UsernameResponse from '../viewModels/username';

type Props = {
  usernames: UsernameResponse[];
}

const AllUsernames = ({ usernames } : Props) => (
  <div>
    <h2>All Usernames:</h2>
    <ol>
      {usernames.map((username) => (
        <li key={username.id}>{username.username}</li>
      ))}
    </ol>
  </div>
);

export default AllUsernames;
