import React from "react";
import assets from "../../assets/assets";
import './HeroSection.css';

interface Slide {
  id: number;
  imgSrc: string;
  alt: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    imgSrc: assets.clothes,
    alt: "Clothes",
    title: "Upgrade your style with trendy outfits for every season.",
    description: "Comfortable, fashionable, and made to match your lifestyle."
  },
  {
    id: 2,
    imgSrc: assets.skincare,
    alt: "Cosmetic",
    title: "Enhance your natural beauty with premium cosmetic products.",
    description: "Glow confidently with quality you can trust."
  },
  {
    id: 3,
    imgSrc: assets.elctronic,
    alt: "Electronic",
    title: "Discover the latest electronics designed for performance and convenience.",
    description: "Smart technology to power your everyday life."
  },
  {
    id: 4,
    imgSrc: assets.sportsAccessories,
    alt: "Sports Accessories",
    title: "Gear up with high-quality sports accessories for every game.",
    description: "Train harder, play stronger, and perform better."
  }
];

const HeroSection: React.FC = () => {
  return (
    <div className="heroSectionContainer">
      {slides.map((slide) => (
        <div key={slide.id} className="slideShowItem">
          <div className="slideShowNumber">{slide.id} / {slides.length}</div>
          <img className="slideImg" src={slide.imgSrc} alt={slide.alt} />
          <div className="slideText">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;