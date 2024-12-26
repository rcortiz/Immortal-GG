"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import _ from "lodash";

import { ITEMS } from "@/constants/items";
import { ROLES } from "@/constants/roles";
import { GET_PLAYER_DATA } from "@/graphql/getPlayerData";

import Spinner from "@/app/components/ui/Spinner";
import Badge from "@/app/components/ui/Badge";
import Alert from "@/app/components/ui/Alert";

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

  const { loading, error, data } = useQuery(GET_PLAYER_DATA, {
    variables: { steamAccountId: Number(steamAccountId) },
    skip: !steamAccountId,
  });

  if (error)
    return <Alert type="error" message="Unable to fetch leaderboard data." />;

  const player = data?.player || null;
  const steamAccount = player?.steamAccount || null;
  const matches = player?.matches || [];

  const getItemNameById = (id: number) => {
    const item = ITEMS.find((item) => item.id === id);
    return item
      ? {
          shortName: item.shortName,
          displayName: item.displayName || null,
        }
      : null;
  };

  const getRoles = (position: string) => {
    const role = ROLES.find((role) => role.role === position);
    return role ? role.name : null;
  };

  return (
    <div className="min-h-screen">
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto p-10">
          <div className="card flex h-[308px] items-center justify-center gap-y-3 bg-ui-card p-2">
            <div className="avatar">
              <div className="rounded-lg bg-white/5 p-3">
                <Image
                  src={
                    steamAccount?.avatar
                      ? steamAccount.avatar
                      : "/default_profile.png"
                  }
                  alt={steamAccount?.name || "Player"}
                  width={65}
                  height={65}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-lg font-bold">
                {steamAccount?.name || "Anonymous Player"}
              </h4>
              <div className="mt-2 flex gap-x-2 text-xs font-bold text-tx-secondary">
                <p>Dota Level: {steamAccount?.dotaAccountLevel || "N/A"}</p>
                <span className="mx-2">•</span>
                <p>Season Rank: {steamAccount?.seasonRank || "N/A"}</p>
                <span className="mx-2">•</span>
                <p>Matches Played: {player?.matchCount || 0}</p>
                <span className="mx-2">•</span>
                <p>Matches Won: {player?.winCount || 0}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            {!steamAccount?.isAnonymous ? (
              <>
                <h3 className="text-lg font-bold text-tx-primary">
                  Recent Matches
                </h3>
                <div className="overflow-x-hidden">
                  <table className="table border-separate border-spacing-y-1">
                    {matches.map((match, index) => (
                      <tbody key={index}>
                        {match.players.map((player, index) => (
                          <tr
                            key={index}
                            className="h-14 odd:bg-ui-accent-primary even:bg-ui-accent-secondary"
                          >
                            <td className="w-1/6">
                              <Image
                                src={`https://cdn.stratz.com/images/dota2/heroes/${player.hero.shortName}_horz.png`}
                                alt={player.hero.displayName}
                                className="rounded-md"
                                height={65}
                                width={65}
                              />
                            </td>
                            <td className="w-1/6">
                              <Badge type={player.isVictory ? "win" : "lose"} />
                            </td>
                            <td className="w-1/6">
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
                            <td className="w-1/6">
                              <div className="flex items-center justify-center">
                                <p>{player.kills}</p>
                                <span className="mx-2 opacity-25">/</span>
                                <p>{player.deaths}</p>
                                <span className="mx-2 opacity-25">/</span>
                                <p> {player.assists}</p>
                              </div>
                            </td>
                            <td className="w-1/6">{player.gold}</td>

                            <td className="w-1/6">
                              <div className="grid grid-cols-3 gap-2">
                                {_.range(6)
                                  .map(
                                    (i) =>
                                      player[`item${i}Id` as keyof MatchPlayer],
                                  )
                                  .filter(
                                    (id) => id !== null && id !== undefined,
                                  )
                                  .map((itemId, idx) => {
                                    const itemName = getItemNameById(
                                      Number(itemId),
                                    );
                                    return (
                                      <div
                                        className="tooltip"
                                        data-tip={itemName?.displayName}
                                        key={idx}
                                      >
                                        <Image
                                          src={`https://cdn.stratz.com/images/dota2/items/${itemName?.shortName}.png`}
                                          alt={`Item ${itemName?.shortName}`}
                                          height={45}
                                          width={45}
                                          className="rounded-md"
                                        />
                                      </div>
                                    );
                                  })}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ))}
                  </table>
                </div>
              </>
            ) : (
              <div className="card flex h-[180px] items-center justify-center bg-ui-card text-tx-primary">
                <Image
                  src="/anonymous.svg"
                  alt="Anonymouse"
                  height={40}
                  width={40}
                />
                <h3 className="mb-2 mt-4 font-bold">This profile is private</h3>
                <p className="text-sm">
                  The player has chosen to hide their match history
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
