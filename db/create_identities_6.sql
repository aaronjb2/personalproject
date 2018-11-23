update avalon_identity
set player1loyalty = $2,
    player1identity = $3,
    player2loyalty = $4,
    player2identity = $5,
    player3loyalty = $6,
    player3identity = $7,
    player4loyalty = $8,
    player4identity = $9,
    player5loyalty = $10,
    player5identity = $11,
    player6loyalty = $12,
    player6identity = $13
where matchname = $1;