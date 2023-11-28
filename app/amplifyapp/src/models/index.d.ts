import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";





type EagerSubmission = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Submission, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly adminId?: string | null;
  readonly Video?: Note | null;
  readonly User?: User | null;
  readonly SubmissionRequest?: SubmissionRequest | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly submissionVideoId?: string | null;
  readonly submissionUserId?: string | null;
  readonly submissionSubmissionRequestId?: string | null;
}

type LazySubmission = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Submission, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly adminId?: string | null;
  readonly Video: AsyncItem<Note | undefined>;
  readonly User: AsyncItem<User | undefined>;
  readonly SubmissionRequest: AsyncItem<SubmissionRequest | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly submissionVideoId?: string | null;
  readonly submissionUserId?: string | null;
  readonly submissionSubmissionRequestId?: string | null;
}

export declare type Submission = LazyLoading extends LazyLoadingDisabled ? EagerSubmission : LazySubmission

export declare const Submission: (new (init: ModelInit<Submission>) => Submission) & {
  copyOf(source: Submission, mutator: (draft: MutableModel<Submission>) => MutableModel<Submission> | void): Submission;
}

type EagerVideo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Video, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly videoURL?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyVideo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Video, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly videoURL?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Video = LazyLoading extends LazyLoadingDisabled ? EagerVideo : LazyVideo

export declare const Video: (new (init: ModelInit<Video>) => Video) & {
  copyOf(source: Video, mutator: (draft: MutableModel<Video>) => MutableModel<Video> | void): Video;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerSubmissionRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubmissionRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly adminID?: string | null;
  readonly userEmail?: string | null;
  readonly note?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySubmissionRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubmissionRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly adminID?: string | null;
  readonly userEmail?: string | null;
  readonly note?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SubmissionRequest = LazyLoading extends LazyLoadingDisabled ? EagerSubmissionRequest : LazySubmissionRequest

export declare const SubmissionRequest: (new (init: ModelInit<SubmissionRequest>) => SubmissionRequest) & {
  copyOf(source: SubmissionRequest, mutator: (draft: MutableModel<SubmissionRequest>) => MutableModel<SubmissionRequest> | void): SubmissionRequest;
}

type EagerNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly viewedStatus?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly viewedStatus?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Note = LazyLoading extends LazyLoadingDisabled ? EagerNote : LazyNote

export declare const Note: (new (init: ModelInit<Note>) => Note) & {
  copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}