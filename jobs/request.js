const cron = require('node-cron');

exports.schedule = async logger => {
    // start(`* * 5 * * *`, logger)
    // {
    //     console.log('running a task every minute');
    // }
    cron.schedule('*/5 * * * * *', function () {
        console.log('running a task every 5 seconds');
    });
}

// cron.schedule('* * * * *', function () {
//     console.log('running a task every minute');
// });