"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { ITEMS } from "@/constants/items";
import { ROLES } from "@/constants/roles";
import { GET_PLAYER_DATA } from "@/graphql/getPlayerData";
import { formatRelativeTime, formatToMinutesAndSeconds } from "@/lib/date-fns";

import Spinner from "@/app/components/ui/Spinner";
import Badge from "@/app/components/ui/Badge";
import Alert from "@/app/components/ui/Alert";

interface GuildData {
  name: string;
  tag: string;
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
  isVictory: boolean;
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
  backpack0Id?: number | null;
  backpack1Id?: number | null;
  backpack2Id?: number | null;
  neutral0Id?: number | null;
  networth: number;
  numLastHits: number;
  numDenies: number;
  isRadiant: boolean;
}

interface Match {
  didRadiantWin: boolean;
  endDateTime: number;
  durationSeconds: number;
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

function PlayerProfile({
  steamAccount,
}: {
  steamAccount: SteamAccount | null;
}) {
  if (!steamAccount) return null;

  return (
    <div className="card flex h-[308px] items-center justify-center gap-y-3 bg-ui-card p-2">
      <div className="avatar">
        <Image
          src={
            steamAccount?.avatar ? steamAccount.avatar : "/default_profile.png"
          }
          alt={steamAccount?.name || "Player"}
          width={65}
          height={65}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="space-x-2">
          <span className="text-lg font-bold">
            {steamAccount?.name || "Anonymous Player"}
          </span>
          {steamAccount.guild && (
            <div className="tooltip" data-tip={steamAccount.guild.guild.name}>
              <span>[{steamAccount.guild.guild.tag}]</span>
            </div>
          )}
        </div>

        <div className="mt-2 flex gap-x-2 text-xs font-bold text-tx-secondary">
          <p>Dota Level: {steamAccount?.dotaAccountLevel || "N/A"}</p>
          <span className="mx-2">•</span>
          <p>Season Rank: {steamAccount?.seasonRank || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

function MatchTable({ matches }: { matches: Match[] }) {
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
    <div className="overflow-y-auto">
      <table className="table border-separate border-spacing-y-1">
        <tbody>
          {matches.flatMap((match, matchIndex) =>
            match.players.map((player, playerIndex) => {
              const endDateTime = formatRelativeTime(match.endDateTime);
              const duration = formatToMinutesAndSeconds(match.durationSeconds);
              return (
                <tr
                  key={`${matchIndex}-${playerIndex}`}
                  className="p-2 odd:bg-ui-accent-primary even:bg-ui-accent-secondary"
                >
                  <td className="w-1/8">
                    <Image
                      src={`https://cdn.stratz.com/images/dota2/heroes/${player.hero.shortName}_horz.png`}
                      alt={player.hero.displayName || "Hero"}
                      className="rounded-md"
                      height={65}
                      width={65}
                      loading="lazy"
                    />
                  </td>
                  <td className="w-1/8">
                    <Badge type={player.isVictory ? "win" : "lose"} />
                  </td>

                  <td className="w-1/8">
                    {player.position ? (
                      <div className="flex items-center gap-x-2">
                        <Image
                          src={`/${player.position}.png`}
                          alt={`Position: ${player.position}`}
                          width={23}
                          height={23}
                          className="rounded-sm"
                        />
                        <p>{getRoles(player.position)}</p>
                      </div>
                    ) : null}
                  </td>
                  <td className="w-1/8">
                    <div className="flex items-center">
                      <p>{player.kills}</p>
                      <span className="mx-2 opacity-25">/</span>
                      <p>{player.deaths}</p>
                      <span className="mx-2 opacity-25">/</span>
                      <p>{player.assists}</p>
                    </div>
                  </td>
                  <td className="w-1/8">
                    <div className="flex items-center space-x-6">
                      <div className="flex flex-row items-center">
                        <Image
                          src="/sword.svg"
                          alt="Anonymous"
                          height={16}
                          width={16}
                          className="mr-2"
                        />
                        <span> {player.numLastHits}</span>
                      </div>
                      <div className="flex flex-row items-center">
                        <Image
                          src="/skull.svg"
                          alt="Anonymous"
                          height={16}
                          width={16}
                          className="mr-2"
                        />
                        <span> {player.numDenies}</span>
                      </div>
                    </div>
                  </td>
                  <td className="w-1/8">
                    <div className="flex items-center space-x-2">
                      <div className="tooltip" data-tip="networth">
                        <Image
                          src="/gold.svg"
                          alt="Anonymous"
                          height={16}
                          width={16}
                          className="ml-4"
                        />
                      </div>
                      <span> {player.networth}</span>
                    </div>
                  </td>
                  <td className="w-1/8">
                    <div className="grid h-[75px] w-[160px] grid-cols-3 gap-2">
                      {Array.from({ length: 6 }).map((_, i) => {
                        const itemId = player[
                          `item${i}Id` as keyof MatchPlayer
                        ] as number | null;
                        if (itemId) {
                          const itemName = getItemNameById(itemId);
                          return (
                            <div
                              className="tooltip"
                              data-tip={itemName?.displayName}
                              key={`item-${i}`}
                            >
                              <Image
                                src={`https://cdn.stratz.com/images/dota2/items/${itemName?.shortName}.png`}
                                alt={`Item: ${itemName?.displayName}`}
                                fill={true}
                                className="rounded-lg object-fill"
                                loading="lazy"
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className="rounded-lg bg-white/10"
                              key={`placeholder-${i}`}
                            ></div>
                          );
                        }
                      })}
                    </div>
                  </td>
                  <td className="w-1/8">
                    <div className="flex flex-col items-end">
                      <span>{duration}</span>
                      <span>{endDateTime}</span>
                    </div>
                  </td>
                </tr>
              );
            }),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function PlayerProfilePage() {
  const pathname = usePathname();
  const steamAccountId = pathname.split("/")[2];

  const { loading, error, data } = useQuery<PlayerData>(GET_PLAYER_DATA, {
    variables: { steamAccountId: Number(steamAccountId) },
    skip: !steamAccountId,
  });

  if (error)
    return <Alert type="error" message="Unable to fetch leaderboard data." />;

  const player = data?.player || null;
  const steamAccount = player?.steamAccount || null;

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <PlayerProfile steamAccount={steamAccount} />
          <div className="mt-4">
            {steamAccount?.isAnonymous ? (
              <div className="card flex h-[180px] items-center justify-center bg-ui-card text-tx-primary">
                <Image
                  src="/anonymous.svg"
                  alt="Anonymous profile icon"
                  height={40}
                  width={40}
                />
                <h3 className="mb-2 mt-4 font-bold">This profile is private</h3>
                <p className="text-sm">
                  The player has chosen to hide their match history
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-tx-primary">
                  Recent Matches
                </h3>
                <MatchTable matches={player?.matches || []} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
