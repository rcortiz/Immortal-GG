import { gql } from "@apollo/client";

export const GET_PLAYER_DATA = gql`
  query GetPlayerData($steamAccountId: Long!) {
    player(steamAccountId: $steamAccountId) {
      winCount
    }
  }
`;
