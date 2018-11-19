update avalon_player
set player3name = null,
    player3hash = null,
    player3image = null
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + -1
where matchname = $1;