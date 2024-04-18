'use server'
import prisma from "@/lib/prisma"

export async function DeleteUserAddress(userId: string) {
  try {
    await prisma.userAddress.delete(
      {
        where: {userId}
      }
    )

    return {
      ok: true,
    }
  }
  catch(error){
    return {
        ok: false,
        messagge: 'Error Delete User Address',
        error
    }
  }
}