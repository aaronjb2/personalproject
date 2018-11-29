update avalon_results 
set playersreceived = $1
where matchname = $2
returning playersreceived