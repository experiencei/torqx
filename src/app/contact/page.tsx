import ContactForm  from "@/sections/Contactus";
import Header from "@/components/mvpblocks/header-2";
import FooterTorqx from "@/sections/Footerhome";

export default function Home() {
  return ( 
    <>
    <Header variant="pulse"/>
    <ContactForm />
    <FooterTorqx variant="pulse"/>
    </>
  );
}
