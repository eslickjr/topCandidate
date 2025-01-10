import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  interface User {
    login: string;
    avatar_url: string;
    name: string;
    location: string;
    email: string;
    company: string;
    bio: string;
    html_url: string;
  }
  
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchUser, setSearchUser] = useState('');
  const [searchUserResults, setSearchUserResults] = useState<User>({login: '', avatar_url: '',  name: '', location: '', email: '', company: '', bio: '', html_url: ''});

  const declineCandidate = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const userIndex = Math.floor(Math.random()*(searchResults.length - 1));
    setSearchUser(searchResults[userIndex].login);
  }

  const acceptCandidate = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const potentialCandidates = JSON.parse(localStorage.getItem('potentialCandidates') || '[]');

    if (!checkCandidates(searchUserResults, potentialCandidates)) {
      potentialCandidates.push(searchUserResults);
      localStorage.setItem('potentialCandidates', JSON.stringify(potentialCandidates)); 
    }

    const userIndex = Math.floor(Math.random()*(searchResults.length - 1));
    setSearchUser(searchResults[userIndex].login);
  }

  const checkCandidates = (candidate: User, candidateList: User[]) => {
    for (let i = 0; i < candidateList.length; i++) {
      if (candidate.login === candidateList[i].login) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if (searchResults && searchResults.length === 0) {
      searchGithub().then((data) => {
          console.log(data);
          if (data && data.length > 0) {
            setSearchResults(data);
            const userIndex = Math.floor(Math.random()*(data.length - 1));
            console.log('userIndex:', userIndex);
            setSearchUser(data[userIndex].login);
            console.log('searchUser:', data[userIndex].login);
          } else {
            setSearchResults([]);
          }
        });
    }

    //setSearchResults([{login: 'test', avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',  name: 'test', location: 'test', email: 'test', company: 'test', bio: 'test', html_url: 'test'}]);
  }, [searchResults]);

  useEffect(() => {
    if (searchUser !== '') {
      searchGithubUser(searchUser).then((data) => {
          setSearchUserResults(data);
          console.log(data);
        });
    }
  }, [searchUser]);

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return <h4 className='noResults'>No Search Results</h4>;
    }
    return <div id='candidateCare'>
      <div id='candidateInfo'>
        <img src={searchUserResults.avatar_url} alt="avatar" />
        <h4 className='candidateText'>
          {searchUserResults.login}<br />
          <i>({searchUserResults.name === null ? searchUserResults.login : searchUserResults.name})</i>
        </h4>
        <p className='candidateText'>Location: {searchUserResults.location}</p>
        <p className='candidateText'>Email: {searchUserResults.email === null ? '' : `"mailto:${searchUserResults.email}`}</p>
        <p className='candidateText'>Company: {searchUserResults.company}</p>
        <p className='candidateText'>Bio: {searchUserResults.bio}</p>
        <p className='candidateText'>Github: <a href={searchUserResults.html_url} target='_blank'>{searchUserResults.html_url}</a></p>
      </div>
      <form id='candidateForm'>
        <button id='declineCandidate' onClick={declineCandidate}>-</button>
        <button id='acceptCandidate' onClick={acceptCandidate}>+</button>
      </form>
    </div>;
  }

//random comment to force commit
  return <div id="candidateSearch">
    <h1>CandidateSearch</h1>
    {renderSearchResults()}
  </div>;
};

export default CandidateSearch;
