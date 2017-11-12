const express = require('express');
const bodyParser = require('body-parser');
const req = require('request');
let DialogflowApp = require('actions-on-google').DialogflowApp;
const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());
restService.get('/', function (req, res) {
    console.log('start');
})

restService.get('/events', function (req, res) {
    console.log(req);
    const app = new DialogflowApp({ req, res });
    req.get('https://www.yepdesk.com/rest/v1/events', function (err, response, body) {
        console.log(err);
        console.log(response);
        console.log(body);
        return res.json(body);
        app.buildCarousel()
            .addItems([
                app.buildOptionItem(SELECTION_KEY_ONE,
                    ['synonym of KEY_ONE 1', 'synonym of KEY_ONE 2'])
                    .setTitle('Number one'),
                app.buildOptionItem(SELECTION_KEY_TWO,
                    ['synonym of KEY_TWO 1', 'synonym of KEY_TWO 2'])
                    .setTitle('Number two'),
            ])
    });
    // return res.json({
    //     speech: speech,
    //     displayText: speech,
    //     source: 'webhook-echo-sample'
    // });
});

restService.listen((process.env.PORT || 8000), function () {
    console.log("Server up and listening");
});