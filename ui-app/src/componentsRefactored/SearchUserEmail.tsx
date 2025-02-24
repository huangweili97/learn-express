import React from 'react';

type Props = {
  searchUsername: string;
  setSearchUsername: (username: string) => void;
  handleShowEmail: () => void;
}

const SearchUserEmail = ({ searchUsername, setSearchUsername, handleShowEmail }: Props) => (
  <div>
    <h2>Search for User's Email:</h2>
    <input type="text" name="srchUsername" placeholder="username" value={searchUsername} onChange={(e) => setSearchUsername(e.target.value)} />
    <button onClick={handleShowEmail}>Show Email</button>
  </div>
);

export default SearchUserEmail;
