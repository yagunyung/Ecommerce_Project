/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { createCart, getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQunatity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const findItem = cart.items.find((item) => item.productId === productId);

  if (findItem) {
    await prisma.cartItem.update({
      where: { id: findItem.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }

  revalidatePath("/products/[id]", 'page');
}
