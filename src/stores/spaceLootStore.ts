import { Loot } from 'interfaces/loot.interface'
import { makeAutoObservable } from 'mobx'

class SpaceLootStore {
  ready = false

  currentLoot: Loot | null = null

  constructor() {
    makeAutoObservable(this)
  }

  clear = () => {
    this.setReady(false)
    this.setCurrentLoot(null)
  }

  setReady = (ready: boolean) => {
    this.ready = ready
  }

  setCurrentLoot = (loot: Loot | null) => {
    this.currentLoot = loot
  }
}

export const spaceLootStore = new SpaceLootStore()
