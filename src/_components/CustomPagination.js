import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'semantic-ui-react'
import { appendUrlParam } from '../_helpers/setUrlParams'

const CustomPagination = (props) => {

    const { recordPerPage = 10, totalCount, current, handleOnClick } = props;

    const [showLeftArrow, setShowLeftArrow] = useState(true);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [currentPage, setCurrentPage] = useState(current)

    let numberOfPages = Math.ceil(totalCount / recordPerPage);

    useEffect(() => {

        if (numberOfPages <= 10) {

            setShowLeftArrow(false);
            setShowRightArrow(false);

        } else {

            if (currentPage === numberOfPages) {

                setShowRightArrow(false);

            } else {

                setShowRightArrow(true);
            }

            if (currentPage === 1) {

                setShowLeftArrow(false)

            } else {

                setShowLeftArrow(true)
            }

        }

    }, [totalCount, recordPerPage, currentPage])


    const onClick = (index) => {

        const currentOffset = index;

        handleOnClick({ offset: currentOffset })

        setCurrentPage(index)

        appendUrlParam('page', index)
    }

    const onClickLeftArrow = () => {

        const newCurrentPage = currentPage - 1;

        onClick(newCurrentPage)
    }

    const onClickRightArrow = () => {

        const newCurrentPage = currentPage + 1;

        onClick(newCurrentPage)

    }

    const PageItem = ({ numberOfPages }) => {

        let pages = [];
        for (let index = 1; index <= numberOfPages; index++) {

            const element = <Menu.Item active={index === currentPage} as='a' key={index} onClick={() => onClick(index)}>{index}</Menu.Item>;

            pages.push(element);
        }

        return pages;
    }

    return (

        <Menu floated='right' pagination>
            {showLeftArrow && (

                <Menu.Item as='a' icon onClick={onClickLeftArrow}>
                    <Icon name='chevron left' />
                </Menu.Item>

            )}

            <PageItem numberOfPages={numberOfPages} />

            {showRightArrow && (

                <Menu.Item as='a' icon onClick={onClickRightArrow}>
                    <Icon name='chevron right' />
                </Menu.Item>
            )}

        </Menu>

    )
}

export default CustomPagination

