const mongoose = require('mongoose');

const { connect, connection } = require('mongoose');
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

    // const mongoURI = process.env.MONGO_URI
    // const mongoURI = 'mongodb+srv://Prajwal:Prajwal@123@taskmanager.qf7ewkg.mongodb.net/?retryWrites=true&w=majority'
    // const connectDB = (url)=>{
    //   return mongoose.connect(mongoURI,{
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    //     useUnifiedTopology: true,
    //   })
    // }
module.exports = connectDB