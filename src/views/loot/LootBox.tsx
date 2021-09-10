import { observer } from 'mobx-react-lite'
import { Box, BoxProps } from '@material-ui/core'
import { Loot } from 'interfaces/loot.interface'
import { Skeleton } from '@material-ui/lab'
type Props = {
  loot?: Loot
}

const LootProperty = (props: any) => {
  return (
    <li style={{
      paddingLeft: '1.5em',
      textIndent: '-2em',
    }}>
      {props.children}
    </li>
  )
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
      <Box className="nes-container is-dark with-title" {...props}>
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
    <Box className="nes-container is-dark with-title" {...props}>
      <p className="title">Space Loot #{loot.id || '?'}</p>
      <div className="lists">
        <ul className="nes-list is-disc">
          <LootProperty><span className="nes-text is-primary">🚢 Vessel Type:</span> {loot.vessel_type}</LootProperty>
          <LootProperty><span className="nes-text is-primary">🎖️ Class:</span> {loot.class}</LootProperty>
          <LootProperty><span className="nes-text is-primary">🔫 Weapon:</span> {loot.weapon}</LootProperty>
          <LootProperty><span className="nes-text is-primary">💣 Secondary Weapon:</span> {loot.secondary_weapon}</LootProperty>
          <LootProperty><span className="nes-text is-primary">🛡️ Shield:</span> {loot.shield}</LootProperty>
          <LootProperty><span className="nes-text is-primary">🚀 Propulsion:</span> {loot.propulsion}</LootProperty>
          <LootProperty><span className="nes-text is-primary">🪨 Material:</span> {loot.material}</LootProperty>
          <LootProperty><span className="nes-text is-primary">🎁 Extra:</span> {loot.extra}</LootProperty>
        </ul>
      </div>
    </Box>
  )
})
