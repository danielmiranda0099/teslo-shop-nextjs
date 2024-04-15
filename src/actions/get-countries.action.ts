'use server'

import prisma from "@/lib/prisma";

export async function GetCountries() {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return countries;
  } catch (error) {
    return [];    
  }
}