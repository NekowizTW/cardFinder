import path from 'path'

const __dirname = path.resolve();

export default {
  // Source files
  src: path.resolve(__dirname, "./src"),

  // Production build files
  build: path.resolve(__dirname, "./dist"),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, "./public"),
}
