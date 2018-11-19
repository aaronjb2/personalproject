update avalon_player
set player5name = null,
    player5hash = null,
    player5image = null
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + -1
where matchname = $1;