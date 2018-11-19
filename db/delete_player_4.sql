update avalon_player
set player4name = null,
    player4hash = null,
    player4image = null
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + -1
where matchname = $1;