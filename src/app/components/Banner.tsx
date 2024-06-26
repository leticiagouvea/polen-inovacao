import Link from "next/link";
import Image from "next/image";
import BannerImage from "../../../public/BannerImage.png";
import { IoIosArrowForward } from "react-icons/io";

export default function Banner() {
  return (
    <div className="relative overflow-hidden mt-[70px] shadow-xl w-full h-80 xs:h-60 font-sans">
      <Image
        src={BannerImage}
        alt="Pólen Inovação"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(234,94,83,1.0)] via-transparent to-black opacity-60"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-start text-white z-10 px-10 xs:px-6">
        <h1 className="text-2xl md:text-2xl lg:text-4xl xs:text-[20px] font-bold mb-4 opacity-80">
          LOCAÇÃO DE ESPAÇOS
        </h1>
        <p className="opacity-80 mb-4 md:mb-6 lg:mb-8 xs:text-[16px] xs:w-[180px]">
          Conheça nossos espaços e confira nossa agenda!
        </p>
        <Link href="/space-rental">
          <button className="bg-[#ea5e53] shadow-xl bg-opacity-50 text-white py-3 px-6 md:py-4 md:px-8 rounded-full flex items-center justify-center transition duration-300 hover:bg-opacity-70 hvr-pulse-shrink">
            Faça seu evento conosco
            <IoIosArrowForward className="ml-2 text-xl" />
          </button>
        </Link>
      </div>
    </div>
  );
}
