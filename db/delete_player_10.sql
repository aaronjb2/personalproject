update avalon_player
set player10name = null,
    player10hash = null,
    player10image = null
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + -1
where matchname = $1;