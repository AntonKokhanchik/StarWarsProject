var commander_id;
var line;

function renderHome() {
  // рендерим значок командования империи
  $(".commander .commander-image").prop("src", "assets/avatars/empire.png");
  $(".commander .commander-name").text("Galactic Empire");
  $(".commander .commander-post").text("Imperial military");
  commander_id = undefined;

  // прячем кнопки
  $("#button-back, #button-next, #button-prev").hide();

  // рендерим подчинённых
  renderSubordinates(undefined);
}

function renderCharacter(id) {
  // показываем кнопки
  $("#button-back, #button-next, #button-prev").show();

  // ищем персонажа
  var character;
  array.forEach(function(e) {
    if (e.id == id)
      character = e;
  });

  // заполняем массив персонажей одного уровня
  line = [];
  array.forEach(function(e) {
    if (e.parent == character.parent)
      line.push(e.id);
  });

  // рендерим командира
  $(".commander .commander-image").prop("src", "assets/avatars/" + character.image);
  $(".commander .commander-name").text(character.name);
  $(".commander .commander-post").text(character.post);
  commander_id = character.id;

  // рендерим подчинённых
  renderSubordinates(id);
}

function renderSubordinates(n) {
  $(".content").html("");
  array.forEach(function(e) {
    if (e.parent == n) {
      var characterText =
        "<div class = 'clickable character' id='" + e.id + "'>" +
        "<div class = 'character-image'>" +
        "<img src = 'assets/avatars/" + e.image + "' />";

      if ((s = numberSubordinates(e.id)) != 0)
        characterText += "<div class = 'sticker'>" + s + "</div>";

      characterText +=
        "</div>" +
        "<h2 class = 'character-name header-2'> " + e.name + " </h1>" +
        "<p class = 'character-post paragraph-2'> " + e.post + " </p>" +
        "</div>";
      $(".content").append(characterText);
    }
  });
}

function numberSubordinates(id) {
  var number = 0;
  array.forEach(function(e) {
    if (e.parent == id)
      number += numberSubordinates(e.id) + 1;
  });
  return number;
}

$(document).ready(renderHome());

$(".content").on("click", ".character", function() {
  renderCharacter($(this).prop("id"));
});

$("#button-back").click(function() {
  array.forEach(function(e) {
    if (e.id == commander_id)
      if (e.parent != undefined)
        renderCharacter(e.parent);
      else
        renderHome();
  });
});

$("#button-next").click(function() {
  for (var i = 0; i < line.length; i++)
    if (line[i] == commander_id) {
      if (i + 1 == line.length)
        renderCharacter(line[0]);
      else
        renderCharacter(line[i + 1]);
      break;
    }
});

$("#button-prev").click(function() {
  for (var i = 0; i < line.length; i++)
    if (line[i] == commander_id) {
      if (i == 0)
        renderCharacter(line[line.length - 1]);
      else
        renderCharacter(line[i - 1]);
      break;
    }
});

$(".logo").click(function() {
  renderHome();
});
