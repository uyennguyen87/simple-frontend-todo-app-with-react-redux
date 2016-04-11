import React from 'react'
import FilterLink from '../containers/FilterLink'
import * as ActionConstants from '../constants';
const Footer = () => (
    <p>
        Show:
        {' '}
        <FilterLink filter={ActionConstants.SHOW_ALL}> All </FilterLink>
        {' '}
        <FilterLink filter={ActionConstants.SHOW_ACTIVE}> Active </FilterLink>
        {' '}
        <FilterLink filter={ActionConstants.SHOW_COMPLETED}> Completed </FilterLink>
    </p>
)

export default Footer
