update avalon_player
set player6name = null,
    player6hash = null,
    player6image = null
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + -1
where matchname = $1;