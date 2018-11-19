update avalon_player
set player6name = $2,
    player6hash = $3,
    player6image = $4
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + 1
where matchname = $1;