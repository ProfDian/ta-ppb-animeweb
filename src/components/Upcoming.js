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
        max-width: 1800px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    .main-content {
        flex: 1;
        min-width: 0;
    }

    .section-title {
        text-align: center;
        color: #fff;
        font-size: 2.5rem;
        margin: 2rem 0;
        font-weight: 700;
        letter-spacing: 2px;
        animation: ${titleGlow} 3s infinite;
        background: linear-gradient(to right, #4f46e5, #818cf8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            bottom: -0.8rem;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background: linear-gradient(to right, #4f46e5, #818cf8);
            border-radius: 2px;
        }
    }

    .upcoming-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
        padding: 1rem;
    }

    a {
        text-decoration: none;
    }

    .anime-card {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        animation: ${fadeInUp} 0.6s ease forwards;

        .anime-image {
            position: relative;
            height: 400px;
            
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            .overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(
                    to top,
                    rgba(15, 23, 42, 0.95) 0%,
                    rgba(15, 23, 42, 0.7) 50%,
                    transparent 100%
                );
                padding: 1.5rem;
                transform: translateY(70%);
                transition: transform 0.3s ease;

                .info {
                    h3 {
                        color: #fff;
                        font-size: 1.2rem;
                        font-weight: 600;
                        margin-bottom: 0.5rem;
                        text-align: left;
                    }

                    .anime-stats {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                        font-size: 0.9rem;
                        color: #e2e8f0;
                    }
                }

                .hover-info {
                    margin-top: 1rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;

                    p {
                        color: #94a3b8;
                        font-size: 0.9rem;
                        line-height: 1.5;
                        margin-bottom: 1rem;
                    }

                    .view-btn {
                        display: inline-block;
                        background: #4f46e5;
                        color: white;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-size: 0.9rem;

                        &:hover {
                            background: #4338ca;
                            transform: translateY(-2px);
                        }
                    }
                }
            }

            &:hover {
                img {
                    transform: scale(1.05);
                }

                .overlay {
                    transform: translateY(0);
                    .hover-info {
                        opacity: 1;
                    }
                }
            }
        }
    }

    @media (max-width: 1400px) {
        .upcoming-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
    }

    @media (max-width: 968px) {
        .content-container {
            flex-direction: column;
        }

        .section-title {
            font-size: 2rem;
        }
    }

    @media (max-width: 480px) {
        .upcoming-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
        }

        .section-title {
            font-size: 1.8rem;
        }

        .anime-card .anime-image {
            height: 300px;
        }
    }
`;

export default Upcoming;