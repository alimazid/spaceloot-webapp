import { observer } from 'mobx-react-lite'
import { Box, Typography, List, ListItem } from '@material-ui/core'

export const Loot = observer(() => {
  return (
    <Box width="500px" className="nes-container is-dark  with-title">
      <p className="title">Space Loot #1</p>
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
