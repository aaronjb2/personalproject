update avalon_player
set player5name = $2,
    player5hash = $3,
    player5image = $4
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + 1
where matchname = $1;