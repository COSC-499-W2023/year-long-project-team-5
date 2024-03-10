import { API } from 'aws-amplify';
import { Button, View } from "@aws-amplify/ui-react";
import { deleteSubmission as deleteSubmissionMutation } from "../graphql/mutations";
import { IoTrashBin } from "react-icons/io5";

export const SubmissionDeletionButton = ({ submissionID }) => {

    async function deleteSubmission() {
    try {
        await API.graphql({
          query: deleteSubmissionMutation,
          variables: { input: { id: submissionID } }
        });
  
      } catch (error) {
        console.log('error deleting submission:', error);
      }
  };

  return (
    <View>
        <Button variation="primary" width='100%' onClick={deleteSubmission} cursor='pointer'><IoTrashBin/></Button>
  </View>
  );
};
