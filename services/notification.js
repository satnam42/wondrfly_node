"use strict";

const deleteNotification = async (query, context) => {
    const log = context.logger.start(`services:notification:deleteNotification:${query.id}`);
    if (!query.id) {
        throw new Error("notification id is required");
    }
    if (!query.userId) {
        throw new Error("user id is required");
    }
    await db.notification.deleteOne({ _id: query.id, user: query.userId });
    log.end();
    return 'notification is removed'
};

const notificationOnOff = async (query, context) => {
    const log = context.logger.start(`services:notification:notificationOnOff:${query.id}`);
    if (!query.id) {
        throw new Error("user id is required");
    }
    await db.user.findByIdAndUpdate(query.id, {
        $set: {
            notificationsOnOff: query.status,
        }
    })
    if (query.status == 'true') {
        return 'notifications enabled successfully'
    }
    if (query.status == 'false') {
        return 'notifications disabled successfully'
    }
    log.end();
};

exports.deleteNotification = deleteNotification;
exports.notificationOnOff = notificationOnOff;