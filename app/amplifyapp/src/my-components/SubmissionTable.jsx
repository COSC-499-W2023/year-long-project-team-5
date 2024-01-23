import * as React from 'react';
import {Table, TableRow, TableHead, TableCell, TableBody, Theme, ThemeProvider} from '@aws-amplify/ui-react'

/**
 * @component {Object} SubmissionTable
 * @example 
 * //Example usage of SubmissionTable being used with one SubmissionRow being passed as a prop 
 * <SubmissionTable rowsToDisplay = {<SubmissionRow id = '1' email = 'abq1a@gmail.com'  dateSent='2020-01-01T00:00:00' dateReceived = '2020-01-01T00:00:00' videoLink = 'videotoshow'/>}/>
 *
 * @param {Object} rowsToDisplay - takes in rows to display (can take multiple through array or map function)
 * @returns JSX.Element
 */

// we should move away from using theme (stopgap until peertesting#1), but for now, it will work.
const theme = {
    name: 'table-theme',
    tokens: {
      components: {
        table: {
          row: {
            hover: {
              backgroundColor: { value: '{colors.teal.20}' },
            },
  
            striped: {
                backgroundColor: { value: '{colors.teal.10}' },
            },
          },
  
          header: {
            color: { value: '{colors.teal.80}' },
            fontSize: { value: '{fontSizes.medium}' },
            fontWeight: {value: '{fontWeights.medium}'},
        },
  
          data: {
            fontWeight: { value: '{fontWeights.light}' },
          },
        },
      },
    },
  };
  

export const SubmissionTable = (props) => {
    return(
        <ThemeProvider theme={theme} colorMode="light">
            <Table variation = "striped" highlightOnHover>
                <TableHead>
                    <TableRow textAlign="left">
                        <TableCell as='th' className='tableHeader'>Name</TableCell>
                        <TableCell as='th' className='tableHeader'>Email</TableCell>
                        <TableCell as='th' className='tableHeader'>Note</TableCell>
                        <TableCell as='th' className='tableHeader'>Date Sent</TableCell>
                        <TableCell as='th' className='tableHeader'>Date Received</TableCell>
                        <TableCell as='th' className='tableHeader'>Submission</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody textAlign="left">
                    {props.rowsToDisplay}
                </TableBody>
            </Table>
        </ThemeProvider>
    )
}