'use client';

import { Button } from "@/shared/ui/button";
import { createGameAction } from "../actions/create-game";
import { useActionState } from "@/shared/lib/react";
import { mapErrorType, successType } from "@/shared/lib/either";
import { startTransition } from "react";

export function CreateButton() {
  const [state, dispatch, isPending] = useActionState(createGameAction, successType(undefined));

  return (
    <div className="flex flex-col gap-1">
      <Button 
        disabled={isPending} 
        onClick={() => startTransition(dispatch)} 
        error={
        mapErrorType(state, 
         (e) => ({
            ['cant-create-only-one-game']: 'Вы можете создать толко одну игру',
            ['user-not-found']: 'Пользователь не найден'
          })[e]
        )
      }>Создать игру</Button>
    </div>
  )
}