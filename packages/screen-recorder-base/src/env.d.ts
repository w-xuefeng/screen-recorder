declare interface Navigator {
  getDisplayMedia?(constraints?: DisplayMediaStreamConstraints | undefined): Promise<MediaStream>
}

declare interface MediaStream {
  stop?: () => void
}

declare interface MediaTrackConstraintSet {
  displaySurface?: 'monitor' | 'window' | 'application' | 'browser'
  logicalSurface?: boolean
  cursor?: 'never' | 'always' | 'motion'
}
