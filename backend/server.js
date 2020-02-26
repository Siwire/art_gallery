const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = 'mongodb://localhost:27017';
const app = express();
const Size = require('./modules/size');
const Style = require('./modules/style');
const Color = require('./modules/color');
const Picture = require('./modules/picture');
const cors = require('cors');
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

Size.countDocuments().then((count) => {
  if (!count) {
    const sizes = [
      {name: 'A1'},
      {name: 'A2'},
      {name: 'A3'},
      {name: 'A4'},
      {name: 'A5'},
    ];
    Size.insertMany(sizes);
  }
});
Style.countDocuments().then((count) => {
  if (!count) {
    const styles = [
      {name: 'pencil'},
      {name: 'pastel'},
      {name: 'watercolor'},

    ];
    Style.insertMany(styles);
  }
});
Color.countDocuments().then((count) => {
  if (!count) {
    const colors = [
      {name: 'black'},
      {name: 'grey'},
      {name: 'green'},
      {name: 'red'},
      {name: 'yellow'},
    ];
    Color.insertMany(colors);
  }
});
require('./pictures_routes')(app);
  app.listen(port, () => {
    console.log('Live on ' + port);
  });



// Picture.findById('5e558bb2d70f7541e804dcfe').populate('size').populate('style').populate('color').then((picture) => {
//   console.log(picture, 'asdasdsad');
// });

// Style.create({name: 'pencil'}).then((savedStyle) => {
//   Size.create({name: 'A2'}).then((savedSize) => {
//     Color.create({name: 'black'}).then((savedColor) => {
//       Picture.create({
//         title: 'aaa',
//         route: 'sadasd',
//         size: savedSize._id,
//         style: savedStyle._id,
//         color: savedColor._id
//       })
//       console.log(savedStyle, 'savedStyle');
//       console.log(savedSize, 'savedSize');
//       console.log(savedColor, 'savedColor');
//     });
//   });
// });


const pic = new Picture({ name: 'Winter' });
pic.save().then(() => console.log('wow'))


  // const mongoClient = new MongoClient(db, { useNewUrlParser: true, useUnifiedTopology: true });
  // mongoClient.connect(async (err, client) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   const database = client.db('pictures');
  //   const pictureCollection = await database.createCollection("pictures",
  //     {
  //       route: String,
  //       name: String,
  //       size: [],
  //     }
  //   )
  //   const sizeCollection = await database.createCollection("size",
  //     {
  //       size: String, 
  //     }
  //   )
  //   const styleCollection = await database.createCollection("style",
  //     {
  //       style: String, 
  //     }
  //   )
  //   const colorCollection = await database.createCollection("color",
  //     {
  //       color: String, 
  //     }
  //   )
  //   require('./backend/picture_routes')(app, pictureCollection);
  //   app.listen(port, () => {
  //     console.log('Live on ' + port);
  //   require('./backend/size_routes')(app, sizeCollection);
  //   app.listen(port, () => {
  //     console.log('Live on ' + port);
  //   });
  // });