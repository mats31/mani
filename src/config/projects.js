const projects = {
  projectList: [
    {
      id: 'jeanine',
      title: 'Jeanine',
      subtitle: 'Motion Design Project',
    },
    {
      id: 'mathetmalice',
      title: 'Mathetmalice',
      subtitle: 'Educative iPad Game',
    },
    {
      id: 'sisley',
      title: 'Sisley',
      subtitle: 'Nice To Meet You',
    },
    {
      id: 'sncf',
      title: 'SNCF',
      subtitle: 'Optimize Your Trip',
    },
  ],
  getProject(id) {
    return this.projectList.find( project => project.id === id );
  },
};

module.exports = projects;
