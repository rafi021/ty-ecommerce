import { PrismaClient } from "@prisma/client";

export const prismaclient = new PrismaClient({
  log: ["query", "info", "warn", "error"],
}).$extends({
  result: {
    address: {
      formattedAddress: {
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          postcode: true,
        },
        compute: (addr) => {
          return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}-${addr.postcode}, ${addr.country}`
        } 
      }
    }
  }
})