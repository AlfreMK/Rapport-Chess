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
                            <Td>{index + 1}</Td>
                            <Td>{move.white}</Td>
                            <Td>{move.black}</Td>
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
const Td = styled.td`
    border: 1px solid black;
    border-collapse: collapse;
    margin: 2%;
    max-width: 100px;
`;
