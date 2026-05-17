import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaStar, FaEye, FaTrophy } from 'react-icons/fa';
import { useGlobalContext } from '../context/global';

function Sidebar() {
    const { popularAnime } = useGlobalContext();
    const sorted = [...(popularAnime || [])].sort((a, b) => b.score - a.score);

    const sidebarVariants = {
        hidden: { x: 32, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 95,
                damping: 16
            }
        }
    };

    const itemVariants = {
        hidden: { y: 16, opacity: 0 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.07,
                type: 'spring',
                stiffness: 105,
                damping: 14
            }
        })
    };

    return (
        <SidebarStyled as={motion.aside} initial="hidden" animate="visible" variants={sidebarVariants}>
            <div className="sticky-wrapper">
                <header className="header">
                    <p className="eyebrow">community picks</p>
                    <h3>
                        <FaTrophy className="trophy-icon" />
                        Top 5 watchlist
                    </h3>
                    <p className="description">Highest-rated titles from the popularity chart this cycle.</p>
                </header>

                <div className="anime-list">
                    {sorted.slice(0, 5).map((anime, index) => (
                        <motion.article
                            key={anime.mal_id}
                            custom={index}
                            variants={itemVariants}
                            whileHover={{ y: -2 }}
                            className="anime-item"
                        >
                            <Link to={`/anime/${anime.mal_id}`} className="anime-card">
                                <span className="rank-badge">#{index + 1}</span>
                                <div className="image-wrapper">
                                    <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                                    <div className="image-overlay">
                                        <FaEye />
                                    </div>
                                </div>
                                <div className="anime-info">
                                    <h5>{anime.title}</h5>
                                    <div className="stats">
                                        <span className="score">
                                            <FaStar />
                                            {anime.score || 'N/A'}
                                        </span>
                                        <span className="members">{(anime.members / 1000).toFixed(1)}k members</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </SidebarStyled>
    );
}

const SidebarStyled = styled.aside`
    width: 100%;
    max-width: 320px;

    @media (max-width: 900px) {
        max-width: none;
    }

    .sticky-wrapper {
        position: sticky;
        top: 6.65rem;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background:
            linear-gradient(165deg, rgba(22, 31, 44, 0.95), rgba(14, 20, 30, 0.94)),
            radial-gradient(circle at 0% 0%, rgba(201, 149, 91, 0.16), transparent 55%);
        box-shadow: 0 22px 46px rgba(5, 8, 14, 0.52);
        padding: 1rem;
    }

    .header {
        margin-bottom: 0.85rem;
    }

    .eyebrow {
        margin: 0 0 0.55rem;
        color: var(--accent-strong);
        font-size: 0.76rem;
        letter-spacing: 0.07em;
        text-transform: lowercase;
    }

    h3 {
        margin: 0;
        font-size: 1.13rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        display: flex;
        align-items: center;
        gap: 0.48rem;
    }

    .trophy-icon {
        color: var(--accent-strong);
        font-size: 1rem;
    }

    .description {
        margin: 0.58rem 0 0;
        color: var(--text-secondary);
        font-size: 0.84rem;
        line-height: 1.5;
        max-width: 34ch;
    }

    .anime-list {
        display: grid;
        gap: 0.58rem;
    }

    .anime-card {
        display: grid;
        grid-template-columns: auto 56px minmax(0, 1fr);
        align-items: center;
        gap: 0.58rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 13px;
        background: rgba(15, 22, 33, 0.9);
        padding: 0.44rem;
        color: inherit;
        text-decoration: none;
        transition: border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
    }

    .anime-card:hover {
        border-color: rgba(201, 149, 91, 0.32);
        background: rgba(20, 29, 42, 0.98);
        box-shadow: 0 10px 20px rgba(7, 10, 17, 0.44);
    }

    .rank-badge {
        width: 2.05rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        align-self: stretch;
        border-radius: 9px;
        background: var(--accent-soft);
        border: 1px solid var(--border-soft);
        color: var(--accent-strong);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        font-variant-numeric: tabular-nums;
    }

    .image-wrapper {
        position: relative;
        width: 56px;
        height: 76px;
        border-radius: 8px;
        overflow: hidden;
    }

    .image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.24s ease;
    }

    .anime-card:hover img {
        transform: scale(1.05);
    }

    .image-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(11, 16, 24, 0.86), transparent 65%);
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 0.28rem;
        color: rgba(255, 255, 255, 0.84);
    }

    .image-overlay svg {
        font-size: 0.72rem;
    }

    .anime-info {
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.45rem;
    }

    .anime-info h5 {
        margin: 0;
        color: var(--text-primary);
        font-size: 0.84rem;
        font-weight: 600;
        line-height: 1.35;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-wrap: pretty;
    }

    .stats {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.45rem;
        font-size: 0.74rem;
    }

    .score {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        color: #e8c08d;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
    }

    .members {
        color: var(--text-muted);
        font-variant-numeric: tabular-nums;
    }

    @media (max-width: 900px) {
        .sticky-wrapper {
            position: static;
            padding: 0.9rem;
        }

        .anime-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.62rem;
        }

        .anime-card {
            grid-template-columns: auto 52px minmax(0, 1fr);
        }
    }

    @media (max-width: 560px) {
        .anime-list {
            grid-template-columns: minmax(0, 1fr);
        }

        .description {
            max-width: none;
        }
    }
`;

export default Sidebar;
