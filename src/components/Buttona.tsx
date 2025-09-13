import { ButtonHTMLAttributes } from "react";
import {cva} from "class-variance-authority";

const classes = cva('border h-12 rounded-full px-6 font-medium' , {
  variants: {
    variant: {
      primary: 'bg-lime-400 text-neutra-950 border-lime-400',
      secondary: 'border-white text-white bg-trasparent',
    } , 
    size: {
      sm: "h-10" ,
    },
  },
})
export default function Button(props: {variant : "primary" | "secondary"; size?: 'sm'; } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { variant , className ,size , ...otherProps} = props;
  return (
    <button 
            className={classes({ variant ,
               className , size })}
            {...otherProps}
  />
  );
}



// import { ButtonHTMLAttributes } from "react";
// import { cva } from "class-variance-authority";

// const classes = cva(
//   "border h-12 rounded-full px-6 font-medium transition-colors duration-200",
//   {
//     variants: {
//       variant: {
//         primary: "bg-brand-green text-brand-dark border-brand-green hover:opacity-90",
//         secondary: "border-white text-white bg-transparent hover:bg-white/10",
//       },
//       size: {
//         sm: "h-10 px-4 text-sm",
//       },
//     },
//   }
// );

// export default function Button(
//   props: {
//     variant: "primary" | "secondary";
//     size?: "sm";
//   } & ButtonHTMLAttributes<HTMLButtonElement>
// ) {
//   const { variant, className, size, ...otherProps } = props;
//   return (
//     <button className={classes({ variant, size, className })} {...otherProps} />
//   );
// }
