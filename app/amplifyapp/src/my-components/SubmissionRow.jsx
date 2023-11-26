import * as React from "react";
import {TableRow,TableCell, Link,useTheme, View, Text} from "@aws-amplify/ui-react";

export const SubmissionRow = (props) => {
    const {tokens} = useTheme();
    return(
        <TableRow className='subRow'>
            <TableCell className = 'subID'> {props.id}</TableCell>
            <TableCell className = 'subEmail'> {props.email}</TableCell>
            <TableCell className = 'subDS'> {props.dateSent}</TableCell>
            <TableCell className = 'subDR'> {props.dateReceived}</TableCell>
            <TableCell className="vidLink"><Link href={props.videoLink}>Video Link</Link></TableCell>
        </TableRow>
    );
}
