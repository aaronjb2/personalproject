update avalon_player
set player7name = $2,
    player7hash = $3,
    player7image = $4
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + 1
where matchname = $1;