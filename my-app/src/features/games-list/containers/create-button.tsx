'use client';

import { Button } from "@/shared/ui/button";
import { createGameAction } from "../actions/create-game";

export async function CreateButton() {

  return <Button onClick={createGameAction}>Создать игру</Button>
  
}