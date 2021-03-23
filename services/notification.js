"use strict";

const deleteNotification = async (query, context) => {
    const log = context.logger.start(`services:notification:deleteNotification:${query.id}`);
    if (!query.id) {
        throw new Error("notification id is required");
    }
    await db.notification.deleteOne({ _id: query.id, user: query.userId });
    log.end();
    return 'notification is removed'
};

exports.deleteNotification = deleteNotification;