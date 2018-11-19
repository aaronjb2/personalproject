update avalon_player
set player8name = $2,
    player8hash = $3,
    player8image = $4
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + 1
where matchname = $1;