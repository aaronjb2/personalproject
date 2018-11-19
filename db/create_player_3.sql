update avalon_player
set player3name = $2,
    player3hash = $3,
    player3image = $4
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + 1
where matchname = $1;