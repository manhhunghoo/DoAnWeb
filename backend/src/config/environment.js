import "dotenv/config";

// Assign process.env variable to env

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,

  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,

  BUILD_MODE: process.env.BUILD_MODE,

  CLOUDINARY: {
    cloud_name: 'dcyws1o4f',
    api_key: '817743517582641',
    api_secret: 'x-xI2OceZPMbjHIE1Kp0_WEe1mA',
  }
};
