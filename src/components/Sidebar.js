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
        hidden: { x: 50, opacity: 0 },
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
                            whileHover={{ scale: 1.02 }}
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
    width: 300px;
    margin-left: 1rem;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
        margin-top: 1rem;
    }

    .sticky-wrapper {
        position: sticky;
        top: 80px;
        background: rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(10px);
        border-radius: 12px;
        padding: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.1);

        @media (max-width: 768px) {
            position: relative;
            top: 0;
            padding: 0.75rem;
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);

            .trophy-icon {
                font-size: 1.5rem;
                color: #ffd700;
            }

            h3 {
                color: #fff;
                font-size: 1.2rem;
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
        gap: 0.75rem;

        @media (max-width: 768px) {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1rem;
        }

        @media (max-width: 480px) {
            grid-template-columns: 1fr;
            gap: 0.75rem;
        }
    }

    .anime-item-wrapper {
        animation: slideIn 0.3s ease-out forwards;
    }

    .anime-card {
        position: relative;
        display: flex;
        gap: 0.75rem;
        padding: 0.75rem;
        border-radius: 8px;
        background: rgba(30, 41, 59, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;

        &:hover {
            background: rgba(30, 41, 59, 0.8);
            transform: translateX(5px);

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
            width: 24px;
            height: 24px;
            background: #4f46e5;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 0.8rem;
            border: 2px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 1;
        }

        .image-wrapper {
            position: relative;
            width: 70px;
            height: 100px;
            border-radius: 6px;
            overflow: hidden;
            
            @media (max-width: 768px) {
                width: 80px;
                height: 120px;
            }

            @media (max-width: 480px) {
                width: 70px;
                height: 100px;
            }
            
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
                    font-size: 1.2rem;
                }
            }
        }

        .anime-info {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            
            h5 {
                color: #fff;
                font-size: 0.9rem;
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
                gap: 0.3rem;
                
                .score {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    color: #eab308;
                    font-weight: 600;
                    font-size: 0.8rem;
                    
                    .star-icon {
                        font-size: 0.8rem;
                    }
                }

                .members {
                    font-size: 0.75rem;
                    color: #94a3b8;
                }
            }
        }

        @media (hover: none) {
            &:active {
                transform: scale(0.98);
            }
        }
    }
`
export default Sidebar;