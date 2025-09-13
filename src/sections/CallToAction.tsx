// 'use client';
// import { useEffect , useRef , useState , Fragment} from "react";
// import Image from "next/image";
// import { motion  , useAnimate , AnimationPlaybackControls } from "framer-motion";

// export default function CallToAction() {
//     const[isHovered , setIsHovered] = useState<boolean>(false);
//     const animation = useRef<AnimationPlaybackControls | null>(null);
//    const[scope , animate] = useAnimate();
//     useEffect(() => {
//         animation.current = animate(scope.current , {x: "-50%"} , { duration: 30,
//         repeat: Infinity,
//         ease: "linear"})
    
     
//     }, [])
    
//     useEffect(() => {
//         if(animation.current) {
//             if (isHovered) {
//                 animation.current.speed = 0.5;
//             } else {
//                 animation.current.speed = 1;
//             }
//         }
//     }, [isHovered]);

//     return (
//     <section className="py-12">
//         <div className="overflow-x-clip p-4 flex">
//             <motion.div
//                   ref={scope}
                 
            
//             className="flex flex-none gap-16 pr-16 text-7xl md:text-8xl font-medium group cursor-pointer"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             >
//                 {[...new Array(2)].fill(0).map((_ , idx) => (
//             <Fragment key={idx}>
//                   {
//                 words.map((word) => (
//                   <div key={word} className="inline-flex gap-4 items-center">
//                     <span className="text-gray-900 uppercase font-extrabold text-sm">{word}</span>
//                     <StarIcon className="size-6 text-gray-900 -rotate-12"/>
//                   </div>
//                  ))}
//             </Fragment>

//         ))}
//             </motion.div>
//         </div>
//     </section>);
// }
