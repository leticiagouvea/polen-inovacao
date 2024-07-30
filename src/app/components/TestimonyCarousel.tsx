import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import Testimony1 from "../../../public/Testimony1.png";
import Testimony2 from "../../../public/Testimony2.png";
import Testimony3 from "../../../public/Testimony3.png";
import { Pagination, Mousewheel } from "swiper/modules";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa6";

const images = [
  {
    src: Testimony1,
    alt: "Depoimento 1",
    name: "Christiane Corrêa, Arch Studio 3D",
    text: "O Pólen é muito mais do que um espaço de escritórios compartilhados. Ao colocar uma empresa do lado da outra, promover eventos, conectar membros, os negócios entre si crescem à medida que as relações se estreitam, ganhando novas parcerias de trabalhos bem como amizades.",
  },
  {
    src: Testimony2,
    alt: "Depoimento 2",
    name: "João Paulo, CEO Tera Obra",
    text: "O Pólen tem sido minha segunda casa desde que decidi abrir minha empresa... Fui surpreendido com o espírito colaborativo dos envolvidos no espaço. Eles estão sempre criando novas maneiras de fazer as empresas do ecossistema interagirem e criarem oportunidades de novos negócios.",
  },
  {
    src: Testimony3,
    alt: "Depoimento 3",
    name: "Ana Carolina, Circuito Kids",
    text: "Participar da primeira edição do Favela Inova Niterói me proporcionou uma experiência única não só pelo conteúdo oferecido, mas também pela valorização de startups que se originaram nas comunidades da cidade. A equipe Pólen trabalhou incansavelmente para buscar resolver qualquer problema que surgisse pelo caminho! Como fundadora do Circuito Kids posso afirmar que o Favela Inova trouxe uma outra visão sobre empreendedorismo.",
  },
];

export default function TestimonyCarousel() {
  return (
    <Swiper
      direction="vertical"
      pagination={{ clickable: true }}
      mousewheel={true}
      modules={[Pagination, Mousewheel]}
      className="mySwiper w-[80%] sm:w-[90%] h-[350px] sm:h-[650px] mx-auto rounded-[10px] mt-12 sm:mt-8 bg-[#eadcd3] bg-opacity-50 shadow-md p-4"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full flex sm:flex-col sm:items-center justify-center">
            <Image
              src={image.src}
              alt={image.alt}
              className="w-auto sm:w-56 object-cover mr-6 sm:mr-0 sm:mb-2 border-2"
            />
            <div className="w-[380px] xs:w-[300px] flex flex-col items-center justify-center">
              <p className="text-[16px] flex flex-wrap text-justify leading-tight">
                <FaQuoteLeft className="text-xl m-2 text-[#ea5e53]" />
                {image.text}
              </p>
              <h3 className="text-[18px] text-[#ea5e53] mt-4 font-bold">
                — {image.name}
              </h3>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #ee7a3c !important;
          width: 10px;
          height: 10px;
        }

        .swiper-pagination-bullet-active {
          background-color: #ea5e53 !important;
        }

        @media (max-width: 640px) {
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
    </Swiper>
  );
}
