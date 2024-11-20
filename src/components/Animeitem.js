import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

function AnimeItem() {
    const { id } = useParams();
    const [anime, setAnime] = useState({});
    const [characters, setCharacters] = useState([]);
    const [genres, setGenres] = useState([]);
    const [themes, setThemes] = useState({ openings: [], endings: [] });
    const [reviews, setReviews] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
    const navigate = useNavigate();

    const { 
        title, synopsis, trailer, duration, aired, season, images, 
        rank, score, popularity, status, rating, source,
        favorites, titles, title_english, title_japanese, producers, studios 
    } = anime;

    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const data = await response.json();
        setAnime(data.data);
        setGenres(data.data.genres);
    }

    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`);
        const data = await response.json();
        setCharacters((data.data || []).slice(0, 10));
    }

    const getThemes = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/themes`);
        const data = await response.json();
        setThemes(data.data);
    }

    const getReviews = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/reviews`);
        const data = await response.json();
        setReviews((data.data || []).slice(0, 6));
    }

    useEffect(() => {
        getAnime(id);
        getCharacters(id);
        getThemes(id);
        getReviews(id);
    }, [id]);

    const handleTrailerClick = () => {
        setIsTrailerPlaying(true);
    }

    const handleBack = () => {
        navigate('/');
    };

    return (
        <AnimeItemStyled>
            <div className="back-button" onClick={handleBack}>
                <span className="back-icon">←</span>
                <span>Back to Home</span>
            </div>

            <div className="header-section">
                <h1>{title}</h1>
                <div className="score-container">
                    <div className="score-circle">
                        <span className="score-number">{score || 'N/A'}</span>
                        <span className="score-label">Score</span>
                    </div>
                </div>
            </div>

            <div className="details">
                <div className="detail">
                    <div className="image-section">
                        <div className="image-container">
                            <img src={images?.jpg.large_image_url} alt="" />
                            <div className="image-overlay">
                                <div className="rank-display">
                                    <span className="rank-number">#{rank}</span>
                                    <span className="rank-label">Ranked</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="anime-details">
                        <div className="titles-section">
                            <h3>Alternative Titles</h3>
                            <div className="title-grid">
                                {title_english && (
                                    <div className="title-item">
                                        <span className="label">English</span>
                                        <span className="value">{title_english}</span>
                                    </div>
                                )}
                                {title_japanese && (
                                    <div className="title-item">
                                        <span className="label">Japanese</span>
                                        <span className="value">{title_japanese}</span>
                                    </div>
                                )}
                                {titles?.map((title, index) => (
                                    <div key={index} className="title-item">
                                        <span className="label">{title.type}</span>
                                        <span className="value">{title.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="info-grid">
                            <div className="info-item">
                                <span className="label">Aired</span>
                                <span className="value">{aired?.string}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Rating</span>
                                <span className="value rating-badge">{rating}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Popularity</span>
                                <span className="value popularity-number">#{popularity}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Status</span>
                                <span className="value status-badge">{status}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Source</span>
                                <span className="value source-tag">{source}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Season</span>
                                <span className="value season-tag">{season}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Duration</span>
                                <span className="value">{duration}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Favorites</span>
                                <span className="value favorites-count">♥ {favorites}</span>
                            </div>
                        </div>

                        <div className="production-info">
                            <div className="producers">
                                <h4>Producers</h4>
                                <div className="company-tags">
                                    {producers?.map((producer) => (
                                        <span key={producer.mal_id} className="company-tag">
                                            {producer.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="studios">
                                <h4>Studios</h4>
                                <div className="company-tags">
                                    {studios?.map((studio) => (
                                        <span key={studio.mal_id} className="company-tag">
                                            {studio.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="genres">
                            <span className="label">Genres</span>
                            <div className="genre-tags">
                                {genres.map((genre) => (
                                    <span key={genre.mal_id} className="genre">{genre.name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="description">
                    <h3>Synopsis</h3>
                    <p>
                        {showMore ? synopsis : synopsis?.substring(0, 350) + '...'}
                        <button onClick={() => setShowMore(!showMore)}>
                            {showMore ? '⌃ Show Less' : '⌄ Read More'}
                        </button>
                    </p>
                </div>
            </div>

            {(themes.openings.length > 0 || themes.endings.length > 0) && (
                <div className="themes-section">
                    <h3 className="title">Theme Songs</h3>
                    <div className="themes-container">
                        {themes.openings.length > 0 && (
                            <div className="theme-list">
                                <h4>Opening Themes</h4>
                                {themes.openings.map((opening, index) => (
                                    <div key={index} className="theme-item">
                                        <span className="theme-number">#{index + 1}</span>
                                        <span className="theme-text">{opening}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {themes.endings.length > 0 && (
                            <div className="theme-list">
                                <h4>Ending Themes</h4>
                                {themes.endings.map((ending, index) => (
                                    <div key={index} className="theme-item">
                                        <span className="theme-number">#{index + 1}</span>
                                        <span className="theme-text">{ending}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <h3 className="title">Trailer</h3>
            <div className="trailer-con">
                {trailer?.embed_url ? (
                    <>
                        <div className="video-container">
                            {isTrailerPlaying ? (
                                <iframe 
                                    src={trailer.embed_url} 
                                    title="Anime Trailer"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                            ) : (
                                <div className="trailer-placeholder">
                                    <button className="play-button" onClick={handleTrailerClick}>
                                        <span className="play-icon">▶</span>
                                        Watch Trailer
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="no-trailer">
                        <span className="no-trailer-icon">🎬</span>
                        <h3>Trailer not available</h3>
                    </div>
                )}
            </div>

            <h3 className="title">Characters</h3>
            <div className="characters">
                {characters?.map((character, index) => {
                    const { role } = character;
                    const { images, name, mal_id } = character.character;
                    return (
                        <Link to={`/character/${mal_id}`} key={index}>
                            <div className="character">
                                <div className="character-image">
                                    <img src={images?.jpg.image_url} alt="" />
                                    <div className="character-overlay">
                                        <span className="view-more">View Details</span>
                                    </div>
                                </div>
                                <div className="character-info">
                                    <h4>{name}</h4>
                                    <p className="role-tag">{role}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <h3 className="title">Recent Reviews</h3>
            {reviews.length > 0 ? (
                <div className="reviews">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <div className="review-header">
                                <div className="reviewer-image-container">
                                    <img src={review.user.images?.jpg.image_url} alt="" className="reviewer-image" />
                                </div>
                                <div className="reviewer-info">
                                    <h4>{review.user.username}</h4>
                                    <div className="review-score">
                                        <span className="score-value">{review.score}</span>
                                        <span className="score-max">/10</span>
                                    </div>
                                </div>
                            </div>
                            <p className="review-text">
                                {review.review.substring(0, 200)}...
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-reviews">
                    <span className="no-reviews-icon">📝</span>
                    <p>No Recent Reviews</p>
                </div>
            )}
        </AnimeItemStyled>
    );
}

const glowText = keyframes`
    0% { text-shadow: 0 0 10px rgba(82, 190, 255, 0.5), 0 0 20px rgba(82, 190, 255, 0.3); }
    50% { text-shadow: 0 0 20px rgba(255, 97, 166, 0.5), 0 0 30px rgba(255, 97, 166, 0.3); }
    100% { text-shadow: 0 0 10px rgba(82, 190, 255, 0.5), 0 0 20px rgba(82, 190, 255, 0.3); }
