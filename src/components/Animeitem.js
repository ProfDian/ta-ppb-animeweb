import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function AnimeItem() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [anime, setAnime] = useState({});
    const [characters, setCharacters] = useState([]);
    const [genres, setGenres] = useState([]);
    const [themes, setThemes] = useState({ openings: [], endings: [] });
    const [reviews, setReviews] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

    const {
        title,
        synopsis,
        trailer,
        duration,
        aired,
        season,
        images,
        rank,
        score,
        popularity,
        status,
        rating,
        source,
        favorites,
        titles,
        title_english,
        title_japanese,
        producers,
        studios
    } = anime;

    const safeSynopsis = synopsis || 'Synopsis is not available yet for this title.';
    const synopsisPreview = useMemo(() => {
        if (safeSynopsis.length <= 360) {
            return safeSynopsis;
        }
        return `${safeSynopsis.substring(0, 360)}...`;
    }, [safeSynopsis]);

    const uniqueAltTitles = useMemo(() => {
        const collected = [];
        if (title_english) {
            collected.push({ type: 'English', title: title_english });
        }
        if (title_japanese) {
            collected.push({ type: 'Japanese', title: title_japanese });
        }
        (titles || []).forEach((entry) => {
            const exists = collected.some((item) => item.title === entry.title);
            if (!exists) {
                collected.push(entry);
            }
        });
        return collected.slice(0, 6);
    }, [title_english, title_japanese, titles]);

    const getAnime = async (animeId) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
        const data = await response.json();
        setAnime(data.data || {});
        setGenres(data.data?.genres || []);
    };

    const getCharacters = async (animeId) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
        const data = await response.json();
        setCharacters((data.data || []).slice(0, 10));
    };

    const getThemes = async (animeId) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/themes`);
        const data = await response.json();
        setThemes(data.data || { openings: [], endings: [] });
    };

    const getReviews = async (animeId) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/reviews`);
        const data = await response.json();
        setReviews((data.data || []).slice(0, 6));
    };

    useEffect(() => {
        getAnime(id);
        getCharacters(id);
        getThemes(id);
        getReviews(id);
        setIsTrailerPlaying(false);
        setShowMore(false);
    }, [id]);

    return (
        <AnimeItemStyled>
            <div className="page-shell">
                <motion.button
                    type="button"
                    className="back-button"
                    onClick={() => navigate('/')}
                    initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
                >
                    <span className="arrow-island">↙</span>
                    <span>back to catalog</span>
                </motion.button>

                <section className="hero-grid">
                    <motion.div
                        className="hero-copy"
                        initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                    >
                        <p className="eyebrow">anime profile</p>
                        <h1>{title || 'Loading title...'}</h1>
                        <p className="lead">
                            {showMore ? safeSynopsis : synopsisPreview}
                            {safeSynopsis.length > 360 && (
                                <button type="button" onClick={() => setShowMore((prev) => !prev)} className="read-toggle">
                                    {showMore ? 'show less' : 'read full synopsis'}
                                </button>
                            )}
                        </p>

                        <div className="meta-row">
                            <span className="meta-chip">score {score || 'N/A'}</span>
                            <span className="meta-chip">rank #{rank || 'N/A'}</span>
                            <span className="meta-chip">popularity #{popularity || 'N/A'}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="poster-shell"
                        initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.08, duration: 0.84, ease: [0.32, 0.72, 0, 1] }}
                    >
                        <div className="poster-core">
                            <div className="poster-wrap">
                                <img src={images?.jpg?.large_image_url} alt={`${title || 'Anime'} poster`} />
                                <div className="poster-overlay">
                                    <span className="rank-tag">rank #{rank || 'N/A'}</span>
                                </div>
                            </div>
                            <div className="poster-stats">
                                <div>
                                    <span className="label">status</span>
                                    <span className="value">{status || 'Unknown'}</span>
                                </div>
                                <div>
                                    <span className="label">favorites</span>
                                    <span className="value">{favorites || 0}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                <motion.section
                    className="bento-grid"
                    initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
                >
                    <article className="panel shell-wide">
                        <div className="panel-core">
                            <p className="panel-kicker">titles</p>
                            <h3>alternative naming</h3>
                            <div className="title-grid">
                                {uniqueAltTitles.map((entry, index) => (
                                    <div key={`${entry.type}-${index}`} className="title-item">
                                        <span className="item-label">{entry.type}</span>
                                        <span className="item-value">{entry.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>

                    <article className="panel">
                        <div className="panel-core">
                            <p className="panel-kicker">production</p>
                            <h3>release details</h3>
                            <div className="detail-list">
                                <div className="detail-item">
                                    <span>aired</span>
                                    <strong>{aired?.string || 'Unknown'}</strong>
                                </div>
                                <div className="detail-item">
                                    <span>season</span>
                                    <strong>{season || 'Unknown'}</strong>
                                </div>
                                <div className="detail-item">
                                    <span>source</span>
                                    <strong>{source || 'Unknown'}</strong>
                                </div>
                                <div className="detail-item">
                                    <span>duration</span>
                                    <strong>{duration || 'Unknown'}</strong>
                                </div>
                                <div className="detail-item">
                                    <span>rating</span>
                                    <strong>{rating || 'Unknown'}</strong>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="panel">
                        <div className="panel-core">
                            <p className="panel-kicker">genres</p>
                            <h3>story taxonomy</h3>
                            <div className="pill-list">
                                {genres.length > 0 ? (
                                    genres.map((genre) => <span key={genre.mal_id}>{genre.name}</span>)
                                ) : (
                                    <span>Not listed</span>
                                )}
                            </div>
                        </div>
                    </article>

                    <article className="panel shell-wide">
                        <div className="panel-core">
                            <p className="panel-kicker">teams</p>
                            <h3>producers and studios</h3>
                            <div className="company-columns">
                                <div>
                                    <span className="column-label">producers</span>
                                    <div className="pill-list compact">
                                        {(producers || []).length > 0 ? (
                                            producers.map((producer) => <span key={producer.mal_id}>{producer.name}</span>)
                                        ) : (
                                            <span>Not listed</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <span className="column-label">studios</span>
                                    <div className="pill-list compact">
                                        {(studios || []).length > 0 ? (
                                            studios.map((studio) => <span key={studio.mal_id}>{studio.name}</span>)
                                        ) : (
                                            <span>Not listed</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </motion.section>

                {(themes.openings.length > 0 || themes.endings.length > 0) && (
                    <motion.section
                        className="section-shell"
                        initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
                    >
                        <div className="section-header">
                            <p className="eyebrow">soundtrack</p>
                            <h2>theme songs</h2>
                        </div>

                        <div className="theme-columns">
                            {themes.openings.length > 0 && (
                                <div className="theme-list">
                                    <h4>opening themes</h4>
                                    {themes.openings.map((opening, index) => (
                                        <div key={`${opening}-${index}`} className="theme-item">
                                            <span className="track-id">{String(index + 1).padStart(2, '0')}</span>
                                            <span>{opening}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {themes.endings.length > 0 && (
                                <div className="theme-list">
                                    <h4>ending themes</h4>
                                    {themes.endings.map((ending, index) => (
                                        <div key={`${ending}-${index}`} className="theme-item">
                                            <span className="track-id">{String(index + 1).padStart(2, '0')}</span>
                                            <span>{ending}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.section>
                )}

                <motion.section
                    className="section-shell"
                    initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
                >
                    <div className="section-header">
                        <p className="eyebrow">media</p>
                        <h2>official trailer</h2>
                    </div>

                    <div className="trailer-frame">
                        {trailer?.embed_url ? (
                            <div className="video-container">
                                {isTrailerPlaying ? (
                                    <iframe
                                        src={trailer.embed_url}
                                        title="Anime Trailer"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <button type="button" className="play-button" onClick={() => setIsTrailerPlaying(true)}>
                                        <span className="play-label">watch trailer</span>
                                        <span className="play-icon-wrap">↗</span>
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="empty-state">Trailer is not available for this title.</div>
                        )}
                    </div>
                </motion.section>

                <motion.section
                    className="section-shell"
                    initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
                >
                    <div className="section-header">
                        <p className="eyebrow">cast</p>
                        <h2>main characters</h2>
                    </div>

                    <div className="characters-grid">
                        {characters.map((character, index) => {
                            const { role } = character;
                            const { images: characterImages, name, mal_id } = character.character;
                            return (
                                <Link key={`${mal_id}-${index}`} to={`/character/${mal_id}`} className="character-card">
                                    <div className="character-image-wrap">
                                        <img src={characterImages?.jpg?.image_url} alt={`${name} portrait`} />
                                    </div>
                                    <div className="character-info">
                                        <h4>{name}</h4>
                                        <p>{role}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </motion.section>

                <motion.section
                    className="section-shell"
                    initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
                >
                    <div className="section-header">
                        <p className="eyebrow">community</p>
                        <h2>recent reviews</h2>
                    </div>

                    {reviews.length > 0 ? (
                        <div className="reviews-grid">
                            {reviews.map((review, index) => (
                                <article key={index} className="review-card">
                                    <div className="review-head">
                                        <img
                                            src={review.user.images?.jpg?.image_url || images?.jpg?.image_url}
                                            alt={`${review.user.username} avatar`}
                                        />
                                        <div>
                                            <h4>{review.user.username}</h4>
                                            <span className="review-score">{review.score}/10</span>
                                        </div>
                                    </div>
                                    <p>{review.review.substring(0, 220)}...</p>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">No recent reviews for this title.</div>
                    )}
                </motion.section>
            </div>
        </AnimeItemStyled>
    );
}

const AnimeItemStyled = styled.main`
    --ease-premium: cubic-bezier(0.32, 0.72, 0, 1);

    min-height: 100dvh;
    padding: 2.8rem 1rem 5.2rem;
    color: var(--text-primary);

    .page-shell {
        width: min(1320px, 100%);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .back-button {
        width: fit-content;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 999px;
        background: rgba(16, 24, 35, 0.86);
        color: var(--text-secondary);
        padding: 0.44rem 0.86rem 0.44rem 0.5rem;
        display: inline-flex;
        align-items: center;
        gap: 0.58rem;
        font-size: 0.86rem;
        letter-spacing: 0.02em;
        text-transform: lowercase;
        transition: transform 0.65s var(--ease-premium), border-color 0.45s var(--ease-premium), color 0.45s var(--ease-premium), background 0.45s var(--ease-premium);
    }

    .back-button:hover {
        transform: translateY(-2px);
        border-color: var(--border-soft);
        color: var(--text-primary);
        background: rgba(201, 149, 91, 0.14);
    }

    .back-button:active {
        transform: scale(0.98);
    }

    .arrow-island {
        width: 1.65rem;
        height: 1.65rem;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--accent-strong);
        transition: transform 0.65s var(--ease-premium), background 0.45s var(--ease-premium);
    }

    .back-button:hover .arrow-island {
        transform: translateX(-1px) translateY(1px);
        background: rgba(201, 149, 91, 0.17);
    }

    .hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(320px, 400px);
        align-items: start;
        gap: 1.6rem;
    }

    .hero-copy .eyebrow,
    .section-header .eyebrow,
    .panel-kicker {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 0.26rem 0.62rem;
        font-size: 0.64rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        border: 1px solid var(--border-soft);
        background: rgba(201, 149, 91, 0.12);
        color: var(--accent-strong);
        font-weight: 600;
    }

    .hero-copy h1 {
        margin: 0.82rem 0 0;
        font-size: clamp(2rem, 5vw, 4rem);
        font-weight: 800;
        line-height: 0.98;
        letter-spacing: -0.05em;
        text-wrap: balance;
    }

    .hero-copy .lead {
        margin: 1rem 0 0;
        max-width: 62ch;
        color: var(--text-secondary);
        line-height: 1.75;
        font-size: 1.02rem;
        text-wrap: pretty;
    }

    .read-toggle {
        border: none;
        background: transparent;
        color: var(--accent-strong);
        margin-left: 0.45rem;
        font-size: 0.88rem;
        font-weight: 600;
        text-transform: lowercase;
        transition: color 0.4s var(--ease-premium);
    }

    .read-toggle:hover {
        color: #f0c997;
    }

    .meta-row {
        margin-top: 1.1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
    }

    .meta-chip {
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(16, 24, 35, 0.84);
        color: var(--text-secondary);
        font-size: 0.8rem;
        font-variant-numeric: tabular-nums;
        text-transform: lowercase;
        padding: 0.35rem 0.72rem;
    }

    .poster-shell,
    .panel,
    .section-shell {
        border-radius: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.09);
        padding: 0.34rem;
        background:
            linear-gradient(155deg, rgba(28, 38, 54, 0.72), rgba(13, 20, 30, 0.8)),
            radial-gradient(circle at 0% 0%, rgba(201, 149, 91, 0.14), transparent 56%);
        box-shadow: 0 22px 48px rgba(4, 8, 14, 0.48);
    }

    .poster-core,
    .panel-core,
    .section-shell {
        border-radius: calc(2rem - 0.34rem);
        background: linear-gradient(155deg, rgba(14, 21, 31, 0.96), rgba(10, 16, 24, 0.95));
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.09);
    }

    .poster-core {
        padding: 0.65rem;
    }

    .poster-wrap {
        position: relative;
        overflow: hidden;
        border-radius: 1.35rem;
        aspect-ratio: 3 / 4;
    }

    .poster-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.75s var(--ease-premium);
    }

    .poster-shell:hover img {
        transform: scale(1.04);
    }

    .poster-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: flex-end;
        padding: 0.72rem;
        background: linear-gradient(to top, rgba(9, 14, 21, 0.86), transparent 58%);
    }

    .rank-tag {
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(9, 14, 21, 0.74);
        color: #ffffff;
        font-size: 0.78rem;
        letter-spacing: 0.03em;
        padding: 0.3rem 0.62rem;
        font-variant-numeric: tabular-nums;
    }

    .poster-stats {
        margin-top: 0.66rem;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.55rem;
    }

    .poster-stats > div {
        border-radius: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(17, 26, 37, 0.88);
        padding: 0.56rem 0.62rem;
        display: grid;
        gap: 0.18rem;
    }

    .poster-stats .label {
        font-size: 0.68rem;
        letter-spacing: 0.13em;
        text-transform: uppercase;
        color: var(--text-muted);
    }

    .poster-stats .value {
        font-size: 0.84rem;
        color: var(--text-primary);
        text-transform: lowercase;
        font-variant-numeric: tabular-nums;
    }

    .bento-grid {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 1rem;
    }

    .panel {
        grid-column: span 4;
    }

    .panel.shell-wide {
        grid-column: span 8;
    }

    .panel-core {
        padding: 1.12rem;
        height: 100%;
    }

    .panel-core h3 {
        margin: 0.62rem 0 0.9rem;
        font-size: 1.24rem;
        letter-spacing: -0.02em;
        text-transform: lowercase;
    }

    .title-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.58rem;
    }

    .title-item,
    .detail-item {
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(17, 26, 37, 0.86);
        border-radius: 1rem;
        padding: 0.62rem 0.72rem;
        display: grid;
        gap: 0.16rem;
    }

    .item-label {
        font-size: 0.64rem;
        letter-spacing: 0.13em;
        text-transform: uppercase;
        color: var(--text-muted);
    }

    .item-value {
        font-size: 0.9rem;
        color: var(--text-primary);
        text-wrap: pretty;
    }

    .detail-list {
        display: grid;
        gap: 0.55rem;
    }

    .detail-item span {
        font-size: 0.66rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--text-muted);
    }

    .detail-item strong {
        font-size: 0.88rem;
        color: var(--text-primary);
        font-weight: 600;
        text-transform: lowercase;
        font-variant-numeric: tabular-nums;
    }

    .pill-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.48rem;
    }

    .pill-list span {
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.11);
        background: rgba(17, 26, 37, 0.9);
        color: var(--text-secondary);
        padding: 0.32rem 0.66rem;
        font-size: 0.74rem;
        text-transform: lowercase;
    }

    .company-columns {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.8rem;
    }

    .column-label {
        display: inline-flex;
        margin-bottom: 0.5rem;
        font-size: 0.7rem;
        letter-spacing: 0.12em;
        color: var(--text-muted);
        text-transform: uppercase;
    }

    .pill-list.compact span {
        font-size: 0.72rem;
    }

    .section-shell {
        padding: 1.1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .section-header h2 {
        margin: 0.62rem 0 0;
        font-size: 1.5rem;
        text-transform: lowercase;
        letter-spacing: -0.03em;
    }

    .theme-columns {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.85rem;
    }

    .theme-list {
        border-radius: 1.1rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(17, 26, 37, 0.88);
        padding: 0.75rem;
    }

    .theme-list h4 {
        margin: 0 0 0.7rem;
        font-size: 0.9rem;
        color: var(--text-secondary);
        text-transform: lowercase;
        letter-spacing: 0.02em;
    }

    .theme-item {
        border-radius: 0.9rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(13, 20, 30, 0.9);
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 0.55rem;
        align-items: start;
        padding: 0.56rem 0.62rem;
    }

    .theme-item + .theme-item {
        margin-top: 0.52rem;
    }

    .track-id {
        color: var(--accent-strong);
        font-size: 0.72rem;
        font-variant-numeric: tabular-nums;
    }

    .theme-item span:last-child {
        color: var(--text-secondary);
        font-size: 0.82rem;
        line-height: 1.45;
    }

    .trailer-frame {
        border-radius: 1.2rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(12, 18, 27, 0.9);
        padding: 0.7rem;
    }

    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        border-radius: 1rem;
        background: linear-gradient(145deg, rgba(17, 26, 37, 0.92), rgba(10, 16, 24, 0.95));
    }

    .video-container iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: none;
    }

    .play-button {
        position: absolute;
        inset: 0;
        border: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.58rem;
        background: linear-gradient(145deg, rgba(9, 14, 21, 0.9), rgba(10, 16, 24, 0.82));
        color: var(--text-primary);
        font-size: 0.95rem;
        letter-spacing: 0.03em;
        text-transform: lowercase;
        transition: background 0.62s var(--ease-premium), transform 0.62s var(--ease-premium);
    }

    .play-button:hover {
        background: linear-gradient(145deg, rgba(12, 19, 28, 0.95), rgba(17, 26, 37, 0.9));
        transform: scale(1.01);
    }

    .play-icon-wrap {
        width: 1.7rem;
        height: 1.7rem;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.16);
        background: rgba(201, 149, 91, 0.15);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--accent-strong);
        transition: transform 0.62s var(--ease-premium), background 0.62s var(--ease-premium);
    }

    .play-button:hover .play-icon-wrap {
        transform: translateX(1px) translateY(-1px);
        background: rgba(201, 149, 91, 0.24);
    }

    .characters-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        gap: 0.75rem;
    }

    .character-card {
        text-decoration: none;
        color: inherit;
        border-radius: 1.05rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(17, 26, 37, 0.88);
        overflow: hidden;
        transition: transform 0.65s var(--ease-premium), border-color 0.45s var(--ease-premium), box-shadow 0.45s var(--ease-premium);
    }

    .character-card:hover {
        transform: translateY(-4px);
        border-color: rgba(201, 149, 91, 0.3);
        box-shadow: 0 16px 28px rgba(5, 8, 14, 0.4);
    }

    .character-image-wrap {
        aspect-ratio: 4/5;
        overflow: hidden;
    }

    .character-image-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.65s var(--ease-premium);
    }

    .character-card:hover img {
        transform: scale(1.05);
    }

    .character-info {
        padding: 0.66rem 0.72rem 0.78rem;
    }

    .character-info h4 {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text-primary);
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .character-info p {
        margin: 0.32rem 0 0;
        font-size: 0.72rem;
        color: var(--text-muted);
        text-transform: lowercase;
    }

    .reviews-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 0.72rem;
    }

    .review-card {
        border-radius: 1.05rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(17, 26, 37, 0.88);
        padding: 0.78rem;
    }

    .review-head {
        display: flex;
        gap: 0.58rem;
        align-items: center;
        margin-bottom: 0.62rem;
    }

    .review-head img {
        width: 2.1rem;
        height: 2.1rem;
        border-radius: 0.75rem;
        object-fit: cover;
        border: 1px solid rgba(255, 255, 255, 0.14);
    }

    .review-head h4 {
        margin: 0;
        font-size: 0.84rem;
        color: var(--text-primary);
        letter-spacing: -0.01em;
    }

    .review-score {
        margin-top: 0.2rem;
        display: inline-flex;
        border-radius: 999px;
        border: 1px solid var(--border-soft);
        background: rgba(201, 149, 91, 0.13);
        color: var(--accent-strong);
        font-size: 0.68rem;
        padding: 0.16rem 0.45rem;
        font-variant-numeric: tabular-nums;
    }

    .review-card p {
        margin: 0;
        font-size: 0.8rem;
        line-height: 1.56;
        color: var(--text-secondary);
        text-wrap: pretty;
    }

    .empty-state {
        border-radius: 1rem;
        border: 1px dashed rgba(255, 255, 255, 0.2);
        background: rgba(17, 26, 37, 0.68);
        color: var(--text-muted);
        text-align: center;
        padding: 1.2rem;
        font-size: 0.86rem;
    }

    @media (max-width: 1024px) {
        .hero-grid {
            grid-template-columns: minmax(0, 1fr) minmax(260px, 320px);
        }

        .panel {
            grid-column: span 6;
        }

        .panel.shell-wide {
            grid-column: span 12;
        }

        .theme-columns,
        .company-columns {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    @media (max-width: 768px) {
        padding: 2rem 0.86rem 4.2rem;

        .page-shell {
            gap: 1.45rem;
        }

        .hero-grid {
            grid-template-columns: minmax(0, 1fr);
        }

        .poster-shell {
            max-width: 360px;
        }

        .bento-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 0.82rem;
        }

        .panel,
        .panel.shell-wide {
            grid-column: auto;
        }

        .title-grid {
            grid-template-columns: minmax(0, 1fr);
        }

        .section-shell {
            padding: 0.8rem;
        }
    }
`;

export default AnimeItem;
