var admin = require("firebase-admin");

const pushNotification = async (to, from, msg) => {

    const user = await db.users.findOne({ "username": { $eq: to } })

    if (user) {

        // var serviceAccount = require("../firebase-truckapp.json");
        let deviceToken = user.deviceToken

        if (!deviceToken) {
            return console.log("device Token not found")
        }

        // See the "Defining the message payload" section above for details
        // on how to define a message payload.

        var payload = {
            notification: {
                title: ` new message from ${from}`,
                body: msg
            }
        };

        // Set the message as high priority and have it expire after 24 hours.

        var options = {
            priority: 'high',
            timeToLive: 60 * 60 * 24
        };

        // Send a message to the device corresponding to the provided
        // registration token with the provided options.

        admin.messaging().sendToDevice(deviceToken, payload, options)
            .then(function (response) {
                console.log('Successfully sent message:', response);
            })
            .catch(function (error) {
                console.log('Error sending message:', error);
            });
    }
    else {
        console.log('user not Found')
        return 'user not Found'
    }

}


exports.pushNotification = pushNotification