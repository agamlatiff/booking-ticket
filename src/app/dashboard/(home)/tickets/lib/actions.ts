"use server";

import prisma from "../../../../../../lib/prisma";
import type { StatusTicket } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateTicketStatus(
  ticketId: string,
  status: StatusTicket
) {
  try {
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
    });

    revalidatePath("/dashboard/tickets");
    return { success: true };
  } catch (error) {
    console.error("Failed to update ticket status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function getTicketById(ticketId: string) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        flight: {
          include: {
            plane: true,
          },
        },
        customer: true,
        seat: true,
      },
    });

    return ticket;
  } catch (error) {
    console.error("Failed to fetch ticket:", error);
    return null;
  }
}
