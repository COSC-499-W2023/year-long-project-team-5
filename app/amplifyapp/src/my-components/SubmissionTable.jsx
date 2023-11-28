import * as React from 'react';
import {Table, TableRow, TableHead, TableCell, TableBody} from '@aws-amplify/ui-react'

export const SubmissionTable = (props) => {
/**
 * @params {Object} SubmissionTable
 * @params {TableHead} 
 * 
 */
    return(
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell as='th' className='tableHeader'>Submission #</TableCell>
                    <TableCell as='th' className='tableHeader'>Customer Email</TableCell>
                    <TableCell as='th' className='tableHeader'>Date Sent</TableCell>
                    <TableCell as='th' className='tableHeader'>Date Received</TableCell>
                    <TableCell as='th' className='tableHeader'>Submission</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.rowsToDisplay}
            </TableBody>
        </Table>
    )
}