const notifier = require('node-notifier');
const speedTest = require('speedtest-net');
const path = require('path');
const log = require('debug')('howfast:log');
const error = require('debug')('howfast:error');
const success = require('debug')('howfast:success');

const test = speedTest({
    maxTime: 5000,
});

log('取得しています。しばらくお待ちください...');

test.on('data', (data) => {
    notifier.notify({
        title: 'ネットワークスピードを取得しました',
        message: `Upload: ${data.speeds.upload}Mbps, Download: ${data.speeds.download}Mbps`,
        icon: path.join(__dirname, 'icon.png'),
        sound: true,
    });
    success(`Upload: ${data.speeds.upload}Mbps, Download: ${data.speeds.download}Mbps`);
});

test.on('error', (err) => {
    notifier.notify({
        title: 'ネットワークスピードが取得できませんでした',
        message: err,
        icon: path.join(__dirname, 'icon.png'),
        sound: true,
    });
    error(JSON.stringify(err, null, '    '));
});
