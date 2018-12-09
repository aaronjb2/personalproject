delete from avalon_game_players where room = $1;
delete from avalon_executions where room = $1;
delete from avalon_proposals where room = $1;