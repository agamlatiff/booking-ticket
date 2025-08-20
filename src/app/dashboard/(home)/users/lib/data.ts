"use server";

import prisma from "../../../../../../lib/prisma";

export async function getCustomers() {
  try {
    const data = await prisma.user.findMany({
      where: {
        role: 'CUSTOMER'
      }
    })
    
    return data
  } catch (e) {
    console.log(e) 
    return []
  }
}
