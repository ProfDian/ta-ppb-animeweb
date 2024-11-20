import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

function Upcoming({ rendered }) {
    const { upcomingAnime, isSearch, searchResults } = useGlobalContext();

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
        <UpcomingStyled>
            <motion.div 
                className="content-container"
                initial="hidden"
                animate="show"
                variants={container}
            >
                <div className="main-content">
                    <div className="upcoming-grid">
                        {(!isSearch && rendered === 'upcoming' ? upcomingAnime : searchResults)?.map((anime) => (
                            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                                <motion.div 
                                    className="anime-card" 
                                    variants={item}
                                    whileHover={{ 
                                        scale: 1.03,
                                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
                                    }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="anime-image">
                                        <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                                        <div className="overlay">
                                            <div className="info">
                                                <h3>{anime.title}</h3>
                                                <div className="anime-stats">
                                                    {anime.aired?.from && (
                                                        <p>Release: {new Date(anime.aired.from).toLocaleDateString()}</p>
                                                    )}
                                                    {anime.episodes && (
                                                        <p>Episodes: {anime.episodes}</p>
                                                    )}
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
        </UpcomingStyled>
    );
    
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const titleGlow = keyframes`
  0% { text-shadow: 0 0 10px rgba(79, 70, 229, 0.3); }
  50% { text-shadow: 0 0 20px rgba(79, 70, 229, 0.5); }
  100% { text-shadow: 0 0 10px rgba(79, 70, 229, 0.3); }
`;

const UpcomingStyled = styled.div`
    .content-container {
        display: flex;
        gap: 2rem;

        @media (max-width: 768px) {
            flex-direction: column;
            padding: 0.5rem;
        }
    }

    .main-content {
        flex: 1;
        min-width: 0;
    }

    .upcoming-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 1.5rem;
        padding: 0.5rem;

        @media (max-width: 768px) {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
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
    border-radius: 12px;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
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
                rgba(15, 23, 42, 0.95) 10%,
                rgba(15, 23, 42, 0.4) 30%,
                rgba(15, 23, 42, 0) 100%
            );
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            transition: all 0.3s ease;

            .info {
                h3 {
                    color: #fff;
                    font-size: 1rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    line-height: 1.3;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

                    @media (max-width: 768px) {
                        font-size: 0.9rem;
                        -webkit-line-clamp: 1;
                    }
                }

                .anime-stats {
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                    font-size: 0.85rem;
                    color: #e2e8f0;
                    margin-bottom: 0.5rem;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.3s ease;

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
                margin-top: 0.75rem;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;

                p {
                    color: #e2e8f0;
                    font-size: 0.85rem;
                    margin-bottom: 0.75rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    line-height: 1.4;
                }

                .view-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: linear-gradient(45deg, #4f46e5, #6366f1);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    font-size: 0.85rem;
                    font-weight: 500;
                    transition: all 0.2s ease;

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
                    }
                }
            }
        }

        /* Desktop hover effects */
        @media (hover: hover) {
            &:hover {
                img {
                    transform: scale(1.05);
                }

                .overlay {
                    background: linear-gradient(
                        to top,
                        rgba(15, 23, 42, 0.98) 0%,
                        rgba(15, 23, 42, 0.95) 30%,
                        rgba(15, 23, 42, 0.9) 100%
                    );

                    .info {
                        .anime-stats {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .hover-info {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
        }

        /* Mobile touch behavior */
        @media (hover: none) {
            .overlay {
                background: linear-gradient(
                    to top,
                    rgba(15, 23, 42, 0.95) 10%,
                    rgba(15, 23, 42, 0.4) 30%,
                    rgba(15, 23, 42, 0) 100%
                );

                &:active {
                    background: linear-gradient(
                        to top,
                        rgba(15, 23, 42, 0.98) 0%,
                        rgba(15, 23, 42, 0.95) 30%,
                        rgba(15, 23, 42, 0.9) 100%
                    );

                    .info .anime-stats,
                    .hover-info {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
        }
    }
}`;

export default Upcoming;