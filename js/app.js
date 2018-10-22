window.addEventListener('DomContentLoaded', () => {
  const newCandidates = [
    { name: "Kerrie", skills: ["JavaScript", "Docker", "Ruby"] },
    { name: "Mario", skills: ["Python", "AWS"] },
    { name: "Jacquline", skills: ["JavaScript", "Azure"] },
    { name: "Kathy", skills: ["JavaScript", "Java"] },
    { name: "Anna", skills: ["JavaScript", "AWS"] },
    { name: "Matt", skills: ["PHP", "AWS"] },
    { name: "Matt", skills: ["PHP", ".Net", "Docker"] },
  ];

  function removeRowsFromTable(table) {
    const rows = table.getElementsByTagName("tr");

    while (rows.length > 1) {
      table.deleteRow(1);
    }
  }

  function insertCandidate(tbody, name, skills) {
    const newRow = tbody.insertRow();
    const nameCell = newRow.insertCell();
    const skillCell = newRow.insertCell();

    const candidateName = document.createTextNode(name);
    const candidateSkills = document.createTextNode(skills.join(', '));

    nameCell.appendChild(candidateName);
    skillCell.appendChild(candidateSkills);
  }

  function addCandidatesToTable(table, candidates) {
    candidates.forEach(candidate => insertCandidate(table, candidate.name, candidate.skills));
  }

  function filterCandidateBySkill(candidates, skill) {
    // INSERT YOUR LOGIC HERE   <-------------------------
    return candidates;
  }

  const candidatesTable = document.getElementById("candidates_example");
  const newCandidatesTable = candidatesTable.cloneNode(true);

  removeRowsFromTable(newCandidatesTable);
  const newTbody = newCandidatesTable.getElementsByTagName('tbody')[0];

  const filteredCandidates = filterCandidateBySkill(newCandidates, 'JavaScript');
  addCandidatesToTable(newTbody, filteredCandidates);

  document.body.appendChild(newCandidatesTable);
});
