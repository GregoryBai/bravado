import { ChangeEvent } from 'react';
import styled from 'styled-components'

const Container = styled.div`
background: #fafafa;
display: flex;
justify-content: center;
align-items: center;

padding: 10px 20px;
grid-gap: 10px;
background: #faafa;

width: 524px; 
height: 48px;

box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
border-radius: 2px;
overflow: hidden;
`

const Input = styled.input`
    background: transparent;
    font-size: 24px;
    outline: none;
    border: none;
    flex: auto;
    height: 100%;

`

type SearchbarProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const Searchbar: React.FC<SearchbarProps> = ({onChange, value}) => {

    return <Container>
    <img src="Search.svg" alt="search" />
    <Input value={value} onChange={onChange} />

    </Container>
}

export default Searchbar