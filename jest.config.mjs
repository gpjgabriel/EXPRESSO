const config = {
  testEnvironment: 'jest-environment-jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  moduleNameMapper: {
    '^styled-components$': 'identity-obj-proxy',

    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',

    '^@/(.*)$': '<rootDir>/src/$1',
  },

  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
}

export default config
