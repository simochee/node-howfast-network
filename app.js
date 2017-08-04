const notifier = require('node-notifier');
const speedTest = require('speedtest-net');
const error = require('debug')('howfast:error');
const success = require('debug')('howfast:success');

const test = speedTest({
    maxTime: 5000,
});

test.on('data', (data) => {
    notifier.notify({
        title: 'ネットワークスピードを取得しました',
        message: `Upload: ${data.speeds.upload}Mbps, Download: ${data.speeds.download}Mbps`,
        icon: `${__dirname}/icon.png`,
        sound: true,
    });
    success(`Upload: ${data.speeds.upload}Mbps, Download: ${data.speeds.download}Mbps`);
});

test.on('error', (err) => {
    notifier.notify({
        title: 'ネットワークスピードが取得できませんでした',
        message: err,
        icon: `${__dirname}/icon.png`,
        sound: true,
    });
    error(JSON.stringify(err, null, '    '));
});
