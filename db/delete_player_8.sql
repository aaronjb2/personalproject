update avalon_player
set player8name = null,
    player8hash = null,
    player8image = null
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + -1
where matchname = $1;