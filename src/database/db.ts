import { prisma } from "../lib/prisma";

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database Connected Successfully.");
  } catch (error) {
    console.log(error);
  }
};
const disConnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("Database Disconnected Successfully.");
  } catch (error) {
    console.log(error);
  }
};

export const db = {
  connectDB,
  disConnectDB,
};
