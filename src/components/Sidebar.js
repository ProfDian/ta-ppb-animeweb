import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaStar, FaEye, FaTrophy } from 'react-icons/fa';
import { useGlobalContext } from '../context/global';

function Sidebar() {
    const { popularAnime } = useGlobalContext();

    const sorted = popularAnime?.sort((a, b) => b.score - a.score);

    const sidebarVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: { 
            x: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const itemVariants = {
        hidden: { x: 20, opacity: 0 },
        visible: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        })
    };

    return (
        <SidebarStyled
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
        >
            <div className="sticky-wrapper">
                <div className="header">
                    <FaTrophy className="trophy-icon" />
                    <h3>Top 5 Popular</h3>
                </div>
                
                <div className="anime-list">
                    {sorted?.slice(0, 5).map((anime, index) => (
                        <motion.div
                            key={anime.mal_id}
                            custom={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03 }}
                            className="anime-item-wrapper"
                        >
                            <Link to={`/anime/${anime.mal_id}`}>
                                <div className="anime-card">
                                    <div className="rank-badge">{index + 1}</div>
                                    <div className="image-wrapper">
                                        <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                                        <div className="image-overlay">
                                            <FaEye className="view-icon" />
                                        </div>
                                    </div>
                                    <div className="anime-info">
                                        <h5>{anime.title}</h5>
                                        <div className="stats">
                                            <div className="score">
                                                <FaStar className="star-icon" />
                                                <span>{anime.score}</span>
                                            </div>
                                            <div className="members">
                                                <span>{(anime.members / 1000).toFixed(1)}K Members</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SidebarStyled>
    );
}

const glowPulse = keyframes`
    0% { box-shadow: 0 0 10px rgba(79, 70, 229, 0.3); }
    50% { box-shadow: 0 0 20px rgba(79, 70, 229, 0.5); }
    100% { box-shadow: 0 0 10px rgba(79, 70, 229, 0.3); }
`;

const trophyShine = keyframes`
    0% { color: #ffd700; }
    50% { color: #fff7cc; }
    100% { color: #ffd700; }
`;

const SidebarStyled = styled.div`
    width: 340px;
    margin-left: 2rem;
    margin-top: 2rem;
    
    .sticky-wrapper {
        position: sticky;
        top: 2rem;
        background: rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        
        .header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.8rem;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
            
            .trophy-icon {
                font-size: 1.8rem;
                animation: ${trophyShine} 2s infinite;
            }
            
            h3 {
                color: #fff;
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0;
                background: linear-gradient(to right, #fff, #e2e8f0);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }

    .anime-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .anime-item-wrapper {
        a {
            text-decoration: none;
        }
    }

    .anime-card {
        position: relative;
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-radius: 12px;
        background: rgba(30, 41, 59, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
        
        &:hover {
            background: rgba(30, 41, 59, 0.8);
            animation: ${glowPulse} 2s infinite;
            
            .image-wrapper {
                .image-overlay {
                    opacity: 1;
                }
                
                img {
                    transform: scale(1.05);
                }
            }
        }

        .rank-badge {
            position: absolute;
            top: -8px;
            left: -8px;
            width: 28px;
            height: 28px;
            background: #4f46e5;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 0.9rem;
            border: 2px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .image-wrapper {
            position: relative;
            width: 80px;
            height: 120px;
            border-radius: 8px;
            overflow: hidden;
            
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            .image-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;

                .view-icon {
                    color: white;
                    font-size: 1.5rem;
                }
            }
        }

        .anime-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            
            h5 {
                color: #fff;
                font-size: 0.95rem;
                margin: 0;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                line-height: 1.4;
            }

            .stats {
                display: flex;
                flex-direction: column;
                gap: 0.4rem;
                
                .score {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    color: #eab308;
                    font-weight: 600;
                    
                    .star-icon {
                        font-size: 0.9rem;
                    }
                }

                .members {
                    font-size: 0.8rem;
                    color: #94a3b8;
                }
            }
        }
    }

    @media (max-width: 1400px) {
        width: 300px;
    }

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
        
        .sticky-wrapper {
            position: relative;
            top: 0;
        }

        .anime-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1rem;
        }
    }
`;

export default Sidebar;