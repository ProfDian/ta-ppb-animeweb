import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import styled  from 'styled-components';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

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
                        {(!isSearch && rendered === 'airing' ? airingAnime : searchResults)?.map((anime) => (
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
                                                    {anime.score && (
                                                        <p>Score: {anime.score}</p>
                                                    )}
                                                    <p>Episodes: {anime.episodes || 'Ongoing'}</p>
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

    .airing-grid {
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
                rgba(15, 23, 42, 0.95) 0%,
                rgba(15, 23, 42, 0.8) 30%,
                rgba(15, 23, 42, 0.4) 60%,
                rgba(15, 23, 42, 0) 100%
            );
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            transform: translateY(60%);
            transition: all 0.3s ease;

            @media (max-width: 768px) {
                padding: 0.75rem;
                transform: translateY(65%);
            }

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

                    @media (max-width: 768px) {
                        font-size: 0.9rem;
                        -webkit-line-clamp: 1;
                        margin-bottom: 1.5rem;
                    }
                }

                .anime-stats {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    font-size: 0.85rem;
                    margin-bottom: 0.5rem;

                    @media (max-width: 768px) {
                        font-size: 0.8rem;
                        gap: 0.75rem;
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
                margin-top: 0.75rem;
                opacity: 0;
                transition: opacity 0.3s ease;
                transform: translateY(20px);

                @media (max-width: 768px) {
                    margin-top: 0.5rem;
                }

                p {
                    color: #e2e8f0;
                    font-size: 0.85rem;
                    margin-bottom: 0.75rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    line-height: 1.4;

                    @media (max-width: 768px) {
                        font-size: 0.8rem;
                        -webkit-line-clamp: 2;
                        margin-bottom: 0.5rem;
                    }
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

                    @media (max-width: 768px) {
                        padding: 0.4rem 0.8rem;
                        font-size: 0.8rem;
                    }

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
                    }
                }
            }
        }

        &:hover {
            .overlay {
                transform: translateY(0);
                
                .hover-info {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }
    }
`;
export default Airing;
