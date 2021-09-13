import { ChangeEvent, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, BoxProps } from '@material-ui/core'
import { Loot } from 'interfaces/loot.interface'
import { networks } from 'constants/networks'
import { networkStore } from 'stores/networkStore'
import { walletService } from 'services/walletService'
import { spaceLootService } from 'services/spaceLootService'
import { maskWalletAddress } from 'utils/wallet.utils'
import { Skeleton } from '@material-ui/lab'
import Link from 'next/link'

const LootProperty = (props: any) => {
  return (
    <li
      style={{
        paddingLeft: '1.5em',
        textIndent: '-2em',
      }}
    >
      {props.children}
    </li>
  )
}

const LootTransfer = (props: {token_id:string}) => {

  const [recipient, setRecipient] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      setRecipient(e.target.value)
      console.log(recipient)
      console.log(walletService.validateAddress(recipient))
      if(walletService.validateAddress(e.target.value)) {
        setIsError(false)
      } else {
        setIsError(true)
      }
    }
  }

  const handleTransfer = async () => {
    if(walletService.validateAddress(recipient)) {
      await spaceLootService.transfer(recipient, props.token_id)
    }
  }

  const handleTransferDialog = () => {
    setRecipient('')
    setIsError(false)
    const dialog:any = document.getElementById('dialog-default')
    if(dialog)
      dialog.showModal()
  }

  const handleCloseDialog = () => {
    setRecipient('')
  }

  return (
    <Box marginRight="20px">
      <button type="button" className="nes-btn is-success" onClick={handleTransferDialog}>
        Transfer Loot!
      </button>
      <dialog className="nes-dialog" id="dialog-default">
        <form method="dialog" style={{ minWidth: "680px"}}>
          <p className="title">Transfer Address</p>
          <input
            type="text"
            id="address"
            className="nes-input"
            value={recipient}
            onChange={handleOnChange}
          />
          {isError && <span className="nes-text is-error">invalid address</span>}
          <menu className="dialog-menu">
            <button className="nes-btn" onClick={handleCloseDialog}>Cancel</button>
            <button className={`nes-btn ${!isError? "is-primary":"is-disabled"}`} disabled={isError} onClick={handleTransfer}>Confirm</button>
          </menu>
        </form>
      </dialog>
    </Box>
  )
}

const LootOwner = observer((props: { owner: string }) => {
  const url = networks[networkStore.name].finder + '/address/' + props.owner
  return (
    <p>
      Owner:{' '}
      {props.owner != '' ? (
        <Link href={url} passHref>
          {props.owner == walletService.getStoredAddress()
            ? 'Captain on the Bridge! The ship is yours.'
            : maskWalletAddress(props.owner)}
        </Link>
      ) : (
        '-'
      )}
    </p>
  )
})

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

type Props = {
  loot?: Loot
  hideOwner?: boolean | string
  transferable?: boolean | string
}

export const LootBox = observer(({ loot, hideOwner, transferable, ...props }: Props & BoxProps) => {
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
      <p className="title">Space Loot #{loot.token_id || '?'}</p>
      <div className="lists">
        <ul className="nes-list is-disc">
          <LootProperty>
            <span className="nes-text is-primary">🚢 Vessel Type:</span> {loot.vessel_type}
          </LootProperty>
          <LootProperty>
            <span className="nes-text is-primary">🎖️ Class:</span> {loot.class}
          </LootProperty>
          <LootProperty>
            <span className="nes-text is-primary">🔫 Weapon:</span> {loot.weapon}
          </LootProperty>
          <LootProperty>
            <span className="nes-text is-primary">💣 Secondary Weapon:</span>{' '}
            {loot.secondary_weapon}
          </LootProperty>
          <LootProperty>
            <span className="nes-text is-primary">🛡️ Shield:</span> {loot.shield}
          </LootProperty>
          <LootProperty>
            <span className="nes-text is-primary">🚀 Propulsion:</span> {loot.propulsion}
          </LootProperty>
          <LootProperty>
            <span className="nes-text is-primary">🪨 Material:</span> {loot.material}
          </LootProperty>
          <LootProperty>
            <span className="nes-text is-primary">🎁 Extra:</span> {loot.extra}
          </LootProperty>
        </ul>
        {!hideOwner && <LootOwner owner={loot.owner} />}
        {transferable && <LootTransfer token_id={loot.token_id.toString()} />}
      </div>
    </Box>
  )
})
