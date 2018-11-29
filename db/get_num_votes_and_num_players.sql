SELECT
 avalon_player.numberofplayers,
 avalon_results.votesreceived
FROM
 avalon_player
INNER JOIN avalon_results ON avalon_player.matchname = avalon_results.matchname where avalon_player.matchname = 'a';