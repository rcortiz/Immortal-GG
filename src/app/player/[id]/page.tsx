"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import _ from "lodash";

import { ITEMS } from "@/constants/items";
import { ROLES } from "@/constants/roles";
import { GET_PLAYER_DATA } from "@/graphql/getPlayerData";

import Badge from "@/app/components/ui/Badge";

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

  const getItemNameById = (id: number) => {
    const item = ITEMS.find((item) => item.id === id);
    return item ? item.shortName : null;
  };

  const getRoles = (position: string) => {
    const role = ROLES.find((role) => role.role === position);
    return role ? role.name : null;
  };

  console.log(matches);
  return (
    <div className="container mx-auto p-10">
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
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-1">
              {matches.map((match, index) => (
                <tbody key={index}>
                  {match.players.map((player, index) => (
                    <tr key={index}>
                      <td className="w-1/5">
                        <Image
                          src={`https://cdn.stratz.com/images/dota2/heroes/${player.hero.shortName}_horz.png`}
                          alt={player.hero.displayName}
                          className="rounded-md"
                          height={60}
                          width={60}
                        />
                      </td>

                      <td className="w-1/5">
                        {player.kills} / {player.deaths} / {player.assists}
                      </td>
                      <td className="w-1/5">{player.gold}</td>
                      <td className="w-1/5">
                        <div className="flex items-center gap-x-2">
                          <Image
                            src={`/${player.position}.png`}
                            alt={player.position}
                            width={23}
                            height={23}
                            className="rounded-sm"
                          />
                          <p>{getRoles(player.position)}</p>
                        </div>
                      </td>
                      <td className="w-1/5">
                        <div className="grid grid-cols-3 gap-1">
                          {_.range(6)
                            .map(
                              (i) => player[`item${i}Id` as keyof MatchPlayer],
                            )
                            .filter((id) => id !== null && id !== undefined)
                            .map((itemId, idx) => {
                              const itemName = getItemNameById(Number(itemId));
                              return (
                                <Image
                                  key={idx}
                                  src={`https://cdn.stratz.com/images/dota2/items/${itemName}.png`}
                                  alt={`Item ${itemId}`}
                                  height={45}
                                  width={45}
                                  className="rounded-md"
                                />
                              );
                            })}
                        </div>
                      </td>
                      <td className="w-1/5">
                        <Badge type="win" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
