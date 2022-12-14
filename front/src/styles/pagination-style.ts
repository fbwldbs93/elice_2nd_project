import styled from "styled-components";
import cssUnit from "@/lib/cssUnit";

export const ListPagenationWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 0px 38px 0px;
`;

export const MoveToPreviousPage = styled.button`
    color: #5a5a5a;
    background-color: transparent;
    border: none;
    font-size: 25px;
    position: left;
    cursor: pointer;
`;
export const MoveToNextPage = styled.button`
    color: #5a5a5a;
    background-color: transparent;
    border: none;
    font-size: 25px;
    position: left;
    cursor: pointer;
`;
export const MoveToFirstPage = styled.button`
    width: 25px;
    height: 37px;
    margin: 0 0 0 0;
    border: none;
    color: black;
    background-color: transparent;
    cursor: pointer;
`;
export const MoveToLastPage = styled.button`
    width: 115px;
    height: 37px;
    margin: 0 0 0 0;
    border: none;
    color: black;
    background-color: transparent;
    cursor: pointer;
`;
export const Flexbox = styled.div`
    display: flex;
`;
export const PageBtn = styled.button`
    width: 49px;
    height: 49px;
    margin: 0 10px;
    border: none;
    color: black;
    text-align: center;
    font-size: 20px;
    opacity: 0.65;
    &:hover {
        background-color: ${cssUnit.color.carbongreen};
        cursor: pointer;
        border-radius: 30px;
        transform: translateY(-2px);
    }
    &[aria-current] {
        background-color: #75c6a0;
        font-weight: bold;
        cursor: revert;
        transform: revert;
        opacity: 1;
        border-radius: 30px;
    }
`;
