export default {
  get: jest.fn(() => Promise.resolve({ data: 'mockdata' })),
  post: jest.fn(() => Promise.resolve({ data: 'mockdata' })),
  all: jest.fn(() => Promise.resolve({ data: [] })),
  spread: jest.fn(() => Promise.resolve({ data: [] })),
}
