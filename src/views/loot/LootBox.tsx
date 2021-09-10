import { observer } from 'mobx-react-lite'
import { Box, BoxProps } from '@material-ui/core'
import { Loot } from 'interfaces/loot.interface'
import { Skeleton } from '@material-ui/lab'
type Props = {
  loot?: Loot
}

const RectSkeleton = (props: any) => {
  return (
    <Skeleton
      variant="rect"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginTop: 4,
        borderRadius: 8,
        display: props.inline === 'true' && 'inline-block',
      }}
      {...props}
    />
  )
}

export const LootBox = observer(({ loot, ...props }: Props & BoxProps) => {
  if (!loot) {
    return (
      <Box className="nes-container is-dark  with-title" {...props} width="500px">
        <p className="title">
          Space Loot <RectSkeleton width={150} height={16} inline="true" />
        </p>
        <div className="lists">
          <ul className="nes-list is-disc">
            <RectSkeleton width={300} height={24} />
            <RectSkeleton width={300} height={24} />
            <RectSkeleton width={300} height={24} />
            <RectSkeleton width={300} height={24} />
            <RectSkeleton width={300} height={24} />
            <RectSkeleton width={300} height={24} />
            <RectSkeleton width={300} height={24} />
          </ul>
        </div>
      </Box>
    )
  }

  return (
    <Box className="nes-container is-dark  with-title" {...props} width="500px">
      <p className="title">Space Loot #{loot.id || 1}</p>
      <div className="lists">
        <ul className="nes-list is-disc">
          <li>🚢 Vessel Type : {loot.vessel_type}</li>
          <li>🎖️ Class : {loot.class}</li>
          <li>🔫 Weapon : {loot.weapon}</li>
          <li>💣 Secondary Weapon : {loot.secondary_weapon}</li>
          <li>🛡️ Shield : {loot.shield}</li>
          <li>🚀 Propulsion : {loot.propulsion}</li>
          <li>🪨 Material : {loot.material}</li>
          <li>🎁 Extra : {loot.extra}</li>
        </ul>
      </div>
    </Box>
  )
})
