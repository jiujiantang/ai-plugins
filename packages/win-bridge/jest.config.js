/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest', // 使用 ts-jest
  testEnvironment: 'jsdom', // 有 window 对象
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
}
