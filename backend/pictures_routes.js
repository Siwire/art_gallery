const Size = require('./modules/size');
const Style = require('./modules/style');
const Color = require('./modules/color');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = function (app, cityCollection) {
    // app.get('/cities', async (req, res) => {
    //   const cityList = await cityCollection.find().toArray();
    //   res.send(cityList);
    // });
    app.post('/initdata', upload.single('file'), (req, res) => {
        const pictureInfo = req.body;
        const path = `${req.file.destination}/${req.file.originalname}`;
        
    });
    app.get('/initdata', async (req, res) => {
        const sizes = await Size.find();
        const styles = await Style.find();
        const colors = await Color.find();
        res.send({sizes: sizes, styles: styles, colors: colors});
    });
  };