`;

const floatAnimation = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
`;

const shineEffect = keyframes`
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
`;

const rippleEffect = keyframes`
    0% { transform: scale(0.95); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 0.9; }
    100% { transform: scale(0.95); opacity: 0.7; }
`;

const pulseGlow = keyframes`
    0% { box-shadow: 0 0 10px rgba(82, 190, 255, 0.5); }
    50% { box-shadow: 0 0 20px rgba(255, 97, 166, 0.5); }
    100% { box-shadow: 0 0 10px rgba(82, 190, 255, 0.5); }
`;

const slideInLeft = keyframes`
    from {
        transform: translateX(-20px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const AnimeItemStyled = styled.div`
    background: linear-gradient(135deg, #1a1c2c 0%, #2a3c54 100%);
    min-height: 100vh;
    padding: 2rem;
    color: #ffffff;

    @media (min-width: 768px) {
        padding: 2rem 5rem;
    }

    @media (min-width: 1200px) {
        padding: 2rem 10rem;
    }

    .back-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.8rem 1.5rem;
        background: linear-gradient(45deg, rgba(82, 190, 255, 0.2), rgba(255, 97, 166, 0.2));
        border-radius: 50px;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 2rem;
        animation: ${slideInLeft} 0.5s ease-out;
        width: fit-content;

        .back-icon {
            font-size: 1.5rem;
            transition: transform 0.3s ease;
        }

        &:hover {
            background: linear-gradient(45deg, rgba(82, 190, 255, 0.3), rgba(255, 97, 166, 0.3));
            transform: translateX(-5px);

            .back-icon {
                transform: translateX(-5px);
            }
        }
    }

    .header-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        margin-bottom: 3rem;
        text-align: center;

        @media (min-width: 768px) {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
            align-items: center;
        }

        h1 {
            font-size: 2rem;
            font-weight: 700;
            background: linear-gradient(45deg, #52beff, #ff61a6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: ${glowText} 3s infinite;

            @media (min-width: 768px) {
                font-size: 2.5rem;
            }

            @media (min-width: 1200px) {
                font-size: 3rem;
            }
        }

        .score-container {
            .score-circle {
                background: linear-gradient(45deg, #52beff, #ff61a6);
                border-radius: 50%;
                width: 100px;
                height: 100px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                animation: ${floatAnimation} 3s ease-in-out infinite;
                box-shadow: 0 0 20px rgba(82, 190, 255, 0.3);

                @media (min-width: 768px) {
                    width: 120px;
                    height: 120px;
                }

                .score-number {
                    font-size: 2rem;
                    font-weight: bold;

                    @media (min-width: 768px) {
                        font-size: 2.5rem;
                    }
                }

                .score-label {
                    font-size: 0.9rem;
                    opacity: 0.9;

                    @media (min-width: 768px) {
                        font-size: 1rem;
                    }
                }
            }
        }
    }

    .details {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 1.5rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

        @media (min-width: 768px) {
            padding: 2rem;
        }

        .detail {
            display: flex;
            flex-direction: column;
            gap: 2rem;

            @media (min-width: 1200px) {
                flex-direction: row;
                gap: 3rem;
            }

            .image-section {
                width: 100%;
                display: flex;
                justify-content: center;

                @media (min-width: 1200px) {
                    width: auto;
                    justify-content: flex-start;
                }

                .image-container {
                    width: 280px;
                    max-width: 100%;
                    position: relative;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;

                    @media (min-width: 768px) {
                        width: 320px;
                    }

                    &:hover {
                        transform: translateY(-10px);
                        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);

                        .image-overlay {
                            opacity: 1;
                        }
                    }

                    img {
                        width: 100%;
                        height: auto;
                        display: block;
                    }

                    .image-overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(180deg, rgba(26, 28, 44, 0.8) 0%, rgba(42, 60, 84, 0.9) 100%);
                        opacity: 0;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .rank-display {
                            text-align: center;
                            animation: ${pulseGlow} 2s infinite;

                            .rank-number {
                                font-size: 2.5rem;
                                font-weight: bold;
                                background: linear-gradient(45deg, #52beff, #ff61a6);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;

                                @media (min-width: 768px) {
                                    font-size: 3rem;
                                }
                            }

                            .rank-label {
                                display: block;
                                font-size: 1.2rem;
                                color: #ffffff;
                                margin-top: 0.5rem;
                            }
                        }
                    }
                }
            }

            .anime-details {
                flex: 1;

                .titles-section {
                    margin-bottom: 2rem;

                    h3 {
                        font-size: 1.3rem;
                        margin-bottom: 1rem;
                        color: #52beff;

                        @media (min-width: 768px) {
                            font-size: 1.5rem;
                        }
                    }

                    .title-grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 1rem;

                        @media (min-width: 768px) {
                            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        }

                        .title-item {
                            background: rgba(255, 255, 255, 0.05);
                            padding: 1rem;
                            border-radius: 10px;
                            transition: all 0.3s ease;

                            &:hover {
                                background: rgba(255, 255, 255, 0.1);
                                transform: translateX(5px);
                            }

                            .label {
                                display: block;
                                font-size: 0.9rem;
                                color: #52beff;
                                margin-bottom: 0.5rem;
                            }

                            .value {
                                font-size: 1.1rem;
                                color: #ffffff;
                            }
                        }
                    }
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 1rem;
                    margin: 2rem 0;

                    @media (min-width: 768px) {
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        gap: 1.5rem;
                    }

                    .info-item {
                        background: rgba(255, 255, 255, 0.05);
                        padding: 1rem;
                        border-radius: 10px;
                        transition: all 0.3s ease;

                        &:hover {
                            background: rgba(255, 255, 255, 0.1);
                            transform: translateY(-5px);
                        }

                        .label {
                            display: block;
                            font-size: 0.9rem;
                            color: #52beff;
                            margin-bottom: 0.5rem;
                        }

                        .value {
                            font-size: 1.1rem;
                            color: #ffffff;
                            word-break: break-word;

                            &.favorites-count {
                                color: #ff61a6;
                            }

                            &.rating-badge,
                            &.status-badge,
                            &.source-tag,
                            &.season-tag {
                                background: linear-gradient(45deg, rgba(82, 190, 255, 0.2), rgba(255, 97, 166, 0.2));
                                padding: 0.3rem 0.8rem;
                                border-radius: 0.5rem;
                                font-size: 0.9rem;
                                display: inline-block;

                                &:hover {
                                    background: linear-gradient(45deg, rgba(82, 190, 255, 0.3), rgba(255, 97, 166, 0.3));
                                    transform: translateY(-2px);
                                }
                            }

                            &.popularity-number {
                                font-family: 'Oswald', sans-serif;
                                font-size: 1.3rem;
                                color: #ff61a6;
                            }
                        }
                    }
                }

                .production-info {
                    margin-top: 2rem;

                    h4 {
                        color: #52beff;
                        margin-bottom: 1rem;
                        font-size: 1.2rem;

                        @media (min-width: 768px) {
                            font-size: 1.3rem;
                        }
                    }

                    .company-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.8rem;
                        margin-bottom: 1.5rem;

                        .company-tag {
                            background: linear-gradient(45deg, rgba(82, 190, 255, 0.2), rgba(255, 97, 166, 0.2));
                            padding: 0.5rem 1rem;
                            border-radius: 20px;
                            font-size: 0.9rem;
                            transition: all 0.3s ease;

                            &:hover {
                                background: linear-gradient(45deg, rgba(82, 190, 255, 0.3), rgba(255, 97, 166, 0.3));
                                transform: translateY(-3px);
                            }
                        }
                    }
                }

                .genres {
                    margin-top: 2rem;

                    .label {
                        display: block;
                        font-size: 0.9rem;
                        color: #52beff;
                        margin-bottom: 1rem;

                        @media (min-width: 768px) {
                            font-size: 1rem;
                        }
                    }

                    .genre-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.8rem;

                        .genre {
                            background: linear-gradient(45deg, rgba(82, 190, 255, 0.2), rgba(255, 97, 166, 0.2));
                            padding: 0.5rem 1rem;
                            border-radius: 20px;
                            font-size: 0.9rem;
                            transition: all 0.3s ease;

                            &:hover {
                                background: linear-gradient(45deg, rgba(82, 190, 255, 0.3), rgba(255, 97, 166, 0.3));
                                transform: translateY(-3px);
                            }
                        }
                    }
                }
            }
        }

        .description {
            margin-top: 2rem;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;

            h3 {
                color: #52beff;
                margin-bottom: 1rem;
                font-size: 1.3rem;

                @media (min-width: 768px) {
                    font-size: 1.5rem;
                }
            }

            p {
                color: #ffffff;
                line-height: 1.8;
                font-size: 1rem;

                @media (min-width: 768px) {
                    font-size: 1.05rem;
                }
            }

            button {
                background: none;
                border: none;
                color: #52beff;
                font-weight: 600;
                cursor: pointer;
                margin-left: 0.8rem;
                transition: all 0.3s ease;

                &:hover {
                    color: #ff61a6;
                    transform: translateX(5px);
                }
            }
        }
    }

    .themes-section {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 1.5rem;
        margin-top: 3rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

        @media (min-width: 768px) {
            padding: 2rem;
        }

        .themes-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;

            @media (min-width: 992px) {
                grid-template-columns: repeat(2, 1fr);
            }

            .theme-list {
                h4 {
                    font-size: 1.5rem;
                    color: #52beff;
                    margin-bottom: 1.5rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid rgba(82, 190, 255, 0.3);
                    position: relative;

                    @media (min-width: 768px) {
                        font-size: 1.8rem;
                    }

                    &::after {
                        content: '';
                        position: absolute;
                        bottom: -2px;
                        left: 0;
                        width: 50px;
                        height: 2px;
                        background: linear-gradient(45deg, #52beff, #ff61a6);
                    }
                }

                .theme-item {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 1.2rem;
                    border-radius: 12px;
                    margin-bottom: 1rem;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;

                    &::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 200%;
                        height: 100%;
                        background: linear-gradient(
                            90deg,
                            transparent,
                            rgba(82, 190, 255, 0.2),
                            rgba(255, 97, 166, 0.2),
                            transparent
                        );
                        transition: all 0.5s ease;
                    }

                    &:hover {
                        transform: translateX(10px);
                        background: rgba(255, 255, 255, 0.1);

                        &::before {
                            animation: ${shineEffect} 1.5s linear;
                        }
                    }

                    .theme-number {
                        background: linear-gradient(45deg, #52beff, #ff61a6);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-size: 1.2rem;
                        font-weight: bold;
                        margin-right: 1rem;
                    }

                    .theme-text {
                        color: #ffffff;
                        font-size: 0.9rem;
                        letter-spacing: 0.5px;

                        @media (min-width: 768px) {
                            font-size: 1rem;
                        }
                    }
                }
            }
        }
    }

    .trailer-con {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 1.5rem;
        margin-top: 3rem;
        position: relative;
        overflow: hidden;

        @media (min-width: 768px) {
            padding: 2rem;
        }

        .video-container {
            position: relative;
            padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
            height: 0;
            overflow: hidden;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);

            iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: none;
                transition: all 0.3s ease;
            }

            .trailer-placeholder {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .play-button {
            background: linear-gradient(45deg, #52beff, #ff61a6);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            
            &:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            }

            .play-icon {
                animation: ${rippleEffect} 2s infinite;
            }
        }

        .no-trailer {
            padding: 4rem 2rem;
            text-align: center;

            .no-trailer-icon {
                font-size: 3rem;
                margin-bottom: 1.5rem;
                background: linear-gradient(45deg, #52beff, #ff61a6);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: ${floatAnimation} 3s infinite;
                display: block;

                @media (min-width: 768px) {
                    font-size: 4rem;
                }
            }

            h3 {
                font-size: 1.5rem;
                color: rgba(255, 255, 255, 0.7);

                @media (min-width: 768px) {
                    font-size: 1.8rem;
                }
            }
        }
    }

    .characters {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;

        @media (min-width: 768px) {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .character {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            overflow: hidden;
            transition: all 0.4s ease;
            height: 100%;

            &:hover {
                transform: translateY(-10px) scale(1.02);
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);

                .character-image {
                    .character-overlay {
                        opacity: 1;
                        
                        .view-more {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                }
            }

            .character-image {
                position: relative;
                overflow: hidden;
                aspect-ratio: 3/4;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all 0.4s ease;
                }

                .character-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        180deg,
                        rgba(26, 28, 44, 0.5) 0%,
                        rgba(42, 60, 84, 0.9) 100%
                    );
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: all 0.4s ease;

                    .view-more {
                        background: linear-gradient(45deg, #52beff, #ff61a6);
                        padding: 0.8rem 1.5rem;
                        border-radius: 25px;
                        color: white;
                        font-weight: 600;
                        transform: translateY(20px);
                        opacity: 0;
                        transition: all 0.4s ease;
                        font-size: 0.9rem;
                    }
                }
            }

            .character-info {
                padding: 1.2rem;
                text-align: center;

                h4 {
                    font-size: 1.1rem;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(45deg, #52beff, #ff61a6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    
                    @media (min-width: 768px) {
                        font-size: 1.2rem;
                    }
                }

                .role-tag {
                    background: linear-gradient(45deg, rgba(82, 190, 255, 0.2), rgba(255, 97, 166, 0.2));
                    padding: 0.4rem 1rem;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    color: #ffffff;
                    transition: all 0.3s ease;
                    display: inline-block;

                    @media (min-width: 768px) {
                        font-size: 0.9rem;
                    }

                    &:hover {
                        background: linear-gradient(45deg, rgba(82, 190, 255, 0.3), rgba(255, 97, 166, 0.3));
                        transform: translateY(-2px);
                    }
                }
            }
        }
    }

    .reviews {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;

        @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            margin-top: 3rem;
        }

        @media (min-width: 1200px) {
            grid-template-columns: repeat(3, 1fr);
        }

        .review-card {
         background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(5px);
            border-radius: 15px;
            padding: 1.5rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(90deg, #52beff, #ff61a6);
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 0.3s ease;
            }

            &:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

                &::before {
                    transform: scaleX(1);
                }
            }

            .review-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.5rem;

                .reviewer-image-container {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid #52beff;
                    flex-shrink: 0;

                    @media (min-width: 768px) {
                        width: 60px;
                        height: 60px;
                    }
                    
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                .reviewer-info {
                    flex: 1;
                    min-width: 0;

                    h4 {
                        color: #ffffff;
                        margin-bottom: 0.5rem;
                        font-size: 1rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;

                        @media (min-width: 768px) {
                            font-size: 1.1rem;
                        }
                    }

                    .review-score {
                        background: linear-gradient(45deg, #52beff, #ff61a6);
                        padding: 0.4rem 1rem;
                        border-radius: 20px;
                        display: inline-flex;
                        align-items: baseline;
                        gap: 0.3rem;

                        .score-value {
                            font-size: 1.1rem;
                            font-weight: bold;

                            @media (min-width: 768px) {
                                font-size: 1.2rem;
                            }
                        }

                        .score-max {
                            opacity: 0.8;
                            font-size: 0.9rem;
                        }
                    }
                }
            }

            .review-text {
                color: rgba(255, 255, 255, 0.9);
                line-height: 1.6;
                font-size: 0.9rem;

                @media (min-width: 768px) {
                    font-size: 0.95rem;
                }
            }
        }
    }

    .no-reviews {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(5px);
        border-radius: 20px;
        padding: 3rem;
        text-align: center;
        margin-top: 2rem;

        @media (min-width: 768px) {
            margin-top: 3rem;
        }

        .no-reviews-icon {
            font-size: 3rem;
            margin-bottom: 1.5rem;
            background: linear-gradient(45deg, #52beff, #ff61a6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: ${floatAnimation} 3s infinite;
            display: block;

            @media (min-width: 768px) {
                font-size: 4rem;
            }
        }

        p {
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.7);

            @media (min-width: 768px) {
                font-size: 1.8rem;
            }
        }
    }

    .title {
        font-family: 'Oswald', sans-serif;
        font-size: 1.8rem;
        margin: 2.5rem 0 1rem;
        color: #52beff;
        position: relative;
        display: inline-block;
        padding-bottom: 0.5rem;

        @media (min-width: 768px) {
            font-size: 2rem;
            margin: 3rem 0 1.5rem;
        }

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(to right, #52beff, #ff61a6);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
        }

        &:hover::after {
            transform: scaleX(1);
        }
    }
`;

export default AnimeItem;