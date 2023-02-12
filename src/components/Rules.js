import styled from 'styled-components';
// import { Link } from 'react-router-dom';

function Rules(){
    return (
        <Container>
            <Title>Rules of Rapport Chess</Title>
            <ul>
                <li>All pieces (except the king) move like standard chess, with the restriction that they only move foward.</li>
                <li>When a piece reach the 7th rank, then they can move foward or backwards.</li>
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