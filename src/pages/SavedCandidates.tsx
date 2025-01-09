const SavedCandidates = () => {

  interface Candidate {
    login: string;
    avatar_url: string;
    name: string;
    location: string;
    email: string;
    company: string;
    bio: string;
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
  }

  const renderTableRows = () => {
    return potentialCandidates.map((candidate: Candidate, index: number) => (
      <tr key={index}>
        <td>
          <img className="candidateImg" src={candidate.avatar_url} alt={candidate.login} />
        </td>
        <td>
          {candidate.login}
          <i>({candidate.name === null ? candidate.login : candidate.name})</i>
        </td>
        <td>{candidate.location}</td>
        <td>{candidate.email}</td>
        <td>{candidate.company}</td>
        <td>{candidate.bio}</td>
        <td>
          <button className="rejectCandidate" onClick={rejectCandidate}>-</button>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
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
