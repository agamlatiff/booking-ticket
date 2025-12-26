import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import prisma from "../../../../../lib/prisma";
import { createSnapTransaction } from "@/lib/midtrans";

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const { session } = await getUser();
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { flightId, seatId, seatType } = body;

    if (!flightId || !seatId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get flight data
    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
      include: { plane: true },
    });

    if (!flight) {
      return NextResponse.json(
        { error: "Flight not found" },
        { status: 404 }
      );
    }

    // Get seat data
    const seat = await prisma.flightSeat.findUnique({
      where: { id: seatId },
    });

    if (!seat) {
      return NextResponse.json(
        { error: "Seat not found" },
        { status: 404 }
      );
    }

    if (seat.isBooked) {
      return NextResponse.json(
        { error: "Seat is already booked" },
        { status: 400 }
      );
    }

    // Calculate price based on seat type
    const seatMultipliers: Record<string, number> = {
      ECONOMY: 1,
      BUSSINESS: 1.5,
      FIRST: 2.5,
    };
    const multiplier = seatMultipliers[seatType] || 1;
    const totalPrice = Math.round(flight.price * multiplier);

    // Generate unique order ID
    const orderId = `FH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create Snap transaction
    const transaction = await createSnapTransaction({
      orderId,
      grossAmount: totalPrice,
      customerDetails: {
        firstName: session.name?.split(" ")[0] || "Customer",
        lastName: session.name?.split(" ").slice(1).join(" ") || "",
        email: session.email || "",
      },
      itemDetails: [
        {
          id: flightId,
          name: `${flight.departureCity} - ${flight.destinationCity} (${seat.seatNumber})`,
          price: totalPrice,
          quantity: 1,
        },
      ],
    });

    // Create pending ticket in database
    await prisma.ticket.create({
      data: {
        code: orderId,
        flightId,
        seatId,
        customerId: session.id,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      orderId,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}
