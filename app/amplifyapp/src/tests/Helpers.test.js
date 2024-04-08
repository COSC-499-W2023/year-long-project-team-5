import {filterSubmissions} from "../Helpers/Search"

test('return all submissions if searchInput is empty', () => {
  const searchInput = '';
  const submissions = [{ note: 'test', User: { email: 'test@test.com', name: 'Test User' } }];
  const result = filterSubmissions(searchInput, submissions);
  expect(result).toEqual(submissions);
});

test('filter submissions by note', () => {
  const searchInput = 'abc123';
  const submissions = [
    { note: 'abc123', User: { email: 'test1@test.com', name: 'Test User 1' } },
    { note: 'another test', User: { email: 'test2@test.com', name: 'Test User 2' } },
  ];
  const result = filterSubmissions(searchInput, submissions);
  expect(result).toEqual([submissions[0]]);
});

test('filter submissions by email', () => {
  const searchInput = 'theemailtotest';
  const submissions = [
    { note: 'abc123', User: { email: 'theemailtotest@test.com', name: 'Test User 1' } },
    { note: 'another test', User: { email: 'test2@test.com', name: 'Test User 2' } },
  ];
  const result = filterSubmissions(searchInput, submissions);
  expect(result).toEqual([submissions[0]]);
});

test('filter submissions by name', () => {
  const searchInput = 'name of';
  const submissions = [
    { note: 'abc123', User: { email: 'theemailtotest@test.com', name: 'the name of the user' } },
    { note: 'another test', User: { email: 'test2@test.com', name: 'Test User 2' } },
  ];
  const result = filterSubmissions(searchInput, submissions);
  expect(result).toEqual([submissions[0]]);
});