const ncp = require('ncp').ncp;

ncp.limit = 16;

ncp('./src/public', './dist/public', function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('Public folder copied successfully!');
});
