import React from 'react';
import styled from 'styled-components';
import { RiSearchLine, RiSparklingLine } from 'react-icons/ri';
import { useGlobalContext } from '../context/global';

function AnimeSearchBar({
    className,
    variant = 'section',
    placeholder = 'Search anime title...',
    label = 'anime finder'
}) {
    const { handleSubmit, search, handleChange } = useGlobalContext();

    return (
        <AnimeSearchBarStyled className={className} $variant={variant}>
            {variant === 'section' && (
                <div className="search-meta">
                    <span className="search-label">
                        <RiSparklingLine />
                        {label}
                    </span>
                    <p>Pick your next series with fast title search.</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="search-form">
                <RiSearchLine className="search-icon" />
                <input
                    type="text"
                    value={search}
                    onChange={handleChange}
                    placeholder={placeholder}
                    aria-label="Search anime"
                />
                <button type="submit">Search</button>
            </form>
        </AnimeSearchBarStyled>
    );
}

const AnimeSearchBarStyled = styled.div`
    display: grid;
    gap: 0.62rem;

    .search-meta {
        display: grid;
        gap: 0.3rem;
    }

    .search-label {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        width: fit-content;
        border-radius: 999px;
        border: 1px solid rgba(201, 149, 91, 0.28);
        background: rgba(201, 149, 91, 0.12);
        color: var(--accent-strong);
        padding: 0.2rem 0.56rem;
        font-size: 0.72rem;
        text-transform: lowercase;
        letter-spacing: 0.03em;
        font-weight: 600;
    }

    .search-meta p {
        margin: 0;
        color: var(--text-muted);
        font-size: 0.8rem;
    }

    .search-form {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.45rem;
        border-radius: 14px;
        border: 1px solid rgba(201, 149, 91, 0.22);
        background:
            linear-gradient(145deg, rgba(16, 23, 34, 0.96), rgba(10, 16, 24, 0.94)),
            radial-gradient(circle at 0% 0%, rgba(201, 149, 91, 0.16), transparent 55%);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 12px 26px rgba(4, 8, 14, 0.42);
        padding: 0.34rem;
        overflow: hidden;
    }

    .search-icon {
        color: var(--accent-strong);
        margin-left: 0.45rem;
        font-size: 1rem;
        flex-shrink: 0;
    }

    input {
        flex: 1;
        border: none;
        background: transparent;
        color: var(--text-primary);
        font-size: 0.9rem;
        min-width: 0;
    }

    input::placeholder {
        color: var(--text-muted);
    }

    input:focus {
        outline: none;
    }

    button {
        border-radius: 10px;
        border: 1px solid rgba(201, 149, 91, 0.34);
        background: rgba(201, 149, 91, 0.2);
        color: var(--accent-strong);
        font-size: 0.82rem;
        font-weight: 600;
        letter-spacing: 0.01em;
        padding: 0.48rem 0.82rem;
        transition:
            transform 0.3s cubic-bezier(0.32, 0.72, 0, 1),
            border-color 0.3s cubic-bezier(0.32, 0.72, 0, 1),
            background 0.3s cubic-bezier(0.32, 0.72, 0, 1),
            color 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }

    button:hover {
        transform: translateY(-1px);
        border-color: rgba(201, 149, 91, 0.48);
        background: rgba(201, 149, 91, 0.28);
        color: var(--text-primary);
    }

    button:active {
        transform: scale(0.98);
    }

    ${({ $variant }) => $variant === 'nav' && `
        width: min(100%, 360px);

        .search-meta {
            display: none;
        }

        .search-form {
            min-height: 41px;
            border-radius: 12px;
            padding: 0.28rem;
        }

        input {
            font-size: 0.86rem;
        }

        button {
            padding: 0.42rem 0.72rem;
            font-size: 0.78rem;
        }
    `}

    @media (max-width: 680px) {
        .search-form {
            border-radius: 12px;
        }

        .search-icon {
            margin-left: 0.34rem;
            font-size: 0.95rem;
        }

        input {
            font-size: 0.84rem;
        }

        button {
            font-size: 0.77rem;
            padding: 0.42rem 0.68rem;
        }
    }
`;

export default AnimeSearchBar;
