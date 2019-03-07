import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBarWrapper = styled.div`
    z-index: 1000; 
    position: fixed; 
    box-sizing: border-box; 
    height: 95px; 
    width: 100%; 
    padding: 20px;
`;

const InputWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    border: none;
    border-radius: 5px;
    height: 55px;
    box-shadow: 0px 1px 15px rgba(0,0,0,0.2);
    transform: ${({show, up}) => show ? 'translateY(0%)' : `translateY(${up ? '-140%' : '140%'})`};
    transition: transform 200ms;
    display: flex;
    align-items: center;
    overflow: hidden;

    button {
        background: none;
        border: none;
        margin-right: 15px;
        padding: 0;
        display: flex;
        align-items: center;
        height: 100%;
        outline: none;
    }
`;

const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 15px;
    outline: none;
    font-size: 14px;
`;

function SearchBar ({ showAdd, filterTodo }) {
    const [searchTerm, setSearchTerm] = useState('');

    return ( 
        <SearchBarWrapper>
            <InputWrapper
                up
                show={!showAdd}
            >
                <Input
                    type="text" 
                    placeholder="Search here"
                    value={searchTerm} 
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        filterTodo(e.target.value);
                    }}
                />
            </InputWrapper>
        </SearchBarWrapper>
    );
}

export default SearchBar;