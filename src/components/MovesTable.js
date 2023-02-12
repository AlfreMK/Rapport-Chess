import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";


const MovesTable = (props) => {
    const [movesTable, setMovesTable] = useState([]);
    useEffect(() => {
        setMovesTable(props.history);
    }, [props.history]);
    return (
        <Table>
            <tbody>
                {movesTable.map((move, index) => {
                    return (
                        <tr key={index}>
                            <TdNumber>{index + 1}</TdNumber>
                            <TdMove>{move.white}</TdMove>
                            <TdMove>{move.black}</TdMove>
                        </tr>
                    )
                })
                }
            </tbody>
        </Table>
    )
}

export default MovesTable;

const Table = styled.table`
    border: 1px solid black;
    border-collapse: collapse;
    margin: 2%;
    max-width: 100px;
`;
const Th = styled.th`
    border: 1px solid black;
    border-collapse: collapse;
    margin: 2%;
    max-width: 100px;
`;

const TdNumber = styled.td`
    background-color: #302e2c;
    padding: 5px;
    min-width: 40px;
    text-align: center;
    border: 1px solid #404040;
`;

const TdMove = styled.td`
    background-color: #262421;
    border: 1px solid #262421;
    margin: 2%;
    padding: 5px;
    padding-left: 10px;
    min-width: 90px;
`;
