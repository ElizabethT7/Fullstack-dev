"use server"

import { createGame } from "@/entities/game/server";
import { prisma } from "@/shared/lib/db";
import { errorType } from "@/shared/lib/either";
import { redirect } from "next/navigation";


export const createGameAction = async () => {
  const user = await prisma.user.findFirst();

  if(!user){
    return errorType('user-not-found' as const);
  }
  const gameResult = await createGame(user);

  if(gameResult.type === "success"){
    redirect(`/game/${gameResult.value.id}`);
  }
  return gameResult;
};