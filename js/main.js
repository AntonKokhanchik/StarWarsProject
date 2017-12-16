function renderHome() {
  $(".commander .commander-image").prop("src", "assets/avatars/empire.png");
  $(".commander .commander-name").text("Galactic Empire");
  $(".commander .commander-post").text("Imperial military");

  $("#button-back, #button-next, #button-prev").hide();

  renderSubordinates(undefined);
  id = undefined;
}

function renderSubordinates(n) {
  $(".content").html("");
  array.forEach(function(e) {
    if (e.parent == n)
      $(".content").append(
        "<div class = 'character' id='" + e.id + "'>" +
        "<img class = 'character-image' src = 'assets/avatars/" + e.image + "' />" +
        "<h1 class = 'character-name header-1'> " + e.name + " </h1>" +
        "<p class = 'character-post paragraph-1'> " + e.post + " </p>" +
        "</div>");
  });
}

$(document).ready(renderHome());

$(".content").on("click", ".character", function() {
  renderCharacter($(this).prop("id"))
});

function renderCharacter(id) {
  var character;
  array.forEach(function(e) {
    if (e.id == id)
      character = e;
  });
  $(".commander .commander-image").prop("src", "assets/avatars/" + character.image);
  $(".commander .commander-name").text(character.name);
  $(".commander .commander-post").text(character.post);
  renderSubordinates(id);
}
