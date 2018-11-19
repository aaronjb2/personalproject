update avalon_player
set player1name = null,
    player1hash = null,
    player1image = null
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + -1
where matchname = $1;
