UPDATE avalon_player
    set numberOfPlayers = numberOfPlayers + -1
where matchname = $1;
