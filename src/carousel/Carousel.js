import React, { useEffect, useState, Children, cloneElement } from 'react'
import "./carousel.css"
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
const PAGE_WIDTH = 450

export const Carousel = ({ children }) => {

    const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)

const handleLeftArrowClick = ()=>{
    setOffset((currentOffset)=>{
        const newOffset = currentOffset + PAGE_WIDTH

        return Math.min(newOffset, 0);
    })
}
const handleRightArrowClick = ()=>{
    setOffset((currentOffset)=>{
        const newOffset = currentOffset - PAGE_WIDTH;

        const maxOffset = -(PAGE_WIDTH * (pages.length - 1))

        return Math.max(newOffset, maxOffset)
    })
}
    useEffect(() => {
         setPages(Children.map(children, child => {
            return cloneElement(child, {
                style: {
                    height: '100%',
                    width: "100%",
                    minWidth: `${PAGE_WIDTH}px`,
                    maxWidth: `${PAGE_WIDTH}px`,
                }
            })
        }))

    }, []) 

    return (
        <div className='main-container '>
            <FaChevronLeft className='arrow' onClick={handleLeftArrowClick}></FaChevronLeft>
            <div className='window'>
                <div className='all-pages-container'
                style={{transform: `translateX(${offset}px)`}}>
                    {pages}
                </div>
            </div>
            <FaChevronRight className='arrow' onClick={handleRightArrowClick}></FaChevronRight>
        </div>
    )
}
