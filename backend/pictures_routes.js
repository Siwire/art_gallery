const Size = require('./modules/size');
const Style = require('./modules/style');
const Color = require('./modules/color');
const Picture = require('./modules/picture')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'uploads/') },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage })

module.exports = function (app, cityCollection) {

    app.post('/picture', upload.single('file'), async (req, res) => {
        const pictureInfo = req.body;
        const path = `${req.file.originalname}`;
        const savedPicture = await Picture.create({ title: pictureInfo.title, route: path, size: pictureInfo.size, style: pictureInfo.style, color: pictureInfo.colors })
        res.send(savedPicture);
    });

    app.get('/initdata', async (req, res) => {
        const sizes = await Size.find();
        const styles = await Style.find();
        const colors = await Color.find();
        res.send({ sizes: sizes, styles: styles, colors: colors });
    });
    app.get('/picture', async (req, res) => {
        const pictures = await Picture.find().populate('size').populate('style').populate('color');
        const newPictures = pictures.map((picture) => {
            const pictureRoute = `http://localhost:8000/picturefile?path=${picture.route}`;
            return { ...picture._doc, route: pictureRoute };
        });
        res.send({ pictures: newPictures });
    });

    app.get('/picturefile', async (req, res) => {
        const path = req.query.path;
        res.sendFile(path, { root: './uploads/'});
    });
};