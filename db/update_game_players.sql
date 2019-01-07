update avalon_game_players set player1name = $1, player1identity = $2, player2name = $3, player2identity = $4,
player3name = $5, player3identity = $6, player4name = $7, player4identity = $8,
player5name = $9, player5identity = $10, player6name = $11, player6identity = $12,
player7name = $13, player7identity = $14, player8name = $15, player8identity = $16,
player9name = $17, player9identity = $18, player10name = $19, player10identity = $20,
firstteamleader = $21 where room = $22;
insert into avalon_game_images(room,player1image,player2image,player3image,player4image,player5image,player6image,player7image,player8image,player9image,player10image)
values($22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32);