insert into avalon_player(matchname,numberofplayers)
values($1,0)
returning *;