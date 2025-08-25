import type { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";
import { makeid } from "@/lib/utils";

export async function POST (request: NextRequest) {
  const body = await request.json()
  
  try {
    const transaction = await prisma.ticket.create({
      data: {
        bookingDate: body.bookingDate,
        price: body.price,
        status: 'PENDING',
        customerId: body.customerId,
        flightId: body.flightId,
        code: `TRX${makeid(7)}`,
        seatId: body.seatId
      }
    })
    
    await prisma.flightSeat.update({
      where: {
        id: transaction.seatId,
      },
      data: {
        isBooked: true
      }
    })
    
    return Response.json({transaction_id: transaction.id})
  }catch(error) {
    console.log(error)
    return Response.json({error}, {status: 500})
  }
}