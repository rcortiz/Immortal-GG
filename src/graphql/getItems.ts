import { gql } from "@apollo/client";

export const GET_ITEMS_DATA = gql`
  query GetItemDetails($id: Int!) {
    constants {
      item(id: $id) {
        id
        name
        displayName
        shortName
        isSupportFullItem
        language {
          displayName
          description
          lore
          notes
          attributes
        }
        stat {
          behavior
          unitTargetType
          unitTargetTeam
          unitTargetFlags
          fightRecapLevel
          sharedCooldown
          cost
          shopTags
          aliases
          quality
          isSellable
          isDroppable
          isPurchasable
          isSideShop
          isStackable
          isPermanent
          isHideCharges
          isRequiresCharges
          isDisplayCharges
          isSupport
          isAlertable
          isTempestDoubleClonable
          stockMax
          initialCharges
          initialStock
          stockTime
          initialStockTime
          isRecipe
          needsComponents
          upgradeItem
          upgradeRecipe
          itemResult
          neutralItemDropTime
          neutralItemTier
        }
        attributes {
          name
          value
        }
        image
      }
    }
  }
`;
