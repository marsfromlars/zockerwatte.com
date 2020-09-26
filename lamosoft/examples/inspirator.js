function inspire() {
  document.getElementById( 'result' ).innerHTML = createSynopsis()
}

function createSynopsis() {
  return "In " + randomEntry( locations )
    + " zur Zeit des/der " + randomEntry( times )
    + " " + randomEntry( persons )
    + " arbeitet als " + randomEntry( occupations )
    + " und macht in der Freizeit " + randomEntry( hobbies )
}

function randomEntry( array ) {
  return array[ Math.floor( Math.random() * array.length ) ]
}

locations = [
  'Mond',
  'Großstadt',
  'Wald',
  'New England',
  'Moskau',
  'Peking',
  'Sachsen',
  'Geschlossener Tierpark',
  'Burg in den Bergen',
  'Chemnitz',
  'Erdkern',
  'Jupiter',
  'Vulkan',
  'Kofferraum',
  'Eisberg',
  'Einsame Insel'
]

times = [
  'Mittelalter',
  '80ies',
  '90ies',
  'heute',
  'nahe Zukunft',
  'ferne Zukunft',
  '19. Jahrhundert',
  '18. Jahrhundert',
  '60ies',
  '70ies',
  'Gilded Age',
  'Jahrhundertwende'
]

persons = [
  'Mann',
  'Frau',
  'Kleines Mädchen',
  'Teenager',
  'Alter Mann',
  'Alte Frau',
  'Saurier',
  'Pinguin'
]

occupations = [
  'Samurai',
  'Schreiner',
  'Schafzüchter',
  'Hühnerarzt',
  'Lehrer',
  'Mönch/Nonne',
  'Detektiv',
  'Profi-Gamer',
  'Schuldirektor',
  'Hexe',
  'Provinzschauspieler',
  'Ballerina',
  'Optiker',
  'Vampirjäger m/w/d',
  'Löwenfriseur'
]

hobbies = [
  'Jonglieren',
  'Sterne beobachten',
  'Käsereiben sammeln',
  'mit Kühen reden'
]
