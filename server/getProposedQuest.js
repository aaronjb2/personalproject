module.exports = {
    async getProposedQuest(req,res,next){
        let {matchName,quest,attempt} = req.params;
        let db = req.app.get('db');
        let a;
        if (quest === 1){
            if (attempt === 1){
                console.log('made it here')
                a = await db.getpq11([matchName]);
            }else if (attempt === 2){
                a = await db.getpq12([matchName]);
            }else if (attempt === 3){
                a = await db.getpq13([matchName]);
            }else if (attempt === 4){
                a = await db.getpq14([matchName]);
            }else if (attempt === 5){
                a = await db.getpq15([matchName]);
            }
        }else if (quest === 2){
            if (attempt === 1){
                a = await db.getpq21([matchName]);
            }else if (attempt === 2){
                a = await db.getpq22([matchName]);
            }else if (attempt === 3){
                a = await db.getpq23([matchName]);
            }else if (attempt === 4){
                a = await db.getpq24([matchName]);
            }else if (attempt === 5){
                a = await db.getpq25([matchName]);
            }
        }else if (quest === 3) {
            if (attempt === 1){
                a = await db.getpq31([matchName]);
            }else if (attempt === 2){
                a = await db.getpq32([matchName]);
            }else if (attempt === 3){
                a = await db.getpq33([matchName]);
            }else if (attempt === 4){
                a = await db.getpq34([matchName]);
            }else if (attempt === 5){
                a = await db.getpq35([matchName]);
            }
        }else if (quest === 4) {
            if (attempt === 1){
                a = await db.getpq41([matchName]);
            }else if (attempt === 2){
                a = await db.getpq42([matchName]);
            }else if (attempt === 3){
                a = await db.getpq43([matchName]);
            }else if (attempt === 4){
                a = await db.getpq44([matchName]);
            }else if (attempt === 5){
                a = await db.getpq45([matchName]);
            }
        }else if (quest === 5) {
            if (attempt === 1){
                a = await db.getpq51([matchName]);
            }else if (attempt === 2){
                a = await db.getpq52([matchName]);
            }else if (attempt === 3){
                a = await db.getpq53([matchName]);
            }else if (attempt === 4){
                a = await db.getpq54([matchName]);
            }else if (attempt === 5){
                a = await db.getpq55([matchName]);
            }
        }
        res.status(200).send(a[0]);
    }
}