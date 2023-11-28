import * as React from 'react';
import {Table, TableHead, TableCell} from '@aws-amplify/ui-react'

export const SubmissionTable = () => {
/**
 * @params {Object} SubmissionTable
 * @params {TableHead} 
 * 
 */
    return(
        <Table>
            <TableHead>
                <TableCell className='tableHeader'>Customer ID</TableCell>
                <TableCell className='tableHeader'>Customer Email</TableCell>
                <TableCell className='tableHeader'>Date Sent</TableCell>
                <TableCell className='tableHeader'>Date Received</TableCell>
                <TableCell className='tableHeader'>Video Link</TableCell>
            </TableHead>
        </Table>
    )
}