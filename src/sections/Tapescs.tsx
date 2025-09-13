'use client';
import StarIcon from '@/assets/icons/star.svg';
import { useEffect , Fragment , useRef , useState} from "react";
import { motion  , useAnimate , AnimationPlaybackControls } from "framer-motion";

const words = [
  "Africa’s Largest Digital Screen Network",
  "Redifinig Urban Ads Journey",
  "Nation Wide Presence",
  "Displaying Your Magic"
]

export const TapeSection = () => {
  const[isHovered , setIsHovered] = useState<boolean>(false);
  const animation = useRef<AnimationPlaybackControls | null>(null);
  const[scope , animate] = useAnimate();
  useEffect(() => {
      animation.current = animate(scope.current , {x: "-50%"} , { duration: 30,
      repeat: Infinity,
      ease: "linear"})
  
   
  }, [])
  
  useEffect(() => {
      if(animation.current) {
          if (isHovered) {
              animation.current.speed = 0.5;
          } else {
              animation.current.speed = 1;
          }
      }
  }, [isHovered]);


  return (
    <div className="py-2 lg:py-2 overflow-x-clip">
      <div className="bg-gradient-to-r from-black-300 to-black-400 text-white-300 -rotate-3 -mx-1">
      <div className="flex [mask-gradient:linear-gradient(to_right, transparent , black_10% , black_90%, transparent)]">
      <div className="flex flex-none gap-4 pr-4 py-3">
      <motion.div
                  ref={scope}
                 
            
            className="flex flex-none gap-16 pr-16 text-7xl md:text-8xl font-medium group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
                {[...new Array(2)].fill(0).map((_ , idx) => (
            <Fragment key={idx}>
                  {
                words.map((word) => (
                  <div key={word} className="inline-flex gap-4 items-center">
                    <span className="text-gray-900 uppercase font-semibold text-sm">{word}</span>
                    <StarIcon className="size-6 text-gray-900 -rotate-12"/>
                  </div>
                 ))}
            </Fragment>

        ))}
            </motion.div>
      
      </div>
      </div>
    </div>
    </div>
  );
};
