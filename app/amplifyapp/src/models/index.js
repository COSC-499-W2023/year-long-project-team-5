// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Submission, Video, User, SubmissionRequest, Note } = initSchema(schema);

export {
  Submission,
  Video,
  User,
  SubmissionRequest,
  Note
};