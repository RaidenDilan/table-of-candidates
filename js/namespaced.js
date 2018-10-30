var candidate = candidate || {};

candidate.removeRowsFromTable = function(table) {
  this.rows = table.getElementsByTagName('tr');
  while (this.rows.length > 1) table.deleteRow(1);
};

candidate.insertCandidate = function(tbody, name, skills) {
  this.newRow = tbody.insertRow();
  this.nameCell = this.newRow.insertCell();
  this.skillCell = this.newRow.insertCell();

  this.candidateName = document.createTextNode(name);
  this.candidateSkills = document.createTextNode(skills.join(', '));

  this.nameCell.appendChild(this.candidateName);
  this.skillCell.appendChild(this.candidateSkills);
};

candidate.addCandidatesToTable = function(table, candidates) {
  candidates.forEach(candidate => this.insertCandidate(table, candidate.name, candidate.skills));
};

candidate.hasSkill = function(candidate, skill) {
  return candidate.skills.includes(skill);
};

candidate.filterCandidateBySkill = function(candidates, skill) {
  this.selectedCandidates = [];

  candidates.forEach((candidate) => {
    if (this.hasSkill(candidate, skill)) this.selectedCandidates.push(candidate);
  });

  return this.selectedCandidates;
};

candidate.tableExists = function() {
  return !!document.getElementById('filteredResult');
};

candidate.removeExistingTable = function() {
  if (this.tableExists()) document.getElementById('filteredResult').remove();
};

candidate.cloneExistingTable = function() {
  this.candidatesTable = document.getElementById('candidates_list');
  this.newCandidatesTable = this.candidatesTable.cloneNode(true);
  this.newCandidatesTable.id = 'filteredResult';

  return this.newCandidatesTable;
};

candidate.generateFilteredTBody = function(candidates, skill, table) {
  this.newTbody = table.getElementsByTagName('tbody')[0];
  this.filteredCandidates = this.filterCandidateBySkill(candidates, skill);
  this.addCandidatesToTable(this.newTbody, this.filteredCandidates);
};

candidate.renderFilteredTable = function(candidates, skill) {
  this.newTable = this.cloneExistingTable();
  this.removeRowsFromTable(this.newTable);
  this.generateFilteredTBody(candidates, skill, this.newTable);
  // document.body.appendChild(this.newTable);
  this.container.appendChild(this.newTable);
};

candidate.changeResults = function() {
  this.removeExistingTable();
  this.selectedSkill = this.skillList.options[this.skillList.selectedIndex].value;
  this.renderFilteredTable(this.newCandidates, this.selectedSkill);
};

candidate.setup = function() {
  this.newCandidates = [
    { name: "Kerrie", skills: ["JavaScript", "Docker", "Ruby"] },
    { name: "Mario", skills: ["Python", "AWS"] },
    { name: "Jacquline", skills: ["JavaScript", "Azure"] },
    { name: "Kathy", skills: ["JavaScript", "Java"] },
    { name: "Anna", skills: ["JavaScript", "AWS"] },
    { name: "Matt", skills: ["PHP", "AWS"] },
    { name: "Jake", skills: ["PHP", ".Net", "Docker"] },
    { name: "Raiden", skills: ["JavaScript", "Node", "Angular", "Postgres", "Ruby on Rails"] },
    { name: "Roman", skills: ["Vue", "JavaScript", "D3", "Node", "React"] },
    { name: "Billie", skills: ["Django", "Postgres", "JavaScript", "Backbone"] }
  ];
  this.skillList = document.getElementById('technology');
  this.container = document.getElementsByClassName('container')[0];
  this.skillList.addEventListener('change', this.changeResults.bind(this));
};

$(candidate.setup.bind(candidate));
