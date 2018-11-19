update avalon_player
set player1name = $2,
    player1hash = $3,
    player1image = $4
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + 1
where matchname = $1;
