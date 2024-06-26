export function filterSubmissions(searchInput,submissions) {
    if (searchInput.length === 0) {
      return submissions
    }
    let newSubmissions = submissions.filter((submission) =>
      submission.note.toLowerCase().includes(searchInput.toLowerCase())
      || submission.User.email.toLowerCase().includes(searchInput.toLowerCase())
      || submission.User.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    return newSubmissions
  }