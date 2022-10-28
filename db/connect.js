const mongoose = require('mongoose');
const { connect, connection } = require('mongoose');




// const url = process.env.MONGO_URI
// const connectDB = ()=>{
//     return mongoose.connect(url,{
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//     })
// }

const connectDB = _ => {
    const mongoURI = process.env.MONGO_URI
    try {
      connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error('Initial Database Connection Error!', err);
    }
  
    connection.on('connected', _ =>
      console.log('Database connected ==> ', mongoURI)
    );
  
    connection.on('error', err =>
      console.error('Database Connection Error!\n', err)
    );
  
  };

module.exports = connectDB