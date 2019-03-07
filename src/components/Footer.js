import React, { useState } from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.form`
    z-index: 1000;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    border: none; 
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

const Button = styled.button`
    position: fixed;
    right: 10px;
    bottom: 10px;
    box-sizing: border-box;
    width: 60px;
    height: 60px;
    background: #4285F4;
    border-radius: 50%;
    border: none;
    color: #fff;
    outline: none;
    box-shadow: 0 3px 15px rgba(0,0,0,0.3);
`;

function Footer({showAdd, setShowAdd, addTodo}) {
    const [field, setField] = useState('');  
    return (
        <FooterWrapper 
            onSubmit={(e) => {
                e.preventDefault();
                addTodo(field);
                setField('');
            }}
        >
            <InputWrapper show={showAdd}>
                <Input
                    type="text" 
                    placeholder="Add todo..."
                    value={field} 
                    
                    onChange={e => setField(e.target.value)} 
                />
                <button type="button" onClick={(e) => {
                    e.preventDefault();
                    setShowAdd(false)
                }}>
                    <i className="material-icons" style={{ color: '#484848' }}>close</i>
                </button>
            </InputWrapper>
            { !showAdd &&
            <Button type="button" onClick={e => {
                e.preventDefault();
                setShowAdd(true);
            }}>
                <i className="material-icons">add</i>
            </Button>
            }
        </FooterWrapper>
    );
}

export default Footer;