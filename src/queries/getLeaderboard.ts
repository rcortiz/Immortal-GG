import { gql } from "@apollo/client";

export const GET_LEADERBOARD = gql`
  query GetLeaderboard($leaderBoardDivision: LeaderboardDivision!) {
    leaderboard {
      season(request: { leaderBoardDivision: $leaderBoardDivision }) {
        playerCount
        players(take: 100) {
          steamAccountId
          steamAccount {
            id
            profileUri
            countryCode
            name
            avatar
            seasonRank
            proSteamAccount {
              team {
                name
                logo
              }
            }
          }
          lastUpdateDateTime
          rank
          winRate
          rankShift
          position
          positionValue
        }
      }
    }
  }
`;
