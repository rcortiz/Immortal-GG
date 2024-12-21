"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { GET_PLAYER_DATA } from "@/graphql/getPlayerData";

interface GuildData {
  name: string;
}
interface Guild {
  guilId: number;
  guild: GuildData;
}

interface Hero {
  id: number;
  name: string;
  displayName: string;
  shortName: string;
}

interface MatchPlayer {
  hero: Hero;
  gold: number;
  kills: number;
  deaths: number;
  assists: number;
  position: string;
  role: string;
  item0Id?: number | null;
  item1Id?: number | null;
  item2Id?: number | null;
  item3Id?: number | null;
  item4Id?: number | null;
  item5Id?: number | null;
}

interface Match {
  didRadiantWin: boolean;
  players: MatchPlayer[];
}

interface SteamAccount {
  name: string;
  id: number;
  profileUri: string;
  timeCreated: number;
  avatar: string;
  dotaAccountLevel: number;
  seasonRank: number;
  isAnonymous: boolean;
  guild: Guild | null;
}

interface Player {
  steamAccount: SteamAccount;
  winCount: number;
  matchCount: number;
  matches: Match[];
}

interface PlayerData {
  player: Player;
}

export default function PlayerProfilePage() {
  const pathname = usePathname();
  const steamAccountId = pathname.split("/")[2];

  const { loading, error, data } = useQuery<PlayerData>(GET_PLAYER_DATA, {
    variables: { steamAccountId: Number(steamAccountId) },
    skip: !steamAccountId,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading player data: {error.message}</div>;

  const player = data?.player;
  const steamAccount = player?.steamAccount;
  if (!steamAccount) {
    return <div>No player data available.</div>;
  }

  const matches = player?.matches || [];

  console.log(matches);
  return (
    <div className="container mx-auto h-screen p-10">
      <div className="card flex h-[308px] items-center justify-center gap-y-3 bg-ui-card p-2">
        <div className="avatar">
          <div className="rounded-full">
            <Image
              src={steamAccount.avatar}
              alt={steamAccount.name || "Player"}
              width={65}
              height={65}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-bold">{steamAccount.name}</h4>
          <div className="mt-2 flex gap-x-2 text-xs font-bold text-tx-secondary">
            <p>Dota Level: {steamAccount.dotaAccountLevel}</p>
            <p>Season Rank: {steamAccount.seasonRank}</p>
            <p>Matches Played: {player.matchCount}</p>
            <p>Matches Won: {player.winCount}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-tx-primary">Recent Matches</h3>
        <div className="card">
          <table className="table border-separate border-spacing-y-1">
            {matches.map((match, index) => (
              <tbody key={index}>
                {match.players.map((player, index) => (
                  <tr key={index}>
                    <td className="w-80">
                      <Image
                        src={`http://cdn.dota2.com/apps/dota2/images/heroes/${player.hero.shortName}_full.png`}
                        alt={player.hero.displayName}
                        className="rounded-md"
                        height={50}
                        width={60}
                      />
                    </td>
                    <td className="w-50">
                      {player.kills} / {player.deaths} / {player.assists}
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
