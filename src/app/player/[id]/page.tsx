"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";

import { GET_PLAYER_DATA } from "@/graphql/getPlayerData";

export default function PlayerProfilePage() {
  const pathname = usePathname();
  const steamAccountId = pathname.split("/")[2];

  console.log(typeof steamAccountId);

  const { loading, error, data } = useQuery(GET_PLAYER_DATA, {
    variables: { steamAccountId: Number(steamAccountId) },
    skip: !steamAccountId,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading player data: {error.message}</div>;

  console.log(data);
  const player = data?.player;
  console.log(player);
  return (
    <div>
      <h2>Player Profile</h2>
      <p>{player.winCount || " "}</p>
    </div>
  );
}
