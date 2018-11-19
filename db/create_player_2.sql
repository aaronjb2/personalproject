update avalon_player
set player2name = $2,
    player2hash = $3,
    player2image = $4
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + 1
where matchname = $1;