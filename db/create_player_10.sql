update avalon_player
set player10name = $2,
    player10hash = $3,
    player10image = $4
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + 1
where matchname = $1;