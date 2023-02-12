import styled from 'styled-components';
// import { Link } from 'react-router-dom';

function Rules(){
    return (
        <Container>
            <Title>Rules of Rapport Chess</Title>
            <span>Inspired in <Link href='https://en.wikipedia.org/wiki/Richard_Rapport'>Richard Rapport's</Link> agressive chess style, this is chess variant that has the following rules:</span>
            <ul>
                <li>All pieces (except the king) move like standard chess, with the restriction that they only move foward.</li>
                <li>When a piece reach the 7th rank, then they can move foward or backwards for the rest of the game.</li>
            </ul>
        </Container>
    )
}

export default Rules;



const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2%;
    max-width: 300px;
`;

const Title = styled.h3`
    text-align: center;
`;

const Link = styled.a`
    color: #4183c4;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    width: fit-content;
    &:hover {
        text-decoration: underline;
    }
`;