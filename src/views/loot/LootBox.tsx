import { observer } from 'mobx-react-lite'
import { Box } from '@material-ui/core'
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
        display: props.inline && 'inline-block',
      }}
      {...props}
    />
  )
}

export const LootBox = observer(({ loot }: Props) => {
  if (!loot) {
    return (
      <Box width="500px" className="nes-container is-dark  with-title">
        <p className="title">
          Space Loot <RectSkeleton width={150} height={24} inline />
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
    <Box width="500px" className="nes-container is-dark  with-title">
      <p className="title">Space Loot #{loot.id || 1}</p>
      <div className="lists">
        <ul className="nes-list is-disc">
          <li>Part#1 : </li>
          <li>Part#2 :</li>
          <li>Part#3 :</li>
          <li>Part#4 :</li>
          <li>Part#5 :</li>
          <li>Part#6 :</li>
          <li>Part#7 :</li>
        </ul>
      </div>
    </Box>
  )
})
