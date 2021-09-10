import { observer } from 'mobx-react-lite'
import { Box, Typography, List } from '@material-ui/core'
import { LootBox } from 'views/loot/LootBox'
import { Loot } from 'interfaces/loot.interface'

type Props = {
  loots?: Loot[]
}

export const LootGallery = observer(({ loots }: Props) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" maxWidth="1100px">
      {(loots as any).length > 0 &&
        (loots as any).map((loot: Loot, index: number) => {
          return (
            <Box key={index} mt={2}>
              <LootBox loot={loot} />
            </Box>
          )
        })}
    </Box>
  )
})
