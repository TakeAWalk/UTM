$(document).ready(function() {
  var attackingCharacter, defendingCharacter;
  var selectedCharacter;
  var currentEnemy;

  var characters = [
    {
      id: 'darth-maul',
      name: 'Darth Maul',
      hp: 180,
      ap: 6,
      baseap: 6,
      cap: 25
    },
    {
      id: 'darth-sidious',
      name: 'Darth Sidious',
      hp: 150,
      ap: 5,
      baseap: 5,
      cap: 20
    },
    {
      id: 'obiwan-kenobi',
      name: 'Obi-Wan Kenobi',
      hp: 120,
      ap: 8,
      baseap: 8,
      cap: 4
    },
    {
      id: 'luke-skywalker',
      name: 'Luke Skywalker',
      hp: 100,
      ap: 10,
      baseap: 10,
      cap: 5
    }
  ];

  function Attack(attackingCharacter, defendingCharacter) {
    attackingCharacter.hp -= defendingCharacter.cap;
    defendingCharacter.hp -= attackingCharacter.ap;
    attackingCharacter.ap += attackingCharacter.baseap;
    console.log("Attacking Character's HP:" + attackingCharacter.hp);
    console.log("Attacking Character's AP:" + attackingCharacter.ap);
    console.log("Defending Character's HP: " + defendingCharacter.hp);
    return 'FIGHT!';
  }

  function Character(name, hp, ap, cap) {
    // Character Name
    this.name = name;

    // Hit Points
    this.hp = hp;

    // Attack Power
    this.ap = ap;

    // Base Attack Power
    this.baseap = ap;

    // Counter Attack Power
    this.cap = cap;

    // Attack
    this.attack = function() {
      // Deduct counter attack damage from hp
      /*  this.hp -= cad; */

      // Increase ap by base ap;
      this.ap += this.baseAP;

      switch (currentEnemy) {
        case 'luke-skywalker':
          lukeSkywalker.hp -= this.ap;
          this.hp -= lukeSkywalker.cap;
          break;
        case 'darth-maul':
          darthMaul -= this.ap;
          this.hp -= darthMaul.cap;
          break;
        case 'obiwan-kenobi':
          obiWanKenobi -= this.ap;
          this.hp -= obiWanKenobi.cap;
          break;
        case 'darth-sidious':
          darthSidious -= this.ap;
          this.hp -= darthSidious.cap;
          break;
        default:
          console.log(this.hp);
      }
      console.log(lukeSkywalker.hp);
    };

    this.createCharacter = function() {
      var characterCard = $('<div>');
      characterCard.addClass('card');
      characterCard.attr('style', 'width: 18rem;');
      characterCard.text(this.name);
      /*   
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src=".../100px180/?text=Image cap" alt="Card image cap">
        <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>
    */
    };
  }

  function SelectCharacter(characterID) {
    if (!selectedCharacter) {
      selectedCharacter = characterID;

      for (var i = 0; i < characters.length; i++) {
        if (characters[i].id !== selectedCharacter) {
          $('#' + characters[i].id).appendTo('#enemies');
        }
      }
    } else if (!currentEnemy && selectedCharacter !== characterID) {
      $('#' + characterID).appendTo('#defender');
      currentEnemy = characterID;
    }
  }

  // Create Characters
  darthMaul = new Character('Darth Maul', 180, 6, 25);
  darthSidious = new Character('Darth Sidious', 150, 5, 20);
  obiWanKenobi = new Character('Obi-Wan Kenobi', 120, 8, 4);
  lukeSkywalker = new Character('Luke Skywalker', 100, 10, 5);

  $('#luke-skywalker').click(function() {
    SelectCharacter(this.id);
  });

  $('#darth-maul').click(function() {
    SelectCharacter(this.id);
  });

  $('#obiwan-kenobi').click(function() {
    SelectCharacter(this.id);
  });

  $('#darth-sidious').click(function() {
    SelectCharacter(this.id);
  });

  $('#fighting').click(function() {
    switch (selectedCharacter) {
      case 'darth-maul':
        attackingCharacter = characters[0];
        break;
      case 'darth-sidious':
        attackingCharacter = characters[1];
        break;
      case 'obiwan-kenobi':
        attackingCharacter = characters[2];
        break;
      case 'luke-skywalker':
        attackingCharacter = characters[3];
        break;
    }

    switch (currentEnemy) {
      case 'darth-maul':
        defendingCharacter = characters[0];
        break;
      case 'darth-sidious':
        defendingCharacter = characters[1];
        break;
      case 'obiwan-kenobi':
        defendingCharacter = characters[2];
        break;
      case 'luke-skywalker':
        defendingCharacter = characters[3];
        break;
    }

    console.log(Attack(attackingCharacter, defendingCharacter));

    if (defendingCharacter.hp <= 0) {
      alert('You win!');
    } else if (attackingCharacter.hp <= 0) {
      alert('You lose!');
    }
  });
});
