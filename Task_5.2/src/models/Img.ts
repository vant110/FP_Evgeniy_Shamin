class Img {
  src: string
  alt: string

  constructor(src: string, alt: string) {
    this.src = src
    this.alt = alt
  }

  toString() {
    return `src='${this.src}', alt='${this.alt}'`
  }
}

export default Img
