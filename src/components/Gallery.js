import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import {
  RiArrowLeftLine,
  RiGalleryLine,
  RiHeart3Line,
  RiHome5Line,
  RiSparklingLine,
} from "react-icons/ri";

function Gallery() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [characterData, setCharacterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const activeImage =
    pictures?.[index]?.jpg?.image_url || characterData?.images?.jpg?.image_url;
  const galleryCount = pictures?.length || (activeImage ? 1 : 0);

  const aboutParagraphs = useMemo(() => {
    const rawText =
      characterData?.about || "Character background not available yet.";
    return rawText.split("\n").filter((segment) => segment.trim() !== "");
  }, [characterData?.about]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (!id) {
        setErrorMessage("Invalid character id.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");
      setIndex(0);

      try {
        const picturesResponse = await fetch(
          `https://api.jikan.moe/v4/characters/${id}/pictures`,
        );
        if (!picturesResponse.ok) {
          throw new Error("Failed to load character gallery.");
        }
        const picturesData = await picturesResponse.json();

        const response = await fetch(
          `https://api.jikan.moe/v4/characters/${id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to load character profile.");
        }
        const data = await response.json();

        if (isMounted) {
          setPictures(Array.isArray(picturesData?.data) ? picturesData.data : []);
          setCharacterData(data.data || null);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error ? error.message : "Unable to load gallery data.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <GalleryStyled>
        <div className="status-shell">
          <RiSparklingLine />
          <span>Loading character showcase</span>
        </div>
      </GalleryStyled>
    );
  }

  if (errorMessage) {
    return (
      <GalleryStyled>
        <div className="page-shell">
          <div className="nav-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="action-btn"
            >
              <RiArrowLeftLine />
              <span>Back</span>
            </button>
            <Link to="/" className="action-btn">
              <RiHome5Line />
              <span>Home</span>
            </Link>
          </div>
          <div className="error-shell">{errorMessage}</div>
        </div>
      </GalleryStyled>
    );
  }

  return (
    <GalleryStyled>
      <div className="page-shell">
        <motion.div
          className="nav-actions"
          initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.72, ease: [0.32, 0.72, 0, 1] }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="action-btn"
          >
            <RiArrowLeftLine />
            <span>Back</span>
          </button>
          <Link to="/" className="action-btn">
            <RiHome5Line />
            <span>Home</span>
          </Link>
        </motion.div>

        <motion.header
          className="hero-head"
          initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.06, ease: [0.32, 0.72, 0, 1] }}
        >
          <p className="eyebrow">character showcase</p>
          <h1>{characterData?.name || "Unknown character"}</h1>
          {characterData?.name_kanji && (
            <p className="kanji">{characterData.name_kanji}</p>
          )}
          <div className="meta">
            <span className="meta-chip">
              <RiGalleryLine />
              {galleryCount} gallery shots
            </span>
            <span className="meta-chip">
              <RiHeart3Line />
              {(characterData?.favorites || 0).toLocaleString()} favorites
            </span>
          </div>
        </motion.header>

        <motion.section
          className="showcase-shell"
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.82, delay: 0.12, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="showcase-core">
            <div className="visual-pane">
              <div className="main-frame">
                <AnimatePresence mode="wait">
                  {activeImage ? (
                    <motion.img
                      key={activeImage}
                      src={activeImage}
                      alt={`${characterData?.name || "Character"} portrait ${index + 1}`}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
                    />
                  ) : (
                    <motion.div
                      key="empty-image"
                      className="image-fallback"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      No image available
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="main-overlay">
                  <span>
                    {Math.min(index + 1, Math.max(galleryCount, 1))}/
                    {Math.max(galleryCount, 1)}
                  </span>
                  <strong>{characterData?.name || "Character"}</strong>
                </div>
              </div>

              {pictures?.length > 0 && (
                <div className="thumbnail-rail">
                  {pictures.map((picture, i) => (
                    <motion.button
                      key={`${picture?.jpg?.image_url}-${i}`}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={`thumb ${i === index ? "active" : ""}`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`Show image ${i + 1}`}
                    >
                      <img src={picture?.jpg?.image_url} alt="" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            <aside className="info-pane">
              {characterData?.nicknames?.length > 0 && (
                <div className="info-block">
                  <h3>Also known as</h3>
                  <div className="nickname-grid">
                    {characterData.nicknames.map((nickname, nicknameIndex) => (
                      <span key={`${nickname}-${nicknameIndex}`}>
                        {nickname}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="info-block">
                <h3>Background</h3>
                <div className="about-scroll">
                  {aboutParagraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </motion.section>
      </div>
    </GalleryStyled>
  );
}

const GalleryStyled = styled.main`
  min-height: 100dvh;
  padding: 1.35rem 0.95rem 2rem;
  color: var(--text-primary);

  .page-shell {
    width: min(1320px, 100%);
    margin: 0 auto;
  }

  .status-shell,
  .error-shell {
    min-height: 70dvh;
    border-radius: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(13, 20, 30, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.65rem;
    color: var(--text-secondary);
    font-size: 0.95rem;
    text-align: center;
  }

  .status-shell svg {
    font-size: 1.25rem;
    color: var(--accent-strong);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin-bottom: 1rem;
  }

  .action-btn {
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(14, 22, 33, 0.88);
    color: var(--text-secondary);
    padding: 0.42rem 0.82rem;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    text-decoration: none;
    font-size: 0.82rem;
    transition:
      transform 0.42s cubic-bezier(0.32, 0.72, 0, 1),
      border-color 0.42s cubic-bezier(0.32, 0.72, 0, 1),
      background 0.42s cubic-bezier(0.32, 0.72, 0, 1),
      color 0.42s cubic-bezier(0.32, 0.72, 0, 1);
  }

  .action-btn:hover {
    transform: translateY(-1px);
    border-color: var(--border-soft);
    background: rgba(201, 149, 91, 0.12);
    color: var(--text-primary);
  }

  .hero-head {
    margin-bottom: 1rem;
    max-width: 74ch;
  }

  .eyebrow {
    margin: 0;
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 0.26rem 0.66rem;
    border: 1px solid var(--border-soft);
    background: rgba(201, 149, 91, 0.12);
    color: var(--accent-strong);
    text-transform: lowercase;
    font-size: 0.74rem;
    font-weight: 600;
    letter-spacing: 0.03em;
  }

  h1 {
    margin: 0.7rem 0 0;
    font-size: clamp(1.72rem, 4vw, 3rem);
    line-height: 1;
    letter-spacing: -0.045em;
    text-wrap: balance;
  }

  .kanji {
    margin: 0.44rem 0 0;
    color: var(--text-muted);
    font-size: 1rem;
  }

  .meta {
    margin-top: 0.76rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .meta-chip {
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.13);
    background: rgba(14, 22, 33, 0.88);
    color: var(--text-secondary);
    padding: 0.3rem 0.62rem;
    display: inline-flex;
    align-items: center;
    gap: 0.28rem;
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
  }

  .showcase-shell {
    border-radius: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.34rem;
    background:
      linear-gradient(155deg, rgba(26, 36, 50, 0.72), rgba(11, 18, 27, 0.82)),
      radial-gradient(
        circle at 0% 0%,
        rgba(201, 149, 91, 0.16),
        transparent 62%
      );
    box-shadow: 0 24px 48px rgba(4, 8, 14, 0.5);
  }

  .showcase-core {
    border-radius: calc(2rem - 0.34rem);
    background: linear-gradient(
      150deg,
      rgba(12, 18, 27, 0.97),
      rgba(14, 21, 31, 0.94)
    );
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.09);
    padding: 0.95rem;
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.9fr);
    gap: 0.95rem;
  }

  .visual-pane {
    min-width: 0;
  }

  .main-frame {
    position: relative;
    border-radius: 1.2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    background: rgba(9, 14, 21, 0.85);
    min-height: 460px;
  }

  .main-frame img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-fallback {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .main-overlay {
    position: absolute;
    left: 0.58rem;
    right: 0.58rem;
    bottom: 0.58rem;
    border-radius: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(9, 14, 21, 0.72);
    padding: 0.4rem 0.58rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.45rem;
  }

  .main-overlay span {
    color: var(--text-secondary);
    font-size: 0.72rem;
    font-variant-numeric: tabular-nums;
  }

  .main-overlay strong {
    font-size: 0.8rem;
    color: var(--text-primary);
    font-weight: 600;
    text-align: right;
    max-width: 24ch;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .thumbnail-rail {
    margin-top: 0.68rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(68px, 1fr));
    gap: 0.48rem;
  }

  .thumb {
    border-radius: 0.78rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(14, 22, 33, 0.8);
    padding: 0.2rem;
    cursor: pointer;
    transition:
      border-color 0.34s cubic-bezier(0.32, 0.72, 0, 1),
      transform 0.34s cubic-bezier(0.32, 0.72, 0, 1);
  }

  .thumb img {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 0.6rem;
    object-fit: cover;
    display: block;
    filter: grayscale(0.34);
    transition: filter 0.34s cubic-bezier(0.32, 0.72, 0, 1);
  }

  .thumb:hover,
  .thumb.active {
    border-color: rgba(201, 149, 91, 0.36);
  }

  .thumb:hover img,
  .thumb.active img {
    filter: grayscale(0);
  }

  .info-pane {
    border-radius: 1.2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(14, 22, 33, 0.84);
    padding: 0.85rem;
    display: grid;
    gap: 0.84rem;
    min-height: 0;
  }

  .info-block h3 {
    margin: 0;
    font-size: 0.9rem;
    text-transform: lowercase;
    letter-spacing: 0.01em;
  }

  .nickname-grid {
    margin-top: 0.55rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.42rem;
  }

  .nickname-grid span {
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(201, 149, 91, 0.12);
    color: var(--accent-strong);
    padding: 0.22rem 0.56rem;
    font-size: 0.72rem;
    text-transform: lowercase;
  }

  .about-scroll {
    margin-top: 0.55rem;
    max-height: 420px;
    overflow-y: auto;
    padding-right: 0.35rem;
    display: grid;
    gap: 0.65rem;
  }

  .about-scroll p {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.68;
    color: var(--text-secondary);
    text-wrap: pretty;
  }

  .about-scroll::-webkit-scrollbar {
    width: 6px;
  }

  .about-scroll::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 999px;
  }

  .about-scroll::-webkit-scrollbar-thumb {
    background: rgba(201, 149, 91, 0.3);
    border-radius: 999px;
  }

  @media (max-width: 1100px) {
    .showcase-core {
      grid-template-columns: minmax(0, 1fr);
    }

    .info-pane {
      min-height: 260px;
    }
  }

  @media (max-width: 680px) {
    padding: 1rem 0.76rem 1.5rem;

    .action-btn span {
      display: none;
    }

    .main-frame {
      min-height: 340px;
    }

    .thumbnail-rail {
      grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
      gap: 0.35rem;
    }

    .showcase-core {
      padding: 0.75rem;
      gap: 0.72rem;
    }
  }
`;

export default Gallery;
