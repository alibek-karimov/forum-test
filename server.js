/**
 * Created by Alibek on 13.04.2016.
 */

var app = require('./app');

app.listen(5555);
require('./api/controller')(app);
