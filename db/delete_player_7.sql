update avalon_player
set player7name = null,
    player7hash = null,
    player7image = null
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + -1
where matchname = $1;