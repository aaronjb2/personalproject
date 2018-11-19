update avalon_player
set player4name = $2,
    player4hash = $3,
    player4image = $4
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + 1
where matchname = $1;