import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [searchUserResults, setSearchUserResults] = useState({login: '', avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',  name: '', location: '', email: '', company: '', bio: ''});

  useEffect(() => {
    if (searchResults && searchResults.length === 0) {
      searchGithub().then((data) => {
          console.log(data);
          setSearchResults(data);
          if (data && data.length > 0) {
            const userIndex = Math.floor(Math.random()*(data.length - 1));
            console.log('userIndex:', userIndex);
            setSearchUser(data[userIndex].login);
            console.log('searchUser:', data[userIndex].login);
          }
        });
    }
  }, [searchResults]);

  useEffect(() => {
    if (searchUser !== '') {
      searchGithubUser(searchUser).then((data) => {
          setSearchUserResults(data);
          console.log(data);
        });
    }
  }, [searchUser]);


  return <div>
    <h1>CandidateSearch</h1>
    <div id='candidateCare'>
      <div id='candidateInfo'>
        <img src={searchUserResults.avatar_url} alt="avatar" />
        <h4 className='candidateText'>{searchUserResults.login}<i>({searchUserResults.name === null ? searchUserResults.login : searchUserResults.name})</i></h4>
        <p className='candidateText'>Location: {searchUserResults.location}</p>
        <p className='candidateText'>Email: {searchUserResults.email}</p>
        <p className='candidateText'>Company: {searchUserResults.company}</p>
        <p className='candidateText'>Bio: {searchUserResults.bio}</p>
      </div>
      <form id='candidateForm'>
        <button id='declineCandidate'>-</button>
        <button id='acceptCandidate'>+</button>
      </form>
    </div>
  </div>;
};

export default CandidateSearch;
