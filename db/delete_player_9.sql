update avalon_player
set player9name = null,
    player9hash = null,
    player9image = null
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + -1
where matchname = $1;