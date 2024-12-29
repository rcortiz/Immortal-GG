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
            tag
          }
        }
      }
      winCount
      matchCount
      matches(request: { bracketIds: [8], lobbyTypeIds: [2, 7] }) {
        didRadiantWin
        durationSeconds
        endDateTime
        players(steamAccountId: $steamAccountId) {
          hero {
            id
            name
            displayName
            shortName
          }
          isVictory
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
          backpack0Id
          backpack1Id
          backpack2Id
          neutral0Id
          networth
          numLastHits
          numDenies
          isRadiant
        }
      }
    }
  }
`;
