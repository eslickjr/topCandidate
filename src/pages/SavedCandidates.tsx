const SavedCandidates = () => {

  interface Candidate {
    login: string;
    avatar_url: string;
    name: string;
    location: string;
    email: string;
    company: string;
    bio: string;
    html_url: string;
  }

  const potentialCandidates = JSON.parse(localStorage.getItem('potentialCandidates') || '[]');

  const rejectCandidate = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const tableRow = e.currentTarget.parentElement?.parentElement;
    const tableBody = tableRow?.parentElement;

    const i = Array.from(tableBody?.children || []).indexOf(tableRow as Element);
    
    potentialCandidates.splice(i, 1);
    localStorage.setItem('potentialCandidates', JSON.stringify(potentialCandidates));
    if (tableRow) {
      tableRow.remove();
    }
    if (potentialCandidates.length === 0) {
      localStorage.removeItem('potentialCandidates');

      const emptyRow = document.createElement('tr');
      const emptyCell = document.createElement('td');
      emptyCell.colSpan = 8;
      emptyCell.className = 'noPotentialCandidates';
      emptyCell.textContent = 'No potential candidates';

      emptyRow.appendChild(emptyCell);
      tableBody?.appendChild(emptyRow);
    }
  }


  const renderTableRows = () => {
    if (potentialCandidates.length === 0) {
      console.log('No potential candidates');
      return <tr><td colSpan={8} className='noPotentialCandidates'>No potential candidates</td></tr>;
    }
    console.log('Potential candidates:', potentialCandidates);
    return potentialCandidates.map((candidate: Candidate, index: number) => (
      <tr key={index}>
        <td className="candidateImgContainer">
          <div className="candidateImgOverlay">
            <img className="candidateImg" src={candidate.avatar_url} alt={candidate.login} />
          </div>
        </td>
        <td>
          {candidate.login}<br />
          <i>({candidate.name === null ? candidate.login : candidate.name})</i>
        </td>
        <td>{candidate.location}</td>
        <td>
          <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
        </td>
        <td>{candidate.company}</td>
        <td>{candidate.bio}</td>
        <td>
          <a href={candidate.html_url} target="_blank" rel="noreferrer">{candidate.html_url}</a>
        </td>
        <td className="rejectCandidateContainer">
          <button className="rejectCandidate" onClick={rejectCandidate}>-</button>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Github</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
