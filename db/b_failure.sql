update avalon_results set numberoffailedquests = numberoffailedquests+1 where matchname = $1 returning *