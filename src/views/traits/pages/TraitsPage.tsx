import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Typography } from '@material-ui/core'
import { LootBox } from 'views/loot/LootBox'
import { BitStarBgContainer } from 'views/common/BitStarBgContainer'
import BigNumber from 'bignumber.js'
import { spaceLootService } from 'services/spaceLootService'
import { useDebounce } from 'hooks/useDebounce'
import { Loot } from 'interfaces/loot.interface'
import traits from '../../../constants/trait.json'
import styled from '@emotion/styled'
import ReactPaginate from 'react-paginate';

const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
`
const StyledIndexTD = styled.td`
  font-size: 12px!important;
`
const StyledTD = styled.td`
  font-size: 12px!important;
`
export const Traits = observer(() => {
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState('')
  const [totalPage, setTotalPage] = useState(traits.length / 10)
  const [pageSize, setPageSize] = useState(10)
  const [loots, setLoots] = useState(traits.slice(0, pageSize))
  const handlePageChange = ({ selected } : { selected: any }) => {
    setPage(selected + 1)
  }
  useEffect(() => {
    // const filterTrait = trait.filter((trait) => {
    // })
    setTotalPage(traits.length / pageSize)
    setLoots(traits.slice((page - 1) * pageSize, page*pageSize))
    return () => {
    }
  }, [pageSize, page, filter])
  return (
    <BitStarBgContainer width="100%" minHeight="50vh" paddingTop="64px">
      <Box paddingBottom="60px" display="flex" justifyContent="center">
        <Typography variant="h3" className="nes-text is-primary">
          🚀 Ship Attributes!
        </Typography>
      </Box>
      <Box paddingRight="60px" paddingLeft="60px" paddingBottom="60px">
        <StyledTable className="nes-table is-dark is-bordered is-centered">
          <thead>
            <tr>
              <th><span className="nes-text is-primary"># ID</span> </th>
              <th><span className="nes-text is-primary">🚢 Vessel Type:</span> </th>
              <th><span className="nes-text is-primary">🎖️ Class:</span> </th>
              <th><span className="nes-text is-primary">🔫 Weapon:</span></th>
              <th><span className="nes-text is-primary">💣 Secondary Weapon:</span></th>
              <th><span className="nes-text is-primary">🛡️ Shield:</span> </th>
              <th><span className="nes-text is-primary">🚀 Propulsion:</span> </th>
              <th><span className="nes-text is-primary">🪨 Material:</span> </th>
              <th><span className="nes-text is-primary">🎁 Extra:</span> </th>
            </tr>
          </thead>
          <tbody>
            {
              loots.map((trait, index) => {
                return (
                  <tr key={index}>
                    <StyledIndexTD>{trait.tokenID}</StyledIndexTD>
                    <StyledTD>{trait.vessel_type}</StyledTD>
                    <StyledTD>{trait.class}</StyledTD>
                    <StyledTD>{trait.weapon}</StyledTD>
                    <StyledTD>{trait.secondary_weapon}</StyledTD>
                    <StyledTD>{trait.shield}</StyledTD>
                    <StyledTD>{trait.propulsion}</StyledTD>
                    <StyledTD>{trait.material}</StyledTD>
                    <StyledTD>{trait.extra}</StyledTD>
                  </tr>
                )
              })
            }
          </tbody>
        </StyledTable>
        <Box paddingTop="20px" paddingBottom="60px" display="flex" justifyContent="center">
          <ReactPaginate
            pageLinkClassName={'nes-btn is-warning'}
            activeLinkClassName={'nes-btn'}
            breakLinkClassName={'nes-btn is-warning'}
            nextLinkClassName={'nes-btn'}
            previousLinkClassName={'nes-btn'}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            previousLabel='<'
            nextLabel='>'
            initialPage={page}
            pageCount={totalPage}
            containerClassName='pagination'
            onPageChange={handlePageChange}
            // onPageChange={(numPage: any) => setPage(numPage)}
          />
        </Box>
      </Box>
    </BitStarBgContainer>
  )
})
