class Helper {
  constructor() {
  }

  GenerateImageCardHeightByWidth(width) {
    if (width <= 576) {
      return 170
    } else if (width <= 768) {
      return 170
    } else if (width <= 992) {
      return 170
    } else if (width <= 1140) {
      return 170
    } else if (width <= 1380) {
      return 240
    } else if (width <= 1780) {
      return 240
    }
    return 340
  }
}

const helper = new Helper()

export default helper
