import React, { useState } from 'react';
import { useGlobalContext } from '../context/global';
import styled from 'styled-components';
import Popular from './Popular';
import Upcoming from './Upcoming';
import Airing from './Airing';
import AnimeNavbar from './AnimeNavbar';

function Homepage() {
    const {
        getUpcomingAnime,
        getAiringAnime,
        getPopularAnime
    } = useGlobalContext();

    const [rendered, setRendered] = useState('popular');

    const handleMenuClick = (type) => {
        setRendered(type);
        switch (type) {
            case 'popular':
                getPopularAnime();
                break;
            case 'airing':
                getAiringAnime();
                break;
            case 'upcoming':
                getUpcomingAnime();
                break;
            default:
                break;
        }
    };

    const switchComponent = () => {
        switch (rendered) {
            case 'popular':
                return <Popular rendered={rendered} />;
            case 'airing':
                return <Airing rendered={rendered} />;
            case 'upcoming':
                return <Upcoming rendered={rendered} />;
            default:
                return <Popular rendered={rendered} />;
        }
    };

    return (
        <HomepageStyled>
            <AnimeNavbar rendered={rendered} onMenuClick={handleMenuClick} />

            <main className="content-section">{switchComponent()}</main>
        </HomepageStyled>
    );
}

const HomepageStyled = styled.div`
    min-height: 100dvh;
    color: var(--text-primary);

    .content-section {
        max-width: 1320px;
        margin: 0 auto;
        padding: 7.2rem 1.15rem 2.25rem;
    }

    @media (max-width: 560px) {
        .content-section {
            padding-left: 0.85rem;
            padding-right: 0.85rem;
        }
    }
`;

export default Homepage;
