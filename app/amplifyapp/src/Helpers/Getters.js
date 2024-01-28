import { listSubmissions } from "../graphql/queries";
import {API} from 'aws-amplify';

// fetches submissions from the database
export async function getSubmissions() {
      const apiData = await API.graphql({ query: listSubmissions });
      return apiData.data.listSubmissions.items;
}