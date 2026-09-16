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
    offset: ['start start', 'end end'],
  })
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn('relative min-h-[120vh] border-0', className)}
        style={{
          perspective: '1000px',
          perspectiveOrigin: 'center top',
          transformStyle: 'preserve-3d',
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
        'sticky top-0 h-screen w-full flex items-center justify-center overflow-visible border-0',
        className
      )}
      style={{
        perspective: '1200px',
        perspectiveOrigin: 'center center',
        transformStyle: 'preserve-3d',
        transformOrigin: '50% 50%',
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
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [45, 0])
  const scale = useTransform(scrollYProgress, [0.3, 0.75], [1.1, 1])

  return (
    <motion.div
      className={cn(
        'relative grid size-full grid-cols-3 gap-2 md:gap-6 pt-10 md:pt-16 pb-6 md:pb-12 border-0 overflow-visible',
        className
      )}
      style={{
        rotateX,
        scale,
        transformStyle: 'preserve-3d',
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
  yRange = ['0%', '-10%'],
  ...props
}: HTMLMotionProps<'div'> & { yRange?: string[] }) => {
  const { scrollYProgress } = useContainerScrollContext()
  // Completes smoothly at 0.82 so the animation is 100% finished before page unpins and scrolls away
  const y = useTransform(scrollYProgress, [0.15, 0.82], yRange)

  return (
    <motion.div
      className={cn('relative flex w-full flex-col gap-2 border-0', className)}
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
