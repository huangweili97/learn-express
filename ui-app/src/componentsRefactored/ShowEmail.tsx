import React from 'react';
import EmailResponse from '../viewModels/email';

interface Props {
  searchEmail: EmailResponse[];
}

const ShowEmail: React.FC<Props> = ({ searchEmail }) => (
  <div>
    <ul>
      {searchEmail.map((e) => (
        <li key={e.id}>{e.email ? e.email : 'N/A'}</li>
      ))}
    </ul>
  </div>
);

export default ShowEmail;
