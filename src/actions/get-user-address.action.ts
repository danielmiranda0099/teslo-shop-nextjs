'use server'

import prisma from "@/lib/prisma"

export async function GetUserAddress(userId: string) {
  try{
    const address = await prisma.userAddress.findUnique({
      where: {userId},
    })

    if(!address) {
      return {
        ok: true,
        data: undefined,
      }
    }

    const { countryId, address2, lastname, ...rest } = address;

    return {
      ok: true,
      data: {
        ...rest,
        address2: address2 ?? "",
        country: countryId,
        lastName: lastname
      },
    }
  }
  catch(error){
    console.log('****** Error Get User Address', error)
    return {
      ok: false,
      message: "Error Get User Address",
      error
    }
  }
}