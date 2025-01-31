import { motion } from 'motion/react';
import Button from '../../UI/Button'
import image_1 from "../../assets/images/landing-1.png";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
     <div
        id="Home"
        className="relative"
      >
      <div
          className="hidden polygon-background-2 z-[-1] absolute bg-[#d2d4f6] h-full md:w-full w-[92vh] md:flex items-center justify-center "
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 40%, 0% 95%)",
          }}
        ></div>
        <div
          className="hidden polygon-background-1 z-[-1] absolute bg-[#6c63ff] h-full md:w-full w-[92vh] md:flex items-center justify-center"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 93%)",
          }}
        ></div>


      <div className='container w-full flex flex-col md:flex-row sm:pb-18 sm:pt-16 py-28 md:bg-inherit bg-[#6c63ff] '>
        <div className='left flex flex-col md:items-start items-center justify-center sm:px-36 px-12'>
          <div className='top felx flex-col mb-14 '>
            <h1 className='md:text-6xl text-5xl font-bold mb-4'> <span className='text-black'>Welcome to</span> <span className='text-white'>Tradof</span></h1>
            <p className='text-[#d6d5d5] font-semibold text-center'>Your Trusted Partner in Language Translation</p>
          </div>
          <p className='text-justify text-lg text-white mb-12'>we understand that communication is at the heart of every successful business. Whether you're expanding into new markets, building relationships with international clients, or sharing your brand story, language should never be a barrier. That's where we come in.</p>
          <Button
            text='Get Started'
            action={''}
            style={{
              text: 'text-white',
              bg: 'bg-[#ff6f61]',
              hover: 'hover:bg-orange-600',
              font: 'font-bold',
              rounded: 'rounded-lg',
              textSm: 'text-sm',
              px: 'px-8',
              py: 'py-3',
            }}
          />
        </div>

        <motion.div
            className="hidden lg:block w-full"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={image_1}
              alt="Translation Service"
              className="hidden lg:block w-full max-w-[1400px]"
            />
          </motion.div>
      </div>
      </div>
      <style>{`
        @media (max-width: 1020px) {
          .polygon-background-1 {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%) !important;
          }
        }
      `}</style>
    </>
  );
}
