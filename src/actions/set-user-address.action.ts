'use server'

import type { Address } from "@/interfaces"
import prisma from "@/lib/prisma"

export async function SetUserAddress(address: Address, userId: string) {
  try {
    const newAddress = await CreateOrRemplaceAddress(address, userId);

    return {
      ok: true,
      data: newAddress,
    }
  }catch (error) {
    return {
      ok: false,
      message: "Error Set User Address"
    }
  }
}

async function CreateOrRemplaceAddress(address: Address, userId: string) {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId
      }
    });

    const {country, city, lastName,...rest} = address;
    const addressToSave = {
      ...rest,
      lastname: address.lastName,
      userId,
      countryId: address.country,
      city: address.city
    }

    if( !storedAddress ){
      const newAddress = await prisma.userAddress.create({
        data: {
         ...addressToSave
        }
      });

      return newAddress;
    }

    const updateAddress = await prisma.userAddress.update({
      where: {userId},
      data: {
        ...addressToSave
      }
    })

    return updateAddress;

  }catch (error) {
    throw new Error( `{
      ok: false,
      message: "Error Create Or Remplace Address"
      error: ${error}
    }`)
  }
}