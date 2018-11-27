module.exports = {
    async deletePlayer(req, res, next) {
        let db = req.app.get('db');
        console.log('inside delete player')
        let { matchName, playerNumber } = req.body;
        let foundMatch = await db.check_for_match([matchName]);
        if (!foundMatch[0]) return res.status(200).send({ message: 'There is no such match.' });
        let [numberOfPlayers] = await db.get_number_of_players([matchName]);
        let { numberofplayers } = numberOfPlayers;
        var player2Credentials, player2name, player2hash, player2image;
        var player3Credentials, player3name, player3hash, player3image;
        var player4Credentials, player4name, player4hash, player4image;
        var player5Credentials, player5name, player5hash, player5image;
        var player6Credentials, player6name, player6hash, player6image;
        var player7Credentials, player7name, player7hash, player7image;
        var player8Credentials, player8name, player8hash, player8image;
        var player9Credentials, player9name, player9hash, player9image;
        var player10Credentials, player10name, player10hash, player10image;
        console.log('playerNumber:', playerNumber)
        switch (playerNumber) {
            case 1:
            console.log('inside case 1')
                await db.delete_player_1([matchName]);
                switch (numberofplayers) {
                    case 1:
                        return res.sendStatus(200);
                        break;
                    case 2:
                        [player2Credentials] = await db.get_credentials_player2([matchName]);
                        player2name = player2Credentials.player2name; player2hash = player2Credentials.player2hash; player2image = player2Credentials.player2image;
                        await db.create_player_1([matchName, player2name, player2hash, player2image]);
                        await db.delete_player_2([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 3:
                        [player2Credentials] = await db.get_credentials_player2([matchName]);
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        player2name = player2Credentials.player2name; player2hash = player2Credentials.player2hash; player2image = player2Credentials.player2image;
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        await db.create_player_1([matchName, player2name, player2hash, player2image]);
                        await db.delete_player_2([matchName]);
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 4:
                        [player2Credentials] = await db.get_credentials_player2([matchName]);
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        player2name = player2Credentials.player2name; player2hash = player2Credentials.player2hash; player2image = player2Credentials.player2image;
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        await db.create_player_1([matchName, player2name, player2hash, player2image]);
                        await db.delete_player_2([matchName]);
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 5:
                        [player2Credentials] = await db.get_credentials_player2([matchName]);
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        player2name = player2Credentials.player2name; player2hash = player2Credentials.player2hash; player2image = player2Credentials.player2image;
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        await db.create_player_1([matchName, player2name, player2hash, player2image]);
                        await db.delete_player_2([matchName]);
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 6:
                        [player2Credentials] = await db.get_credentials_player2([matchName]);
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        player2name = player2Credentials.player2name; player2hash = player2Credentials.player2hash; player2image = player2Credentials.player2image;
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        await db.create_player_1([matchName, player2name, player2hash, player2image]);
                        await db.delete_player_2([matchName]);
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 7:
                        [player2Credentials] = await db.get_credentials_player2([matchName]);
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        player2name = player2Credentials.player2name; player2hash = player2Credentials.player2hash; player2image = player2Credentials.player2image;
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        await db.create_player_1([matchName, player2name, player2hash, player2image]);
                        await db.delete_player_2([matchName]);
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 8:
                        [player2Credentials] = await db.get_credentials_player2([matchName]);
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        player2name = player2Credentials.player2name; player2hash = player2Credentials.player2hash; player2image = player2Credentials.player2image;
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        await db.create_player_1([matchName, player2name, player2hash, player2image]);
                        await db.delete_player_2([matchName]);
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 9:
                        [player2Credentials] = await db.get_credentials_player2([matchName]);
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        player2name = player2Credentials.player2name; player2hash = player2Credentials.player2hash; player2image = player2Credentials.player2image;
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        await db.create_player_1([matchName, player2name, player2hash, player2image]);
                        await db.delete_player_2([matchName]);
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 10:
                        [player2Credentials] = await db.get_credentials_player2([matchName]);
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        [player10Credentials] = await db.get_credentials_player10([matchName]);
                        player2name = player2Credentials.player2name; player2hash = player2Credentials.player2hash; player2image = player2Credentials.player2image;
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        player10name = player10Credentials.player10name; player10hash = player10Credentials.player10hash; player10image = player10Credentials.player10image;
                        await db.create_player_1([matchName, player2name, player2hash, player2image]);
                        await db.delete_player_2([matchName]);
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        await db.create_player_9([matchName, player10name, player10hash, player10image]);
                        await db.delete_player_10([matchName]);
                        return res.sendStatus(200);
                        break;
                    default:
                        return res.status(400).send({ message: 'unknown error' })
                        break;
                }
                return res.sendStatus(200);
                break;
            case 2:
                await db.delete_player_2([matchName]);
                switch (numberofplayers) {
                    case 2:
                        return res.sendStatus(200);
                        break;
                    case 3:
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 4:
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 5:
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 6:
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 7:
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 8:
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 9:
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 10:
                        [player3Credentials] = await db.get_credentials_player3([matchName]);
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        [player10Credentials] = await db.get_credentials_player10([matchName]);
                        player3name = player3Credentials.player3name; player3hash = player3Credentials.player3hash; player3image = player3Credentials.player3image;
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        player10name = player10Credentials.player10name; player10hash = player10Credentials.player10hash; player10image = player10Credentials.player10image;
                        await db.create_player_2([matchName, player3name, player3hash, player3image]);
                        await db.delete_player_3([matchName]);
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        await db.create_player_9([matchName, player10name, player10hash, player10image]);
                        await db.delete_player_10([matchName]);
                        return res.sendStatus(200);
                        break;
                    default:
                        return res.status(400).send({ message: 'unknown error' })
                        break;
                }
                return res.sendStatus(200);
                break;
            case 3:
                await db.delete_player_3([matchName]);
                switch (numberofplayers) {
                    case 3:
                        return res.sendStatus(200);
                        break;
                    case 4:
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 5:
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 6:
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 7:
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 8:
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 9:
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 10:
                        [player4Credentials] = await db.get_credentials_player4([matchName]);
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        [player10Credentials] = await db.get_credentials_player10([matchName]);
                        player4name = player4Credentials.player4name; player4hash = player4Credentials.player4hash; player4image = player4Credentials.player4image;
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        player10name = player10Credentials.player10name; player10hash = player10Credentials.player10hash; player10image = player10Credentials.player10image;
                        await db.create_player_3([matchName, player4name, player4hash, player4image]);
                        await db.delete_player_4([matchName]);
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        await db.create_player_9([matchName, player10name, player10hash, player10image]);
                        await db.delete_player_10([matchName]);
                        return res.sendStatus(200);
                        break;
                    default:
                        return res.status(400).send({ message: 'unknown error' })
                        break;
                }
                return res.sendStatus(200);
                break;
            case 4:
            console.log('inside case 4')
                await db.delete_player_4([matchName]);
                switch (numberofplayers) {
                    case 4:
                        return res.sendStatus(200);
                        break;
                    case 5:
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 6:
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 7:
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 8:
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 9:
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 10:
                        [player5Credentials] = await db.get_credentials_player5([matchName]);
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        [player10Credentials] = await db.get_credentials_player10([matchName]);
                        player5name = player5Credentials.player5name; player5hash = player5Credentials.player5hash; player5image = player5Credentials.player5image;
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        player10name = player10Credentials.player10name; player10hash = player10Credentials.player10hash; player10image = player10Credentials.player10image;
                        await db.create_player_4([matchName, player5name, player5hash, player5image]);
                        await db.delete_player_5([matchName]);
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        await db.create_player_9([matchName, player10name, player10hash, player10image]);
                        await db.delete_player_10([matchName]);
                        return res.sendStatus(200);
                        break;
                    default:
                        return res.status(400).send({ message: 'unknown error' });
                        break;
                }
                return res.sendStatus(200);
                break;
            case 5:
                await db.delete_player_5([matchName]);
                switch (numberofplayers) {
                    case 5:
                        return res.sendStatus(200);
                        break;
                    case 6:
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 7:
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 8:
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 9:
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 10:
                        [player6Credentials] = await db.get_credentials_player6([matchName]);
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        [player10Credentials] = await db.get_credentials_player10([matchName]);
                        player6name = player6Credentials.player6name; player6hash = player6Credentials.player6hash; player6image = player6Credentials.player6image;
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        player10name = player10Credentials.player10name; player10hash = player10Credentials.player10hash; player10image = player10Credentials.player10image;
                        await db.create_player_5([matchName, player6name, player6hash, player6image]);
                        await db.delete_player_6([matchName]);
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        await db.create_player_9([matchName, player10name, player10hash, player10image]);
                        await db.delete_player_10([matchName]);
                        return res.sendStatus(200);
                        break;
                    default:
                        return res.status(400).send({ message: 'unknown error' });
                        break;
                }
                return res.sendStatus(200);
                break;
            case 6:
            console.log('inside case 6')
                await db.delete_player_6([matchName]);
                switch (numberofplayers) {
                    case 6:
                        return res.sendStatus(200);
                        break;
                    case 7:
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 8:
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 9:
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 10:
                        [player7Credentials] = await db.get_credentials_player7([matchName]);
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        [player10Credentials] = await db.get_credentials_player10([matchName]);
                        player7name = player7Credentials.player7name; player7hash = player7Credentials.player7hash; player7image = player7Credentials.player7image;
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        player10name = player10Credentials.player10name; player10hash = player10Credentials.player10hash; player10image = player10Credentials.player10image;
                        await db.create_player_6([matchName, player7name, player7hash, player7image]);
                        await db.delete_player_7([matchName]);
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        await db.create_player_9([matchName, player10name, player10hash, player10image]);
                        await db.delete_player_10([matchName]);
                        return res.sendStatus(200);
                        break;
                    default:
                        return res.status(400).send({ message: 'unknown error' })
                        break;
                }
                return res.sendStatus(200);
                break;
            case 7:
                console.log('inside case 7')
                await db.delete_player_7([matchName]);
                console.log('I is here')
                switch (numberofplayers) {
                    case 7:
                        return res.sendStatus(200);
                        break;
                    case 8:
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 9:
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 10:
                        [player8Credentials] = await db.get_credentials_player8([matchName]);
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        [player10Credentials] = await db.get_credentials_player10([matchName]);
                        player8name = player8Credentials.player8name; player8hash = player8Credentials.player8hash; player8image = player8Credentials.player8image;
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        player10name = player10Credentials.player10name; player10hash = player10Credentials.player10hash; player10image = player10Credentials.player10image;
                        await db.create_player_7([matchName, player8name, player8hash, player8image]);
                        await db.delete_player_8([matchName]);
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        await db.create_player_9([matchName, player10name, player10hash, player10image]);
                        await db.delete_player_10([matchName]);
                        return res.sendStatus(200);
                        break;
                    default:
                        return res.status(400).send({ message: 'unknown error' })
                        break;
                }
                return res.sendStatus(200);
                break;
            case 8:
                await db.delete_player_8([matchName]);
                switch (numberofplayers) {
                    case 8:
                        return res.sendStatus(200);
                        break;
                    case 9:
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        return res.sendStatus(200);
                        break;
                    case 10:
                        [player9Credentials] = await db.get_credentials_player9([matchName]);
                        [player10Credentials] = await db.get_credentials_player10([matchName]);
                        player9name = player9Credentials.player9name; player9hash = player9Credentials.player9hash; player9image = player9Credentials.player9image;
                        player10name = player10Credentials.player10name; player10hash = player10Credentials.player10hash; player10image = player10Credentials.player10image;
                        await db.create_player_8([matchName, player9name, player9hash, player9image]);
                        await db.delete_player_9([matchName]);
                        await db.create_player_9([matchName, player10name, player10hash, player10image]);
                        await db.delete_player_10([matchName]);
                        return res.sendStatus(200);
                        break;
                    default:
                        res.status(400).send({ message: 'unknown error' })
                        break;
                }
                return res.sendStatus(200);
                break;
            case 9:
                await db.delete_player_9([matchName]);
                switch (numberofplayers) {
                    case 9:
                        return res.sendStatus(200);
                        break;
                    case 10:
                        [player10Credentials] = await db.get_credentials_player10([matchName]);
                        player10name = player10Credentials.player10name; player10hash = player10Credentials.player10hash; player10image = player10Credentials.player10image;
                        await db.create_player_9([matchName, player10name, player10hash, player10image]);
                        await db.delete_player_10([matchName]);
                        return res.sendStatus(200);
                        break;
                    default:
                        return res.status(400).send('unknown error');
                        break;
                }
                return res.sendStatus(200);
                break;
            case 10:
                await db.delete_player_10([matchName]);
                return res.sendStatus(200);
                break;
            default:
                return res.status(400).send('unknown error');
                break
        }
    }
}