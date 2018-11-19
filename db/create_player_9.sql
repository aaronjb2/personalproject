update avalon_player
set player9name = $2,
    player9hash = $3,
    player9image = $4
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + 1
where matchname = $1;