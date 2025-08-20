'use server'

import prisma from "../../../../../../lib/prisma"

export async function getTickets () {
  try {
    const data = await prisma.ticket.findMany({
      include :{
        flight: true,
        customer: true,
        seat: true
      }
    })
    
    return data
  } catch(e) {
    console.log(e)
    return []
  }
}