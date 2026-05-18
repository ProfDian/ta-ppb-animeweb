import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

function AnimeSectionHero({ label, title, subtitle, items = [] }) {
  const gallery = items.slice(0, 3);
  const lead = gallery[0];
  const sideA = gallery[1];
  const sideB = gallery[2];

  return (
    <AnimeSectionHeroStyled
      as={motion.section}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.82, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="hero-shell">
        <div className="hero-core">
          <div className="hero-canvas">
            {lead?.images?.jpg?.large_image_url && (
              <img
                src={lead.images.jpg.large_image_url}
                alt={`${lead.title} featured art`}
                className="backdrop-image"
              />
            )}
            <div className="overlay" />
            <div className="copy">
              <p className="kicker">{label}</p>
              <h2>{title}</h2>
              <p>{subtitle}</p>
              <div className="meta-strip">
                <span>{items.length} titles live</span>
                <span>{lead?.title || "Curated update loading"}</span>
              </div>
            </div>
            <div className="floating-cards">
              {sideA?.images?.jpg?.image_url && (
                <div className="float-card first">
                  <img
                    src={sideA.images.jpg.image_url}
                    alt={`${sideA.title} preview`}
                  />
                  <span>{sideA.title}</span>
                </div>
              )}
              {sideB?.images?.jpg?.image_url && (
                <div className="float-card second">
                  <img
                    src={sideB.images.jpg.image_url}
                    alt={`${sideB.title} preview`}
                  />
                  <span>{sideB.title}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimeSectionHeroStyled>
  );
}

const AnimeSectionHeroStyled = styled.section`
  margin-bottom: 1.15rem;

  .hero-shell {
    border-radius: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.34rem;
    background:
      linear-gradient(150deg, rgba(26, 36, 50, 0.72), rgba(11, 18, 27, 0.82)),
      radial-gradient(
        circle at 0% 0%,
        rgba(201, 149, 91, 0.16),
        transparent 62%
      );
    box-shadow: 0 24px 50px rgba(4, 8, 14, 0.5);
  }

  .hero-core {
    border-radius: calc(2rem - 0.34rem);
    overflow: hidden;
    background: linear-gradient(
      145deg,
      rgba(10, 16, 24, 0.98),
      rgba(14, 21, 31, 0.95)
    );
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.09);
  }

  .hero-canvas {
    position: relative;
    min-height: 360px;
    display: flex;
    align-items: flex-end;
    padding: 1.3rem;
    isolation: isolate;
  }

  .backdrop-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.9) contrast(1.05);
    transform: scale(1.02);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        120deg,
        rgba(9, 14, 21, 0.9) 18%,
        rgba(9, 14, 21, 0.34) 62%
      ),
      linear-gradient(
        to top,
        rgba(9, 14, 21, 0.92) 8%,
        rgba(9, 14, 21, 0.22) 56%
      );
  }

  .copy {
    position: relative;
    z-index: 2;
    max-width: 52ch;
  }

  .kicker {
    margin: 0;
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 0.28rem 0.66rem;
    border: 1px solid var(--border-soft);
    background: rgba(201, 149, 91, 0.16);
    color: var(--accent-strong);
    text-transform: lowercase;
    letter-spacing: 0.03em;
    font-size: 0.76rem;
    font-weight: 600;
  }

  h2 {
    margin: 0.8rem 0 0;
    font-size: clamp(1.55rem, 3.6vw, 2.7rem);
    line-height: 1.04;
    letter-spacing: -0.04em;
    text-wrap: balance;
    max-width: 18ch;
  }

  p {
    margin: 0.85rem 0 0;
    font-size: 0.96rem;
    line-height: 1.7;
    color: var(--text-secondary);
    text-wrap: pretty;
    max-width: 58ch;
  }

  .meta-strip {
    margin-top: 0.95rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.48rem;
  }

  .meta-strip span {
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.13);
    background: rgba(9, 14, 21, 0.68);
    color: var(--text-secondary);
    padding: 0.28rem 0.62rem;
    font-size: 0.74rem;
    line-height: 1.2;
    max-width: 30ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .floating-cards {
    position: absolute;
    right: 1.15rem;
    top: 1rem;
    z-index: 2;
    display: grid;
    gap: 0.62rem;
    pointer-events: none;
  }

  .float-card {
    width: 136px;
    border-radius: 1rem;
    padding: 0.34rem;
    background: rgba(10, 16, 24, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(6px);
    box-shadow: 0 16px 24px rgba(4, 8, 14, 0.44);
    transform: rotate(0deg);
    transition: transform 0.48s cubic-bezier(0.32, 0.72, 0, 1);
  }

  .float-card.first {
    transform: rotate(2deg);
  }

  .float-card.second {
    transform: rotate(-3deg);
  }

  .hero-canvas:hover .float-card.first {
    transform: translateY(-3px) rotate(1deg);
  }

  .hero-canvas:hover .float-card.second {
    transform: translateY(-2px) rotate(-2deg);
  }

  .float-card img {
    width: 100%;
    aspect-ratio: 3/4;
    border-radius: 0.72rem;
    object-fit: cover;
    display: block;
  }

  .float-card span {
    margin-top: 0.36rem;
    display: block;
    font-size: 0.68rem;
    color: var(--text-secondary);
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 900px) {
    .hero-canvas {
      min-height: 330px;
      padding: 1rem;
    }

    .floating-cards {
      right: 0.9rem;
      top: 0.8rem;
    }

    .float-card {
      width: 114px;
    }
  }

  @media (max-width: 680px) {
    .hero-canvas {
      min-height: 292px;
      padding: 0.9rem;
      align-items: flex-end;
    }

    .floating-cards {
      display: none;
    }

    h2 {
      max-width: none;
    }
  }
`;

export default AnimeSectionHero;
