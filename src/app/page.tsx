"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import RegionFilter from "./components/ui/RegionFilter";
import Spinner from "./components/ui/Spinner";

import { GET_LEADERBOARD } from "@/graphql/getLeaderboard";
import Alert from "./components/ui/Alert";

interface Team {
  name: string;
  logo: string;
}

interface ProSteamAccount {
  team: Team;
}

interface SteamAccount {
  id: number;
  isAnonymous: boolean;
  profileUri: string;
  countryCode: string;
  name: string;
  avatar: string;
  seasonRank: number;
  proSteamAccount: ProSteamAccount;
}

interface Player {
  steamAccount: SteamAccount;
  rank: number;
  avgImp: number | null;
  winRate: number | null;
  divisionId: string;
  lastUpdateDateTime: number;
  position: string;
}

interface Leaderboard {
  season: {
    playerCount: number;
    players: Player[];
  };
}

interface LeaderboardData {
  leaderboard: Leaderboard;
}

export default function HomePage() {
  const router = useRouter();
  const [region, setRegion] = useState("SE_ASIA");

  const handleRegionSelect = (selectedRegion: string) => {
    setRegion(selectedRegion);
  };

  const handleRowClick = (steamAccountId: number) => {
    router.push(`/player/${steamAccountId}`);
  };

  const { loading, error, data } = useQuery<LeaderboardData>(GET_LEADERBOARD, {
    variables: { leaderBoardDivision: region.toUpperCase() },
  });

  const players = data?.leaderboard.season?.players;
  const playerCount = data?.leaderboard.season?.playerCount;

  if (error)
    return <Alert type="error" message="Unable to fetch leaderboard data." />;

  return (
    <div>
      <div className="card bg-ui-card p-4">
        <div className="space-y-2 pb-4">
          <h1 className="mt-4 text-2xl font-bold text-tx-primary">
            World Leaderboard - {region.toUpperCase().replace("_", " ")}
          </h1>
          <RegionFilter onRegionSelect={handleRegionSelect} />
          <h4 className="pt-4 text-xl font-semibold text-tx-primary">
            Top 100 Players
          </h4>
          <p className="text-xs">Showing results for {playerCount}</p>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto">
            <table className="table border-separate border-spacing-y-1">
              <thead>
                <tr className="text-tx-secondary">
                  <th>Rank</th>
                  <th></th>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {players && players.length > 0 ? (
                  <>
                    {players.map((player) => {
                      return (
                        <tr
                          key={player.steamAccount.id}
                          className="h-14 cursor-pointer overflow-hidden rounded-lg text-tx-primary odd:bg-ui-accent-primary even:bg-ui-accent-secondary"
                          onClick={() => handleRowClick(player.steamAccount.id)}
                        >
                          <td>{player.rank}</td>
                          <td>
                            {player.position ? (
                              <div
                                className="tooltip"
                                data-tip={player.position}
                              >
                                <Image
                                  src={`/${player.position}.png`}
                                  alt={player.position}
                                  width={23}
                                  height={23}
                                  className="rounded-sm"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            <div className="flex items-center">
                              {player.steamAccount.isAnonymous && (
                                <div
                                  className="tooltip"
                                  data-tip="The player has chosen to hide their match history"
                                >
                                  <Image
                                    src="/question-mark.svg"
                                    alt="Anonymouse"
                                    height={16}
                                    width={16}
                                    className="mr-4"
                                  />
                                </div>
                              )}

                              <p>{player.steamAccount.name}</p>
                            </div>
                          </td>
                          <td>
                            {player.steamAccount?.proSteamAccount?.team?.name}
                          </td>
                          <td>
                            {player.steamAccount.countryCode?.toLowerCase() ? (
                              <div
                                className="tooltip"
                                data-tip={player.steamAccount.countryCode}
                              >
                                <Image
                                  src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icons/7.2.3/flags/4x3/${player.steamAccount.countryCode?.toLowerCase()}.svg`}
                                  alt={`${player.steamAccount.countryCode} flag`}
                                  width={23}
                                  height={23}
                                  className="rounded-sm"
                                />
                              </div>
                            ) : (
                              " "
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <p>No players in the leaderboard.</p>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
