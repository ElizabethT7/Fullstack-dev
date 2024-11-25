import { GamesList } from "@/features/games-list/server";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 container mx-auto pt-[120px]">
      <h1 className="text-2xl font-extrabold">Игры</h1>
      <GamesList />
    </div>
  );
}
