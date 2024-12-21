import { gql } from "@apollo/client";

export const GET_PLAYER_DATA = gql`
  query GetPlayerData($steamAccountId: Long!) {
    player(steamAccountId: $steamAccountId) {
      steamAccount {
        id
        profileUri
        name
        timeCreated
        avatar
        dotaAccountLevel
        seasonRank
        isAnonymous
        guild {
          guildId
          guild {
            name
          }
        }
      }
      winCount
      matchCount
      matches(request: { bracketIds: [8], positionIds: [POSITION_2] }) {
        didRadiantWin
        players(steamAccountId: $steamAccountId) {
          hero {
            id
            name
            displayName
            shortName
          }
          gold
          kills
          deaths
          assists
          position
          role
          item0Id
          item1Id
          item2Id
          item3Id
          item4Id
          item5Id
        }
      }
    }
  }
`;
