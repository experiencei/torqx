import Image, { StaticImageData } from "next/image";
import { useEffect , HTMLAttributes } from "react";
import { twMerge} from "tailwind-merge";
import SplitType from "split-type";
import { useAnimate , usePresence , motion } from "motion/react";
import useTextRevealAnimation from "@/hooks/useTextReavealAnimation";

const Testimonial = (props: {
  quote: string;
  name: string;
  role: string;
  company: string;
  imagePositionY: number;
  image: string| StaticImageData;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) => {

  const {quote , name , role , company , imagePositionY , image , className , ...rest} = props;

  const { scope: quoteScope , entranceAnimation: quoteAnimate , exitAnimation: quoteExitAnimation } = useTextRevealAnimation();
  const { scope: citeScope , entranceAnimation: citeAnimate , exitAnimation: citeExitAnimation } = useTextRevealAnimation();

  const [isPresent , safeToRemove ] = usePresence();
  // const [citeScope , citeAnimate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      quoteAnimate().then(() => {
        citeAnimate();
      });  
    } else {
      Promise.all([
        quoteExitAnimation(),
        citeExitAnimation()
      ]).then(() => {
        safeToRemove();
      });
    }
    
  }, [isPresent]);

  return (
  <div  className={twMerge("grid md:grid-cols-5 md:gap-8 lg:gap-16 md:items-center" , className)}
  {...rest}
  >
              <div className="aspect-square md:aspect-[9/16] md:col-span-2 relative ">
                <motion.div className="absolute h-full bg-stone-900" initial={{
                  width: '100%'
                }}
                animate={{width: 0}}
                exit={{ width: '100%'}}
                transition={{duration: 0.5}}
                
                ></motion.div>
                    <Image src={image} alt={name} className="size-full object-cover" 
                    style={{
                      objectPosition: `50% ${imagePositionY * 100}%`
                    }}
                    />
              </div>
              <blockquote className="md:col-span-3">
                <div  className="text-3xl md:text-5xl lg:text-6xl mt-8 md:mt-0" ref={quoteScope}>
                    <span>&ldquo;</span>
                   {quote}
                    <span>&rdquo;</span>
                </div>
                 <cite  className="mt-4 md:mt-8 not-italic  block md:text-lg lg:text-xl" ref={citeScope}>{name} , {role} at {company} </cite>
              </blockquote>
          </div>
          );
}

export default Testimonial