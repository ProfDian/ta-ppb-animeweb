import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import styled from "styled-components";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function Airing({ rendered }) {
  const { airingAnime, isSearch, searchResults } = useGlobalContext();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <AiringStyled>
      <motion.div
        className="content-container"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="main-content">
          <div className="airing-grid">
            {(!isSearch && rendered === "airing"
              ? airingAnime
              : searchResults
            )?.map((anime) => (
              <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                <motion.div
                  className="anime-card"
                  variants={item}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="anime-image">
                    <img
                      src={anime.images.jpg.large_image_url}
                      alt={anime.title}
                    />
                    <div className="overlay">
                      <div className="info">
                        <h3>{anime.title}</h3>
                        <div className="anime-stats">
                          {anime.score && <p>Score: {anime.score}</p>}
                          <p>Episodes: {anime.episodes || "Ongoing"}</p>
                        </div>
                      </div>
                      <div className="hover-info">
                        <p>{anime.synopsis?.substring(0, 150)}...</p>
                        <span className="view-btn">View Details</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
        <Sidebar />
      </motion.div>
    </AiringStyled>
  );
}

const AiringStyled = styled.div`
    .content-container {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(280px, 320px);
        align-items: start;
        gap: 1.45rem;
    }

    .main-content {
        min-width: 0;
    }

    .airing-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        gap: 1.15rem;

        @media (max-width: 768px) {
            grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
            gap: 0.75rem;
        }

        @media (max-width: 480px) {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 0.5rem;
        }
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .anime-card {
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    background: var(--surface-1);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 14px 30px rgba(5, 8, 14, 0.4);
    height: 100%;
    display: flex;
    flex-direction: column;

    .anime-image {
        position: relative;
        aspect-ratio: 2/3;
        width: 100%;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
                to top,
                rgba(8, 13, 21, 0.96) 10%,
                rgba(8, 13, 21, 0.82) 34%,
                rgba(8, 13, 21, 0.36) 58%,
                rgba(8, 13, 21, 0) 100%
            );
            padding: 0.9rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            transform: translateY(58%);
            transition: transform 0.3s ease;

            @media (max-width: 768px) {
                padding: 0.72rem;
                transform: translateY(62%);
            }

            .info {
                h3 {
                    color: var(--text-primary);
                    font-size: 0.98rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    line-height: 1.3;

                    @media (max-width: 768px) {
                        font-size: 0.9rem;
                        -webkit-line-clamp: 1;
                    }
                }

                .anime-stats {
                    display: flex;
                    align-items: center;
                    gap: 0.85rem;
                    font-size: 0.82rem;
                    color: var(--text-secondary);
                    font-variant-numeric: tabular-nums;
                    margin-bottom: 0.5rem;

                    @media (max-width: 768px) {
                        font-size: 0.78rem;
                        gap: 0.58rem;
                    }

                    .stat {
                        display: flex;
                        align-items: center;
                        gap: 0.25rem;
                        
                        .score-label, .rank-label {
                            color: #94a3b8;
                        }

                        .score-value, .rank-value {
                            color: #fff;
                            font-weight: 600;
                        }
                    }
                }
            }

            .hover-info {
                margin-top: 0.7rem;
                opacity: 0;
                transform: translateY(16px);
                transition: opacity 0.3s ease, transform 0.3s ease;

                @media (max-width: 768px) {
                    margin-top: 0.5rem;
                }

                p {
                    color: var(--text-secondary);
                    font-size: 0.82rem;
                    margin-bottom: 0.65rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    line-height: 1.4;

                    @media (max-width: 768px) {
                        font-size: 0.78rem;
                        -webkit-line-clamp: 2;
                    }
                }

                .view-btn {
                    display: inline-flex;
                    align-items: center;
                    background: rgba(201, 149, 91, 0.16);
                    border: 1px solid var(--border-soft);
                    color: var(--accent-strong);
                    padding: 0.36rem 0.75rem;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    font-weight: 600;

                    @media (max-width: 768px) {
                        padding: 0.34rem 0.7rem;
                        font-size: 0.8rem;
                    }
                }
            }
        }

        &:hover {
            border-color: rgba(201, 149, 91, 0.32);

            img {
                transform: scale(1.05);
            }

            .overlay {
                transform: translateY(0);
                
                .hover-info {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }
    }

    @media (max-width: 1024px) {
        .content-container {
            grid-template-columns: minmax(0, 1fr) 300px;
            gap: 1rem;
        }
    }

    @media (max-width: 900px) {
        .content-container {
            grid-template-columns: minmax(0, 1fr);
        }
    }
`;
export default Airing;
