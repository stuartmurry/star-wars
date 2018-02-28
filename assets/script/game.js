$(document).ready(function() {
  function StarWars() {
    return {
      Characters: [
        {
          id: 1,
          source: "assets/images/kylo.jpg",
          name: "Kylo Ren",
          strength: 30,
          health: 100
        },
        {
          id: 2,
          source: "assets/images/luke.jpg",
          name: "Luke Skywalker",
          strength: 25,
          health: 100
        },
        {
          id: 3,
          source: "assets/images/ob1.jpg",
          name: "Ob1 Kanobe",
          strength: 20,
          health: 100
        },
        {
          id: 4,
          source: "assets/images/yoda.jpg",
          name: "Yoda",
          strength: 15,
          health: 100
        }
      ],
      wins : 0,
      selectedCharacter: {},
      selectedOpponent: {},
      isChooseYourOpponent : false,
      isSelectedCharacter: false,
      selectCharacter(id) {

          $("#" + id).hide();
          this.selectedCharacter = this.Characters.find(x => x.id == id);
          this.isSelectedCharacter = true;

          // Draw the selected character.  Normally can be done thru react or angular.
          $("#message").html(
            "<h3>" + this.selectedCharacter.name + ", choose your opponent</h3>"
          );

          $('#selected-character').html('<img src="' + this.selectedCharacter.source +'">');
          $('#selected-character-health').html(this.selectedCharacter.health);

      },
      selectOpponent(id) {

          $("#" + id).hide();
          this.selectedOpponent = this.Characters.find(x => x.id == id);
          this.isSelectedOpponent = true;

          // Draw the selected character.  Normally can be done thru react or angular.
          $("#message").html(
            "<h3>You've selected " + this.selectedOpponent.name + ", now fight till the death! </h3>"
          );

          $('#selected-opponent').html('<img src="' + this.selectedOpponent.source +'">');
          $('#selected-opponent-health').html(this.selectedOpponent.health);

          $("#fight-button").removeClass('hidden');

      },
      fight() {
        this.selectedCharacter.health = this.selectedCharacter.health - this.selectedOpponent.strength;
        $('#selected-character-health').html(this.selectedCharacter.health);

        this.selectedOpponent.health = this.selectedOpponent.health - this.selectedCharacter.strength;
        $('#selected-opponent-health').html(this.selectedOpponent.health);

        if (this.selectedCharacter.health < 0 ) { // loser
            $("#message").html(
                "<h3>You've died.  Game Over. </h3>"
            );
            $("#fight-button").addClass('hidden');
        } else if (this.selectedOpponent.health < 0) { // winner
            this.wins = this.wins + 1;
            $("#message").html(
                "<h3>You've win.</h3>"
            );

            // Restore health. Increase strength
            this.selectedCharacter.health = 100;

            // Inherit strength of opponent
            this.selectedCharacter.strength = this.selectedCharacter.strength + this.selectedOpponent.strength;

            //Reset, Redraw
            $("#fight-button").addClass('hidden');
            $('#selected-opponent').html('');
            $('#selected-opponent-health').html('');

            $('#selected-character-health').html(this.selectedCharacter.health);

            this.isSelectedOpponent = false;

        }

      },
      start() {
        console.log("Starting new game.");

        // var audio = new Audio('http://www.thesoundarchive.com/starwars/swvader02.mp3');
        // audio.play();

        // Clear
        $("#character-list").html("");
        $("message").html("");
        $("#selected-character").html("");
        $("#selected-opponent").html("");
        var _this = this;
        // Draw.  Normally done by a template engine like handlebars, angular or react.
        $.each(this.Characters, function(k, v) {
          $("#character-list").append(
            '<div id="' + 
              v.id +
              '" class="card col-2 mr-1">' +
              '<img class="card-img-top" src="' +
              v.source +
              '" alt="Card image">' +
              '<div class="card-body">' +
              '<h4 class="card-title">' +
              v.name +
              "</h4>" +
              '<p class="card-text">Fight Power: ' +
              v.strength +
              "</p>" +
              "</div>" +
              "</div>"
          );

          $("#" + v.id).on("click", function(e) {
              _this.isSelectedCharacter ? this.isChooseYourOpponent ? null : _this.selectOpponent(v.id) : _this.selectCharacter(v.id);
          });

        });

        $("#fight-button").on('click', (evt) => this.fight());
      }
    };
  }

  $("#restart").on("click", function(evt) {
    StarWars().start();
  });

  StarWars().start();
});
