import * as React from 'react'
import {
  type HTMLMotionProps,
  type MotionValue,
  type Variants,
  motion,
  useScroll,
  useTransform,
} from 'motion/react'
import { cn } from '@/lib/utils'

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}

const SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
  duration: 0.3,
}

const blurVariants: Variants = {
  hidden: {
    filter: 'blur(10px)',
    opacity: 0,
  },
  visible: {
    filter: 'blur(0px)',
    opacity: 1,
  },
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (!context) {
    throw new Error(
      'useContainerScrollContext must be used within a ContainerScroll Component'
    )
  }
  return context
}

export const ContainerScroll = ({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  })
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn('relative w-full h-full overflow-hidden border-0', className)}
        style={{
          perspective: '1200px',
          perspectiveOrigin: 'center 20%',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}
ContainerScroll.displayName = 'ContainerScroll'

export const ContainerSticky = ({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'relative w-full h-full flex items-center justify-center overflow-visible border-0',
        className
      )}
      style={{
        perspective: '1200px',
        perspectiveOrigin: 'center 20%',
        transformStyle: 'preserve-3d',
        ...style,
      }}
      {...props}
    />
  )
}
ContainerSticky.displayName = 'ContainerSticky'

export const GalleryContainer = ({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & HTMLMotionProps<'div'>) => {
  const { scrollYProgress } = useContainerScrollContext()
  const rotateX = useTransform(scrollYProgress, [0, 1], [28, 14])
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 0.98])

  return (
    <motion.div
      className={cn(
        'relative grid w-full grid-cols-3 gap-3 md:gap-5 pt-2 pb-6 border-0 overflow-visible',
        className
      )}
      style={{
        rotateX,
        scale,
        transformStyle: 'preserve-3d',
        transformOrigin: '50% 10%',
        perspective: '1200px',
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
GalleryContainer.displayName = 'GalleryContainer'

export const GalleryCol = ({
  className,
  style,
  yRange = ['-5%', '5%'],
  ...props
}: HTMLMotionProps<'div'> & { yRange?: string[] }) => {
  const { scrollYProgress } = useContainerScrollContext()
  const y = useTransform(scrollYProgress, [0, 1], yRange)

  return (
    <motion.div
      className={cn('relative flex w-full flex-col gap-3 md:gap-4 border-0', className)}
      style={{
        y,
        ...style,
      }}
      {...props}
    />
  )
}
GalleryCol.displayName = 'GalleryCol'

export const ContainerStagger = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'>
>(({ className, viewport, transition, ...props }, ref) => {
  return (
    <motion.div
      className={cn('relative border-0', className)}
      ref={ref}
      initial="hidden"
      whileInView={'visible'}
      viewport={{ once: true, ...viewport }}
      transition={{
        staggerChildren: 0.2,
        ...transition,
      }}
      {...props}
    />
  )
})
ContainerStagger.displayName = 'ContainerStagger'

export const ContainerAnimated = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'>
>(({ className, transition, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn('border-0', className)}
      variants={blurVariants}
      transition={SPRING_CONFIG || transition}
      {...props}
    />
  )
})
ContainerAnimated.displayName = 'ContainerAnimated'
