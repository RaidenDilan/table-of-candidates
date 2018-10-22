window.addEventListener('DOMContentLoaded', () => {
  const newCandidates = [
    { name: "Kerrie", skills: ["JavaScript", "Docker", "Ruby"] },
    { name: "Mario", skills: ["Python", "AWS"] },
    { name: "Jacquline", skills: ["JavaScript", "Azure"] },
    { name: "Kathy", skills: ["JavaScript", "Java"] },
    { name: "Anna", skills: ["JavaScript", "AWS"] },
    { name: "Matt", skills: ["PHP", "AWS"] },
    { name: "Matt", skills: ["PHP", ".Net", "Docker"] },
    { name: "Raiden", skills: ["JavaScript", "Node", "Angular", "Postgres", "Ruby on Rails"] },
    { name: "Roman", skills: ["Vue", "JavaScript", "D3", "Node", "React"] },
    { name: "Billie", skills: ["Django", "Postgres", "JavaScript", "Backbone"] }
  ];

  function removeRowsFromTable(table) {
    const rows = table.getElementsByTagName("tr");
    while (rows.length > 1) table.deleteRow(1);
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

  function hasSkill(candidate, skill) {
    return candidate.skills.includes(skill);
  }

  function filterCandidateBySkill(candidates, skill) {
    const filteredCandidates = [];

    candidates.forEach((candidate) => {
      if (hasSkill(candidate, skill)) filteredCandidates.push(candidate);
    });

    return filteredCandidates;
  }

  function existingTable() {
    return document.getElementById('filteredResult');
  }

  function removeExistingTable() {
    if (existingTable()) document.getElementById('filteredResult').remove();
  }

  function cloneExistingTable() {
    const candidatesTable = document.getElementById('candidates_list');
    const newCandidatesTable = candidatesTable.cloneNode(true);
    newCandidatesTable.id = 'filteredResult';

    return newCandidatesTable;
  }

  function generateFilteredTBody(candidates, skill, table) {
    const newTbody = table.getElementsByTagName('tbody')[0];
    const filteredCandidates = filterCandidateBySkill(newCandidates, skill);
    addCandidatesToTable(newTbody, filteredCandidates);
  }

  function renderFilteredTable(candidates, skill) {
    const newTable = cloneExistingTable();
    removeRowsFromTable(newTable);
    generateFilteredTBody(candidates, skill, newTable);
    document.body.appendChild(newTable);
  }

  function changeResults() {
    removeExistingTable();
    const selectedSkill = skillsList.options[skillsList.selectedIndex].value;
    renderFilteredTable(newCandidates, selectedSkill);
  }

  const skillsList = document.getElementById('technology');
  skillsList.addEventListener('change', changeResults);
});
