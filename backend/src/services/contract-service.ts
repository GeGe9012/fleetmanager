import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";
import { NewContractData } from "../interfaces/serviceInterfaces";

const contractService = {
  async getAllContracts(filters: Record<string, any> = {}) {
    console.log(filters)
    try {
      const whereClause: Record<string, any> = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (value.includes("%")) {
            whereClause[key] = {
              contains: value.replace(/%/g, ""),
              mode: "insensitive",
            };
          } else {
            whereClause[key] = { startsWith: value, mode: "insensitive" };
          }
        }
      });
      const contracts = await prisma.contract.findMany({ where: whereClause });
      return contracts;
    } catch (err) {
      throw new HttpError(
        "Something went wrong",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },

  async createContract(data: NewContractData) {
    try {
      const contractNumber = await generateContractNumber();

      const newContract = await prisma.contract.create({
        data: {
          contract_number: contractNumber,
          license_plate: data.license_plate,
          customer_name: data.customer_name,
          company_name: data.company_name,
          contract_exp: data.contract_exp,
          car: { connect: { id: data.car_id as string } },
          customer: { connect: { id: data.customer_id as string } },
          company: { connect: { id: data.company_id as string } },
        },
      });

      const updatedCar = await prisma.car.update({
        where: { id: data.car_id },
        data: { contract_id: newContract.id },
      });

      const updatedCustomer = await prisma.customer.update({
        where: { id: data.customer_id },
        data: {
          contracts: {
            connect: { id: newContract.id },
          },
        },
      });

      const updatedCompany = await prisma.company.update({
        where: { id: data.company_id },
        data: {
          contracts: {
            connect: { id: newContract.id },
          },
        },
      });

      return {
        contract: newContract,
        car: updatedCar,
        customer: updatedCustomer,
        company: updatedCompany,
      };
    } catch (err: any) {
      if (err.code === "P2014") {
        throw new HttpError(
          "The car already has an active contract!",
          HTTP_STATUS_CODES.BAD_REQUEST
        );
      } else {
        throw new HttpError(
          "Contract could not be created.",
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        );
      }
    }
  },

  async deleteContract(contractId: string) {
    try {
      await prisma.car.updateMany({
        where: { contract_id: contractId },
        data: { contract_id: null },
      });

      const deletedContract = await prisma.contract.delete({
        where: { id: contractId },
      });

      return deletedContract;
    } catch (err) {
      console.error(err);
      throw new HttpError(
        "Contract could not be deleted.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

async function generateContractNumber() {
  const currentYear = new Date().getFullYear();
  const prefix = `${currentYear}TFM`;

  const lastContract = await prisma.contract.findFirst({
    where: { contract_number: { startsWith: prefix } },
    orderBy: { contract_number: "desc" },
  });

  let newNumber = 1;

  if (lastContract) {
    const lastNumber = parseInt(lastContract.contract_number.slice(-3), 10);
    newNumber = lastNumber + 1;
  }

  const newContractNumber = `${prefix}${String(newNumber).padStart(3, "0")}`;
  return newContractNumber;
}

export default contractService;
