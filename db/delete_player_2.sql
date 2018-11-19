update avalon_player
set player2name = null,
    player2hash = null,
    player2image = null
where matchname = $1;
UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + -1
where matchname = $1;