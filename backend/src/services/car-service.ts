import prisma from "../db/prisma";

const carService = {
    async getAllCars() {
        try {
            const cars = await prisma.car.findMany();
            return cars;
          } catch (err) {
            // throw new HttpError(
            //   "Something went wrong",
            //   HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
            // );
          }
    }
};

export default carService;
