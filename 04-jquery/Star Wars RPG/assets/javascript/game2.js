$(document).ready(function() {
  var characters = [
    {
      id: 'darth-maul',
      name: 'Darth Maul',
      hp: 180,
      ap: 6,
      baseap: this.ap,
      cap: 25
    },
    {
      id: 'darth-sidious',
      name: 'Darth Sidious',
      hp: 150,
      ap: 5,
      baseap: this.ap,
      cap: 20
    },
    {
      id: 'obiwan-kenobi',
      name: 'Obi-Wan Kenobi',
      hp: 120,
      ap: 8,
      baseap: this.ap,
      cap: 4
    },
    {
      id: 'luke-skywalker',
      name: 'Luke Skywalker',
      hp: 100,
      ap: 10,
      baseap: this.ap,
      cap: 5
    }
  ];

  $('#luke-skywalker').click(function() {
    console.log(characters[0].name);
  });
});
