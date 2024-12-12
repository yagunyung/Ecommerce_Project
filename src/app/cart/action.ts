"use server";

import { createCart, getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const findItem = cart.items.find((item) => item.productId == productId);

  if (quantity === 0) {
    if (findItem) {
      await prisma.cartItem.delete({
        where: { id: findItem.id },
      });
    }
  } else {
    if (findItem) {
      await prisma.cartItem.update({
        where: { id: findItem.id },
        data: { quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }
  }

  revalidatePath("/cart");
}
