import React, { VideoHTMLAttributes, useEffect, useRef } from 'react'
import useDraggable from 'use-draggable-hook'

type PropsType = VideoHTMLAttributes<HTMLVideoElement> & {
  srcObject?: MediaStream | null
  draggable?: boolean
  dragWrapStyle?: React.CSSProperties
}

export default React.forwardRef(function Video({
  srcObject,
  draggable,
  dragWrapStyle,
  ...props
}: PropsType, ref: React.ForwardedRef<HTMLDivElement>) {
  const refVideo = useRef<HTMLVideoElement>(null)
  const { target: previewRefTarget } = useDraggable<HTMLDivElement>()

  useEffect(() => {
    if (!refVideo.current || !srcObject) return
    refVideo.current.srcObject = srcObject
  }, [srcObject])

  return draggable
    ? (
      <div ref={previewRefTarget} style={dragWrapStyle}>
        <div ref={ref}>
          <video ref={refVideo} {...props} />
        </div>
      </div>
    )
    : <div ref={ref}><video ref={refVideo} {...props} /></div>
})
